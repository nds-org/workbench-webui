import {useState} from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {handleError, V1} from '..';
import Taglist from "../taglist/Taglist";

import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import ReactGA from "react-ga";

// TODO: Abstract this?
const copy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

const newStack = (appSpec: V1.Service, allSpecs: Array<V1.Service>): V1.Stack => {
    const key = appSpec.key;

    const stack: V1.Stack = {
        id: "",
        name: copy(appSpec.label),
        key: key,
        // secure: this.copy(appSpec.authRequired),
        status: "stopped",
        services: []
    }

    const services = stack.services || [];

    // Add base service
    services.push(newStackService(appSpec, stack));

    const deps = appSpec.depends || [];

    // Add required service dependencies
    deps.filter(dep => dep.required).forEach((reqDep: V1.ServiceDependency) => {
        const depKey = reqDep.key;
        if (!depKey) {
            console.error(`Empty key encountered: ${appSpec.key}-${depKey}   <--- this shouldn't be empty`);
        } else {
            const depSpec = allSpecs.find(spec => spec.key === reqDep.key);
            if (depSpec) {
                services.push(newStackService(depSpec, stack));
            }
        }
    });

    stack.services = services;

    return stack;
}

const newStackService = (appSpec: V1.Service, stack: V1.Stack): V1.StackService => {
    const service: V1.StackService = {
        id: "",
        stack: stack.key,
        service: appSpec.key,
        status: "",

        // Copy default values from spec
        // ports: copy(appSpec.ports),


        // Different format means we need to build this up manually
        volumeMounts: {},
        config: {},
    }

    if (appSpec?.resourceLimits?.cpuMax) {
        service.resourceLimits = {
            cpuMax: appSpec.resourceLimits.cpuMax + "",
            cpuDefault: appSpec.resourceLimits.cpuDefault + "",
            memMax: appSpec.resourceLimits.memMax + "",
            memDefault: appSpec.resourceLimits.memDefault + ""
        };
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



interface CardProps {
    spec: V1.Service;
    specs: Array<V1.Service>;
    stacks: Array<V1.Stack>;
    tags: Array<any>;
    setFilter: (f: string) => void;
}

//class Card extends Component<CardProps, CardState> {
function SpecCard(props: CardProps) {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    //const [stacks, setStacks] = useState([]);
    const [redirect, setRedirect] = useState('');

    const installApplication = (): void => {
        const appSpec = props.spec;
        const userApp: V1.Stack = newStack(appSpec, props.specs);

        // POST /stacks
        V1.UserAppService.createUserapp(userApp).then(stk => {
            ReactGA.event({
                category: 'application',
                action: 'add',
                label: stk.key
            });
            props.stacks.push(stk);
            setRedirect(`/my-apps`);
        }).catch(reason => handleError(`Failed to add ${userApp.key} user app`, reason));
    }

    const showDropdown = () => {

    }

    // TODO: onClick={() => setRedirect(`/all-apps/${props.spec?.key}`)}
    return (
        <Card bg={darkThemeEnabled ? 'dark' : 'light'} style={{ borderRadius: "16px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
            {
                redirect && <Redirect to={redirect} />
            }
            <Card.Body className="spec-card-body" style={{marginTop:"0", textAlign: "left", padding: "20px",  borderRadius: "15px 15px 0 0", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <img alt={props.spec.key} width="60" height="60" id="spec-card-img" src={props.spec.logo || '/ndslabs-badge.png'} style={{ borderRadius: "50px", border: "solid 1px lightgrey", backgroundColor: 'white' }}/>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant={'link'} style={{ padding: "1px",  width: "30px", height: "30px", borderRadius: "25px", border: darkThemeEnabled ? 'white 2px solid' : 'darkgrey 2px solid', marginTop: "15px" }} onClick={installApplication}>
                            <FontAwesomeIcon className={'fa-fw'} icon={faPlus} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                        </Button>
                        {
                            // TODO: "More Actions" Dropdown...
                        }
                        <Button variant={'link'} onClick={showDropdown} style={{ marginTop: "15px" }} hidden={true}>
                            <FontAwesomeIcon icon={faEllipsisV} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                        </Button>
                    </Col>
                </Row>
                <Row title={props.spec.key} style={{ cursor: "pointer", marginTop: "10px" }}>
                    <h5>{props.spec.label || props.spec.key}</h5>
                </Row>
                <Row style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    {props.spec.description}
                </Row>
            </Card.Body>
            <Card.Footer style={{ height: "80px", border: "none", borderRadius: "0 0 15px 15px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff'}}>
                <Taglist tags={props.tags} spec={props.spec} chunkSize={2} onClick={(tag) => {
                    if (props.setFilter) {
                        props.setFilter(tag.id + "");
                    } else {
                        window.location.hash = '#' + encodeURIComponent(tag.name + "")
                    }
                }} />
            </Card.Footer>
        </Card>
    );
}

export default SpecCard;
