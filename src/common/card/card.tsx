import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './card.css';

import {Button, Card as BootstrapCard, Col, Image, Row} from 'react-bootstrap';
import {handleError, V1} from '..';
import {Stack} from "../services/openapi/v1";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import Taglist from "../taglist/Taglist";
import {Redirect} from "react-router-dom";

interface CardState {
    redirect: string;
}

interface CardProps {
    spec: V1.Service;
    specs: Array<V1.Service>;
    stacks: Array<V1.Stack>;
    tags: Array<any>;
}

class Card extends Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
        this.state = { redirect: '' };

        this.installApplication = this.installApplication.bind(this);
    }

    // TODO: Abstract this?
    copy(obj: any) {
        return JSON.parse(JSON.stringify(obj))
    }

    newStack(appSpec: V1.Service): V1.Stack {
        const key = appSpec.key;

        const stack: V1.Stack = {
            id: "",
            name: this.copy(appSpec.label),
            key: key,
            // secure: this.copy(appSpec.authRequired),
            status: "stopped",
            services: []
        }

        const services = stack.services || [];

        // Add base service
        // @ts-ignore
        services.push(this.newStackService(appSpec, stack));

        const deps = appSpec.depends || [];

        // Add required service dependencies
        deps.filter(dep => dep.required).forEach((reqDep: V1.ServiceDependency) => {
            const depKey = reqDep.key;
            if (!depKey) {
                console.error(`Empty key encountered: ${appSpec.key}-${depKey}   <--- this shouldn't be empty`);
            } else {
                const depSpec = this.props.specs.find(spec => spec.key === reqDep.key);
                if (depSpec) {
                    services.push(this.newStackService(depSpec, stack));
                }
            }
        });

        stack.services = services;

        return stack;
    }
    newStackService(appSpec: V1.Service, stack: V1.Stack): V1.StackService {
        const service = {
            id: "",
            stack: stack.key,
            service: appSpec.key,
            status: "",

            // Copy default values from spec
            resourceLimits: this.copy(appSpec.resourceLimits),
            ports: this.copy(appSpec.ports),

            // Different format means we need to build this up manually
            volumeMounts: {},
            config: {},
        }

        // Build up key-value pairs for volumeMounts
        const specVolumes = appSpec.volumeMounts || [];
        const volumes: any = {};
        specVolumes.forEach(vol => {
            const name = vol.name + "";
            volumes[name] = vol.mountPath;
        });

        // Build up key-value pairs for all configs
        const specConfigs = appSpec.config || [];
        const config: any = {};
        specConfigs.forEach((cfg: V1.Config) => {
            const name = cfg.name + "";
            if (cfg.isPassword) {
                // TODO: Generate random password
                // Generate passwords for any missing configs
                config[name] = Math.random().toString(36).substr(2, 8);
            } else {
                config[name] = cfg.value;
            }
        });

        service.config = config;

        return service;
    }

    // Creates a new Stack (UserApp) from the given Service (AppSpec)
    installApplication(): void {
        const appSpec = this.props.spec;
        const userApp: Stack = this.newStack(appSpec);

        // POST /stacks
        V1.UserAppService.createStack(userApp).then(stk => {
            this.props.stacks.push(stk);
            this.setState({ redirect: `/my-apps/${stk.id}` });
        }).catch(reason => handleError(`Failed to add ${userApp.key} user app`, reason));
    }

    showDropdown(): void {

    }

    render() {
        return (
            <BootstrapCard>
                {
                    this.state.redirect && <Redirect to={this.state.redirect} />
                }
                <BootstrapCard.Body className="spec-card-body" style={{marginTop:"0", textAlign: "left", padding: "20px"}}>
                    <Row>
                        <Col style={{ textAlign: "left" }}>
                            <img width="60" height="60" id="spec-card-img" src={this.props.spec.logo || '/ndslabs-badge.png'} style={{ borderRadius: "50px", border: "solid 1px lightgrey" }}/>
                        </Col>
                        <Col>
                            <Button style={{ borderRadius: "25px", marginTop: "15px" }} className="btn-light" onClick={this.installApplication}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button variant="link" onClick={this.showDropdown} style={{ marginTop: "15px" }}>
                                <FontAwesomeIcon icon={faEllipsisV} style={{ color: "black" }} />
                            </Button>
                        </Col>
                    </Row>
                    <Row title={this.props.spec.key} onClick={() => this.setState({ redirect: `/all-apps/${this.props.spec?.key}` })} style={{ cursor: "pointer", marginTop: "10px" }}>
                        <h5>{this.props.spec.label || this.props.spec.key}</h5>
                    </Row>
                    <Row style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        {this.props.spec.description}
                    </Row>
                    <Row>
                        <Taglist tags={this.props.tags} spec={this.props.spec} chunkSize={2} onClick={(tag) => this.setState({ redirect: '/all-apps#' + tag?.name})} />
                    </Row>
                </BootstrapCard.Body>
            </BootstrapCard>
        );
    }
}

export default Card;
