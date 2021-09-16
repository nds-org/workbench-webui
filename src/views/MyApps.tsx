import React, {Component, useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Container, Modal, Row, Table} from "react-bootstrap";
import '../index.css';

import { V1, handleError, waitFor } from '../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faExclamationCircle, faPowerOff, faSpinner, faTerminal} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faRocket} from "@fortawesome/free-solid-svg-icons/faRocket";
import Console from "./Console";
import MyTerminal from "./Terminal";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";


interface MyAppsState {
    stacks: Array<V1.Stack>;
    selectedService: V1.StackService;
    showSelected: boolean;
    nextRefresh: any;
}



const navigate = (stk: V1.Stack, ep: any) => {
    window.open(`${ep.protocol}://${ep.host}`, '_blank');
}

const getStacks = (): Promise<V1.Stack[]> => {
    return V1.UserAppService.listStacks().then(stacks => {
        return stacks.sort((s1, s2) => {
            const lc1 = s1.name?.toLowerCase() || s1.id || s1.key;
            const lc2 = s2.name?.toLowerCase() || s2.id || s2.key;
            return lc1.localeCompare(lc2);
        });
    }).catch(reason => {
        handleError("Failed to fetch stacks", reason);
        return [];
    });
}
const getSpec = async (key: string) => {
    return await V1.AppSpecService.getServiceById(key);
}

function MyAppsPage(props: any) {
    let nextRefresh: any;

    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);
    const [activated, setActivated] = useState(0);
    const [selectedService, setSelectedService] = useState<V1.StackService>();
    const [showSelected, setShowSelected] = useState(false);

    useEffect(() => {
        V1.AppSpecService.listServices().then(setSpecs).catch(reason => handleError('Failed to fetch specs: ', reason));
    }, []);

    const deleteStack = (stack: V1.Stack) => {
        const stackId = stack.id+"";
        return V1.UserAppService.deleteStack(stackId).then(() => {
            console.log("Stack has been deleted: ", stackId);
            refresh();
        }).catch(reason => handleError("Failed to delete stack", reason));
    }

    const refresh = (): Promise<V1.Stack[]> => {
        return getStacks().then(stks => {
            setStacks(stks);
            return stks;
        });
    }

    useEffect(() => {
        const transient = stacks.filter(stk => stk?.status?.endsWith('ing'));
        if (!stacks.length) {
            refresh();
        } else if (transient.length) {
            if (!nextRefresh) {
                nextRefresh = setTimeout(() => refresh(), 3000);
            }
        }
    }, [stacks.length]);

    const startStack = (stack: V1.Stack) => {
        const stackId = stack.id+"";
        return V1.UserAppService.startStack(stackId).then(() => {
            console.log("Stack is now starting...");

            if (!nextRefresh) {
                nextRefresh = setTimeout(() => refresh(), 3000);
            }
        }).catch(reason => handleError("Failed to start stack", reason));
    }
    const stopStack = (stack: V1.Stack) => {
        const stackId = stack.id+"";
        return V1.UserAppService.stopStack(stackId).then(() => {
            console.log("Stack is now stopping...");

            if (!nextRefresh) {
                nextRefresh = setTimeout(() => refresh(), 3000);
            }
        }).catch(reason => handleError("Failed to stop stack", reason));
    }

    const openConsole = (stack: V1.Stack, svc: V1.StackService) => {
        // TODO: open a console
        // TODO: , backdrop: 'static', keyboard: false
        //const state = JSON.parse(JSON.stringify(this.state));
        //setState({ selectedService: svc, showSelected: true });
        setSelectedService(svc);
        setShowSelected(true);
    }

    const closeConsole = () => {
        //const state = JSON.parse(JSON.stringify(this.state));
        //setState({ showSelected: false, selectedService: undefined });
        setShowSelected(false);
        setSelectedService(undefined);
    }

    const waitForStack = async (stackId: string, condition: (stack?: V1.Stack) => boolean): Promise<boolean> => {
        return refresh().then(stks => {
            setStacks(stks);
            const stack = stks.find(stack => stack.id === stackId);
            return condition(stack);
        });
    }




    return (
        <Container fluid={false}>
            <Accordion defaultActiveKey="0">
                {
                    stacks.map((stack, index) =>
                        <Card key={stack.id} style={{ marginTop: "25px", borderRadius: "20px", borderWidth: "2px" }}>
                            <Card.Header style={{
                                textAlign: "left",
                                borderRadius: activated === index ? "18px 18px 0 0" : "18px",
                                backgroundColor: (stack.status === 'started' ? '#CDFFD2' :      // green / ready
                                    (stack.status?.endsWith('ing') ? '#F8DB66' :                // yellow / warning
                                        (stack.status === 'error' ? '#EB2A52' : '#FFFFFF')))    // red / error
                            }} >
                                <Row>
                                    <Col xs={1}>
                                        <img width="60" height="60" src="/ndslabs-badge.png" style={{
                                            borderRadius: "50px",
                                            border: "solid 1px lightgrey"
                                        }} />
                                    </Col>
                                    <Col style={{ textAlign: "left"}}>
                                        <h4 style={{ marginTop: "15px" }}>{stack.name || stack.id}
                                            <span style={{ marginLeft: "30px" }}>
                                                {(!stack?.status || stack?.status === 'stopped') && <FontAwesomeIcon icon={faPowerOff} />}
                                                {(stack?.status === 'started') && <FontAwesomeIcon icon={faCheckCircle}  />}
                                                {(stack?.status === 'error') && <FontAwesomeIcon icon={faExclamationCircle}  />}
                                                {(stack?.status === 'stopping' || stack?.status === 'starting') && <FontAwesomeIcon icon={faSpinner} className={'fa-pulse'} />}
                                            </span>
                                        </h4>
                                    </Col>
                                    <Col xs={3} style={{ textAlign: "right", marginTop: "10px" }}>
                                        {(!stack.status || stack.status === 'stopped') && <>
                                            <Button variant="link" onClick={() => deleteStack(stack)} style={{ color: "black" }} title={'Remove application (' + stack.id + ')'}><FontAwesomeIcon icon={faTrash} /></Button>
                                            <Button variant="link" onClick={() => startStack(stack)} style={{ color: "black" }} title={'Launch this stack'}><FontAwesomeIcon icon={faRocket} /></Button>
                                        </>}
                                        {(stack.status === 'started' || stack.status === 'error' || stack.status === 'starting' || stack.status === 'stopping') &&
                                            <Button variant="link" onClick={() => stopStack(stack)} style={{ color: "black" }} title={'Shutdown this stack'}><FontAwesomeIcon icon={faStop} /></Button>
                                        }
                                    </Col>
                                    <Col xs={1} style={{ marginTop: "3px" }}>
                                        <Accordion.Toggle style={{ color: "black", marginRight: "10px", marginLeft: "30px", display: activated === index ? "none" : "" }} as={Button} variant={"link"}  eventKey={index+""} onClick={() => setActivated(index)}>
                                            <FontAwesomeIcon icon={faCaretDown} size={'2x'} />
                                        </Accordion.Toggle>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion.Collapse as={Card.Body} eventKey={index+""} style={{ padding: "40px 120px" }}>
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
                                                <td key={svc.id+"-status"} width='10%'>{svc.status || 'Stopped'}</td>
                                                <td key={svc.id+"-endpoints"} width='40%'>{svc.service}
                                                    {
                                                        (svc.endpoints || []).map(ep => ep.host &&
                                                            <Button variant="link"
                                                                    key={svc.id+"-endpoint-link-"+ep.host}
                                                                    size={'sm'}
                                                                    hidden={svc.status !== 'ready'}
                                                                    title={'Open ' + svc.service + ' in a new tab'}
                                                                    onClick={() => navigate(stack, ep)}
                                                                    style={{ marginLeft: "20px" }}>
                                                                <FontAwesomeIcon icon={faLink} />
                                                            </Button>
                                                        )
                                                    }
                                                </td>
                                                <td key={svc.id+"-id"}>{svc.id}</td>
                                                <td key={svc.id+"-console"} width='5%' style={{ textAlign: "center"}}>
                                                    <Button variant="link" size={'sm'} style={{ color: "black", width: "35px", height: "30px", border: "2px solid black", borderRadius: "0", padding: "3px" }} disabled={svc.status !== 'ready'} onClick={() => openConsole(stack, svc)}>
                                                        <FontAwesomeIcon icon={faTerminal} />
                                                    </Button>
                                                </td>
                                            </tr>

                                        )
                                    }
                                    </tbody>
                                </Table>
                            </Accordion.Collapse>
                        </Card>
                    )
                }
            </Accordion>

            <Modal show={showSelected}
                   onHide={closeConsole}
                   backdrop="static"
                   fullscreen={'xl-down'}
                   size={'xl'}
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Console: {selectedService?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Console stackService={selectedService} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConsole}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default MyAppsPage;
