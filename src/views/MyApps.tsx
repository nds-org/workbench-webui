import React, { Component } from 'react';
import {Accordion, Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import '../index.css';

import { V1, handleError, waitFor } from '../common';
import {StackService, Stack} from "../common/services/openapi/v1";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faExclamationCircle, faPowerOff, faSpinner, faTerminal} from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();

interface MyAppsState {
    username: string;
    stacks: Array<Stack>;
}




class MyAppsPage extends Component<{}, MyAppsState>{
    constructor(props: any) {
        super(props);

        const username = cookies.get('username');
        this.state = { stacks: [], username };

        this.refresh = this.refresh.bind(this);
        this.waitForStack = this.waitForStack.bind(this);
        this.startStack = this.startStack.bind(this);
        this.stopStack = this.stopStack.bind(this);
    }

    refresh() {
        return V1.UserAppService.listStacks().then(stacks => {
            const sorted = stacks.sort((s1, s2) => {
                const lc1 = s1.name?.toLowerCase() || s1.id || s1.key;
                const lc2 = s2.name?.toLowerCase() || s2.id || s2.key;
                return lc1.localeCompare(lc2);
            })
            this.setState((state, props) => ({ stacks }));
            return stacks;
        }).catch(reason => {
            handleError("Failed to fetch stacks", reason);
            return [];
        });
    }

    componentDidMount() {
        this.refresh();
    }

    async waitForStack(stackId: string, condition: (stack?: Stack) => boolean): Promise<boolean> {
        return this.refresh().then(stacks => {
            const stack = stacks.find(stack => stack.id === stackId);
            return condition(stack);
        });
    }

    openConsole(svc: StackService) {
        // TODO: open a console
    }

    startStack(stack: Stack) {
        const stackId = stack.id+"";
        V1.UserAppService.startStack(stackId).then(() => {
            console.log("Stack is now starting...");
            waitFor(() => this.waitForStack(stackId, (stack?: Stack) => stack?.status === 'started'));
        }).catch(reason => handleError("Failed to start stack", reason));
    }

    stopStack(stack: Stack) {
        const stackId = stack.id+"";
        V1.UserAppService.stopStack(stackId).then(() => {
            console.log("Stack is now stopping...");
            waitFor(() => this.waitForStack(stackId, (stack?: Stack) => stack?.status === 'stopped' || stack?.status === ''));
        }).catch(reason => handleError("Failed to stop stack", reason));
    }

    renderStackStatus(stack: Stack) {
        if (!stack.status || stack.status === 'stopped') {
            return (
                <FontAwesomeIcon icon={faPowerOff} size={'2x'} />
            );
        } else if (stack.status === 'started') {
            return (
                <FontAwesomeIcon icon={faCheckCircle} size={'2x'} />
            );
        } else if (stack.status === 'error') {
            return (
                <FontAwesomeIcon icon={faExclamationCircle} size={'2x'} />
            );
        }
        return (
            <FontAwesomeIcon icon={faSpinner} className={'fa-spin'} size={'2x'} />
        );
    }

    renderStackButtons(stack: Stack) {
        if (!stack.status || stack.status === 'stopped') {
            return (
                <Col className='col-1'>
                    <Button className='btn-dark' onClick={() => this.startStack(stack)}>Start</Button>
                </Col>
            )
        } else if (stack.status === 'started' || stack.status === 'error') {
            return (
                <Col className='col-1'>
                    <Button className='btn-dark' onClick={() => this.stopStack(stack)}>Stop</Button>
                </Col>
            )
        } else if (stack.status === 'starting' || stack.status === 'stopping') {
            return (
                <Col className='col-1'>
                    <Button className='btn-dark' disabled={true}>Stop</Button>
                </Col>
            )
        }

        return (<Col className='col-1'></Col>)
    }

    render () {
        return (
            <Container fluid={false}>
                <h2>{this.state.username} Dashboard</h2>

                <Accordion defaultActiveKey="0">
                    {
                        this.state.stacks.map((stack, index) =>
                            <Card key={stack.id} border={ stack.status === 'started' ? 'success' : (stack.status === 'stopped' || !stack.status) ? 'dark' : stack.status === 'error' ? 'danger' : 'warning'}>
                                <Card.Header>
                                    <Row>
                                        <Col className='col-1 text-center'>
                                            {this.renderStackStatus(stack)}
                                        </Col>
                                        <Col>
                                            <Accordion.Toggle as={Button} variant='context' eventKey={index+""}>
                                                {stack.name || stack.id}
                                            </Accordion.Toggle>
                                        </Col>
                                        {this.renderStackButtons(stack)}
                                    </Row>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index+""}>
                                    <Card.Body>
                                        <Table className='compact' responsive='sm' borderless={true}>
                                            <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Name</th>
                                                <th>ID</th>
                                                <th>Console</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                (stack.services || []).map(svc =>
                                                    <tr key={svc.id}>
                                                        <td width='10%'>{svc.status || 'Stopped'}</td>
                                                        <td width='10%'>{svc.service}</td>
                                                        <td>{svc.id}</td>
                                                        <td width='5%'>
                                                            <Button className='btn-light' size='sm' onClick={() => this.openConsole(svc)}><FontAwesomeIcon icon={faTerminal} /></Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    }
                </Accordion>
            </Container>
        );
    }
}

export default MyAppsPage;
