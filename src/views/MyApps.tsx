import {useEffect, useState} from 'react';
import '../index.css';
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {V1, handleError} from "../common";

import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {faTerminal} from "@fortawesome/free-solid-svg-icons/faTerminal";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faRocket} from "@fortawesome/free-solid-svg-icons/faRocket";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faExpand} from "@fortawesome/free-solid-svg-icons/faExpand";

import Console from "./Console";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {colors} from "../App";
import ReactGA from "react-ga";


const navigate = (stk: V1.Stack, ep: any) => {
    window.open(`${ep.protocol}://${ep.host}`, '_blank');
}

const sortBy = (s1: V1.Stack, s2: V1.Stack) => {
    const sid1 = s1.name+"";
    const sid2 = s2.name+""
    if (sid1 > sid2) {
        return 1;
    } else if (sid1 < sid2) {
        return -1;
    } else {
        return 0;
    }
}

/*const getSpec = async (key: string) => {
    return await V1.AppSpecService.getServiceById(key);
}*/

function MyAppsPage(props: any) {
    // Global state
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    // Server data
    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);

    // Redirect signal
    const [redirect, setRedirect] = useState('');

    // Refresh signal
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState<any>(undefined);

    // User Selections
    const [activated, setActivated] = useState(0);
    const [selectedService, setSelectedService] = useState<V1.StackService>();
    const [showSelected, setShowSelected] = useState(false);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/my-apps');
        }
    }, [env?.analytics_tracking_id]);

    useEffect(() => {
         const transient = stacks.filter(stk => stk?.status?.endsWith('ing'));
         if (transient.length && !autoRefresh) {
              setAutoRefresh(true);
         }

        if (autoRefresh && !refreshInterval) {
            //setInterval(() => refresh(), 3000);
            const interval = setInterval(() => refresh(), 3000);
            setRefreshInterval(interval);
        } else if (autoRefresh && !transient.length) {
            setAutoRefresh(false);
            if (refreshInterval) {
                clearInterval(refreshInterval);
                setRefreshInterval(undefined);
            }
        }
    }, [autoRefresh, refreshInterval, stacks, stacks.length]);

    useEffect(() => {
        document.title = "Workbench: My Apps";
        V1.AppSpecService.listServices().then(specs => setSpecs(specs)).catch(reason => handleError('Failed to fetch specs: ', reason));
        V1.UserAppService.listStacks().then(stacks => setStacks(stacks)).catch(reason => handleError('Failed to fetch stacks: ', reason));
    }, []);

    const deleteStack = (stack: V1.Stack) => {
        const stackId = stack.id+"";
        return V1.UserAppService.deleteStack(stackId).then(() => {
            if (env?.auth?.gaTrackingId) {
                ReactGA.event({
                    category: 'application',
                    action: 'delete',
                    label: stack.key
                });
            }
            console.log("Stack has been deleted: ", stackId);
            refresh();
        }).catch(reason => handleError("Failed to delete stack", reason));
    }

    const refresh = (): Promise<V1.Stack[]> => {
        return V1.UserAppService.listStacks().then(stacks => {
            return stacks.sort(sortBy);
        }).catch(reason => {
            handleError("Failed to fetch stacks", reason);
            return [];
        }).then(stks => {
            setStacks(stks);
            return stks;
        });
    }

    const startStack = (stack: V1.Stack) => {
        const stackId = stack.id + "";
        //setAutoRefresh(true);
        return V1.UserAppService.startStack(stackId)
            .catch(reason => handleError("Failed to start stack", reason))
            .then(() => {
                if (env?.auth?.gaTrackingId) {
                    ReactGA.event({
                        category: 'application',
                        action: 'start',
                        label: stack.key
                    });
                }
                console.log("Stack is now starting...");
                refresh();
            });
    }
    const stopStack = (stack: V1.Stack) => {
        const stackId = stack.id + "";
        //setAutoRefresh(true);
        return V1.UserAppService.stopStack(stackId)
            .catch(reason => handleError("Failed to stop stack", reason))
            .then(() => {
                if (env?.auth?.gaTrackingId) {
                    ReactGA.event({
                        category: 'application',
                        action: 'stop',
                        label: stack.key
                    });
                }
                console.log("Stack is now stopping...");
                refresh();
            });
    }

    const openConsole = (stack: V1.Stack, svc: V1.StackService) => {
        // TODO: open a console
        // TODO: , backdrop: 'static', keyboard: false
        //const state = JSON.parse(JSON.stringify(this.state));
        //setState({ selectedService: svc, showSelected: true });
        setSelectedService(svc);
        setShowSelected(true);
        if (env?.auth?.gaTrackingId) {
            ReactGA.modalview('/my-apps/console');
        }
    }

    const closeConsole = () => {
        //const state = JSON.parse(JSON.stringify(this.state));
        //setState({ showSelected: false, selectedService: undefined });
        setShowSelected(false);
        setSelectedService(undefined);
    }

    /*const waitForStack = async (stackId: string, condition: (stack?: V1.Stack) => boolean): Promise<boolean> => {
        return refresh().then(stks => {
            setStacks(stks);
            const stack = stks.find(stack => stack.id === stackId);
            return condition(stack);
        });
    }*/

    const openConsoleInNewTab = () => {
        window.open(`/my-apps/${selectedService?.id}`, '_blank');
    }

    const computeStackBorderColor = (stack: V1.Stack, index: number) => {
        return index !== activated && !darkThemeEnabled ? '#EBEBEB' : (stack.status === 'started' ? '#CDFFD2' :    // green / ready
            (stack.status?.endsWith('ing') ? '#F8DB66' :  // yellow / warning
                (stack.status === 'error' ? '#EB2A52' :               // red / error
                    darkThemeEnabled ? '#283845': '#EBEBEB')))
    }

    const computeStackBackgroundColor = (stack: V1.Stack, index: number) => {
        return (stack.status === 'started' ? '#CDFFD2' :    // green / ready
            (stack.status?.endsWith('ing') ? '#F8DB66' :  // yellow / warning
                (stack.status === 'error' ? '#EB2A52' :               // red / error
                    darkThemeEnabled ? '#283845': '#FFFFFF')))
    }

    return (
        <Container fluid={false}>
            {
                redirect && <Redirect to={redirect} />
            }
            <div style={{ height: "10vh" }}></div>
            <Accordion defaultActiveKey="0">
                {
                    // Placeholder for when no applications have been added
                    (!stacks || !stacks.length) && <>
                        <div style={{
                            minHeight: '60vh',
                            border: darkThemeEnabled ? colors.textColor.dark + ' 3px dashed' : colors.textColor.light + ' 3px dashed',
                            borderRadius: '15px',
                            textAlign:'center',
                            backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light
                        }}>
                            <h3 style={{ marginTop: '25vh' }}>
                                Your applications from the catalog will appear here.
                            </h3>
                            <strong>View the list of <Button variant={'link'} size={'sm'} style={{ padding: 0, textDecoration: "none", marginTop: "-4px" }} onClick={() => setRedirect('/all-apps')}>All Apps</Button> to add and launch a new App.</strong>
                        </div>
                    </>
                }
                {
                    // Show the list of all applications added by the user
                    stacks.sort(sortBy).map((stack, index) =>
                        <Card key={stack.id} style={{ marginTop: "25px", borderRadius: "20px", borderWidth: "2px",
                            borderColor: computeStackBorderColor(stack, index),
                            backgroundColor: darkThemeEnabled ? '#283845' : '#fff' }} text={darkThemeEnabled ? 'light' : 'dark'}>
                            <Card.Header style={{
                                textAlign: "left",
                                borderRadius: activated === index ? "18px 18px 0 0" : "18px",
                                borderBottomColor: activated !== index || stack.status !== 'stopped' ? 'transparent' : darkThemeEnabled ? 'white' : 'lightgrey',
                                color: stack.status === 'stopped' && darkThemeEnabled ? 'white' : 'black',
                                backgroundColor: computeStackBackgroundColor(stack, index),       // night mode bg / default bg
                            }}>
                                <Row>
                                    <Col xs={1}>
                                        <img alt={'logo'} width="60" height="60" src={specs.find(s => s.key === stack.key)?.logo || '/ndslabs-badge.png'} style={{
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
                                            <Button variant="link" onClick={() => deleteStack(stack)} style={{ color: darkThemeEnabled && stack.status === 'stopped' ? 'white' : 'black' }} title={'Remove application (' + stack.id + ')'}><FontAwesomeIcon icon={faTrash} /></Button>
                                            <Button variant="link" onClick={() => startStack(stack)} style={{ color: darkThemeEnabled && stack.status === 'stopped' ? 'white' : 'black' }} title={'Launch this stack'}><FontAwesomeIcon icon={faRocket} /></Button>
                                        </>}
                                        {(stack.status === 'started' || stack.status === 'error' || stack.status === 'starting' || stack.status === 'stopping') &&
                                            <Button variant="link" onClick={() => stopStack(stack)} style={{ color: 'black' }} title={'Shutdown this stack'}><FontAwesomeIcon icon={faStop} /></Button>
                                        }
                                    </Col>
                                    <Col xs={1} style={{ marginTop: "3px" }}>
                                        <Accordion.Toggle as={Button} variant={"link"} style={{
                                            color: darkThemeEnabled && stack.status === 'stopped' ? 'white' : 'black',
                                            marginRight: "10px",
                                            marginLeft: "30px",
                                            display: activated === index ? "none" : ""
                                        }}   eventKey={index+""} onClick={() => setActivated(index)}>
                                            <FontAwesomeIcon icon={faCaretDown} size={'2x'} />
                                        </Accordion.Toggle>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion.Collapse as={Card.Body} eventKey={index+""} style={{ padding: "40px 120px" }}>
                                <Table className='compact' responsive='sm' borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                                    <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Name</th>
                                        <th>ID</th>
                                        <th hidden={stack.status !== 'started'}>Console</th>
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
                                                    <Button variant="link" size={'sm'} style={{
                                                        color: darkThemeEnabled ? 'white' : 'black',
                                                        borderColor: darkThemeEnabled ? 'white' : 'black',
                                                        width: "35px", height: "30px",
                                                        borderWidth: "2px", borderRadius: "0",
                                                        padding: "3px" }} hidden={svc.status !== 'ready'} onClick={() => openConsole(stack, svc)}>
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
                   fullscreen={'true'}
                   size={'xl'}
                   keyboard={false}>
                <Modal.Header style={{
                    backgroundColor: darkThemeEnabled ? '#212529' : 'white',
                    color: darkThemeEnabled ? 'white' : 'black',
                }}>
                    <Modal.Title>Application Console: {selectedService?.id}</Modal.Title>
                    <div>
                        <Button variant={darkThemeEnabled ? 'dark' : 'light'} onClick={openConsoleInNewTab}>
                            <FontAwesomeIcon icon={faExpand} />
                        </Button>
                        <Button variant={darkThemeEnabled ? 'dark' : 'light'} onClick={closeConsole}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </div>
                </Modal.Header>
                <Modal.Body as={Console} stackServiceId={selectedService?.id} />

            </Modal>
        </Container>
    );
    /*
    <Modal.Footer>
                    <Button variant="secondary" onClick={closeConsole}>
                        Close
                    </Button>
                </Modal.Footer>
     */
}

export default MyAppsPage;
