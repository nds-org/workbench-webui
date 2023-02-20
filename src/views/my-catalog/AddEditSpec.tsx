import React, {useEffect, useState} from 'react';
import '../../index.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {V1, handleError} from "../../common";

import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

import {useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import ReactGA from "react-ga";

import './AddEditSpec.css';
import Accordion from 'react-bootstrap/Accordion';
import Form from "react-bootstrap/Form";
import {FormControl, Tab, Tabs} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import Card from "react-bootstrap/Card";

const sortBy = (s1: V1.Service, s2: V1.Service) => {
    const sid1 = s1.label+"";
    const sid2 = s2.label+""
    if (sid1 > sid2) {
        return 1;
    } else if (sid1 < sid2) {
        return -1;
    } else {
        return 0;
    }
}

const AddEditSpecPage = (props: any) => {
    // Global state
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);
    const user = useSelector((state: any) => state.auth.user);

    // Query params
    const {specKey} = useParams<{ specKey?: string; }>();

    // Server data
    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);
    const [spec, setSpec] = useState<V1.Service>({
        // Basic Info
        key: '',
        label: '',

        // Access Info
        display: 'standalone',
        access: 'external',

        // Docker info
        image: {
            name: '',
            tags: []
        },

        // Help Info
        logo: '',
        info: '',

        // Tabbed info
        depends: [],
        config: [],
        ports: [],
        volumeMounts: [],

        // TODO: no UI for these yet (advanced features)
        additionalResources: [],
        developerEnvironment: undefined,
        repositories: [],
        command: [],
        args: [],
        catalog: 'user',
        tags: []
    });

    // User selection
    const [selectedTab, setSelectedTab] = useState('BasicInfo');
    const [redirect, setRedirect] = useState<string>('');
    const [showJson, setShowJson] = useState(false);


    useEffect(() => {
        if (env?.customization?.product_name) {
            document.title = `${env?.customization?.product_name}: My Catalog`;
        }
    }, [env]);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/my-catalog');
        }
    }, [env?.analytics_tracking_id]);

    useEffect(() => {
        if (!Object.keys(env).length) return;
        V1.AppSpecService.listServicesAll().then(specs => {
            setSpecs(specs.sort(sortBy));
            if (specKey) {
                const spec = specs.find(s => s.key === specKey)
                if (spec) {
                    setSpec(spec);
                }
            }
        }).catch(reason => handleError('Failed to fetch specs: ', reason));
        V1.UserAppService.listUserapps().then(stacks => setStacks(stacks)).catch(reason => handleError('Failed to fetch stacks: ', reason));
    }, [env, specKey]);

    /** Basic Info tab functions */
    const handleFieldChange = (event: any, field: string) => {
        console.log("Handling change to field: ", field);
        if (field === 'imageName') {
            spec.image.name = event.target.value;
        } else {
            // @ts-ignore
            spec[field] = event.target.value;
        }

        setSpec({...spec});
    }

    const handleTagChange = (event: any, tagIndex: number) => {
        console.log("Handling change to tag: ", event);
        spec.image.tags[tagIndex] = event.target.value;
        setSpec({...spec});
    };

    const addTag = () => {
        const tags = spec.image.tags || [];
        tags.push('');
        spec.image.tags = tags;
        setSpec({...spec});
    }

    const removeTag = (tagIndex: number) => {
        console.log("Removing tag: ", tagIndex);
        spec.image.tags.splice(tagIndex, 1);
        setSpec({...spec});
    }

    /** Dependencies tab functions */
    const handleDepChange = (event: any, depIndex: number, field: string) => {
        console.log("Handling change to dependency: ", depIndex);
        const dep: V1.ServiceDependency = spec.depends[depIndex];
        if (field === 'required') {
            dep.required = !dep.required;
        } else {
            // @ts-ignore
            dep[field] = event.target.value;
        }
        spec.depends[depIndex] = dep;
        setSpec({...spec});
    }

    const removeDependency = (depIndex: number) => {
        console.log("Removing dependency: ", depIndex);
        spec.depends.splice(depIndex, 1);
        setSpec({...spec});
    }

    const addDependency = () => {
        const newDep: V1.ServiceDependency = {
            key: '',
            required: false
        };
        console.log("Adding dependency: ", newDep);
        spec.depends.push(newDep);
        setSpec({...spec});
    }

    /** Environments tab functions */

    const handleEnvChange = (event: any, envIndex: number, field: string) => {
        console.log("Handling change to env: ", event);
        const config: V1.Config = spec.config[envIndex];
        if (field === 'isPassword') {
            config.isPassword = !config.isPassword;
        } else if (field === 'canOverride') {
            config.canOverride = !config.canOverride;
        } else {
            // @ts-ignore
            config[field] = event.target.value;
        }
        spec.config[envIndex] = config;
        setSpec({...spec});
    };

    const removeEnv = (envIndex: number) => {
        console.log("Removing env: ", envIndex);
        spec.config.splice(envIndex, 1);
        setSpec({...spec});
    }

    const addEnv = () => {
        const newEnv: V1.Config = {
            name: '',
            value: '',
            label: '',
            isPassword: false,
            canOverride: false
        };
        console.log("Adding env: ", newEnv);
        spec.config.push(newEnv);
        setSpec({...spec});
    }

    /** Ports tab functions */
    const handlePortChange = (event: any, portIndex: number, field: string) => {
        console.log("Handling change to port: ", event);
        const port: V1.Port = spec.ports[portIndex];
        // @ts-ignore
        port[field] = event.target.value;
        spec.ports[portIndex] = port;
        setSpec({...spec});
    };
    const removePort = (portIndex: number) => {
        console.log("Removing port: ", portIndex);
        spec.ports.splice(portIndex, 1);
        setSpec({...spec});
    }

    const addPort = () => {
        const newPort: V1.Port = {
            protocol: 'http',
            port: 80,
            contextPath: '',
        };
        console.log("Adding port: ", newPort);
        spec.ports.push(newPort);
        setSpec({...spec});
    }


    /** Volumes tab functions */

    const handleVolChange = (event: any, volIndex: number, field: string) => {
        console.log("Handling change to volume: ", event);
        const volume: V1.VolumeMount = spec.volumeMounts[volIndex];
        // @ts-ignore
        volume[field] = event.target.value;
        spec.volumeMounts[volIndex] = volume;
        setSpec({...spec});
    };
    const removeVolume = (volIndex: number) => {
        console.log("Removing volume: ", volIndex);
        spec.volumeMounts.splice(volIndex, 1);
        setSpec({...spec});
    }

    const addVolume = () => {
        const newVolume: V1.VolumeMount = {
            mountPath: '',
            defaultPath: '',
        };
        console.log("Adding volume: ", newVolume);
        spec.volumeMounts.push(newVolume);
        setSpec({...spec});
    }

    /** Button bar functions */

    const cancelSave = (spec: V1.Service) => {
        setRedirect('/my-catalog');
    }

    const saveSpec = (spec: V1.Service) => {
        if (spec.catalog === 'system' && !user?.groups?.includes('/workbench-admin')) {
            // User is not an admin
            return;
        }

        if (specKey) {
            V1.AppSpecService.updateService(spec.key, spec).then((updated: V1.Service) => {
                setRedirect('/my-catalog')
            });
        } else {
            V1.AppSpecService.createService(spec).then((created: V1.Service) => {
                setRedirect('/my-catalog')
            });
        }
    }

    const css = `
        #outerTabBar-tab-BasicInfo,
        #outerTabBar-tab-Dependencies,
        #outerTabBar-tab-Environment,
        #outerTabBar-tab-Volumes,
        #outerTabBar-tab-Ports {
            color: ${darkThemeEnabled ? 'white' : 'black'}
        }
        #outerTabBar-tab-BasicInfo.nav-link.active,
        #outerTabBar-tab-Dependencies.nav-link.active,
        #outerTabBar-tab-Environment.nav-link.active,
        #outerTabBar-tab-Volumes.nav-link.active,
        #outerTabBar-tab-Ports.nav-link.active {
            color: black;
        }
    `;

    return (
        <Container fluid={false}>
            {
                redirect && <Navigate to={redirect} replace />
            }
            <style>{css}</style>
            <div style={{ height: "10vh" }}></div>
            <Row>
                <Col className={'text-align-left'}>
                    <h2>{specKey ? 'Edit Application: ' + specKey : 'Create New Application'}</h2>
                </Col>
                <Col className={'text-align-right'}>
                    <Button className={'btn-lg btn-secondary'} onClick={() => cancelSave(spec)}>
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                    </Button>
                    <Button disabled={!spec.key || !spec.image.name || !(spec.image.tags.length && spec.image.tags[0])} className={'btn-lg btn-success'} onClick={() => saveSpec(spec)}>
                        <FontAwesomeIcon icon={faSave} /> Save
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Tabs id={'outerTabBar'} activeKey={selectedTab} onSelect={(e: any) => e && setSelectedTab(e)} fill
                              style={{
                                  textAlign: "left",
                                  color: darkThemeEnabled ? 'white' : 'black',
                                  backgroundColor: darkThemeEnabled ? '#283845' : '#eee',       // night mode bg / default bg
                              }}>
                            <Tab title={'Basic Info'} key={'BasicInfo'} eventKey={'BasicInfo'} style={{ margin: "25px", color: darkThemeEnabled ? 'white' : 'black' }}>
                                <Row>
                                    <Col className={'text-align-left marginTop'}>
                                        <h3>Basic Info</h3>
                                        <FormGroup>
                                            <Form.Label>Key<span className={'text-red'}>*</span></Form.Label>
                                            <FormControl required value={spec.key} onChange={(e) => handleFieldChange(e, 'key')}></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Label</Form.Label>
                                            <FormControl value={spec.label} onChange={(e) => handleFieldChange(e, 'label')}></FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col className={'text-align-left marginTop'}>
                                        <h3>Docker Info</h3>
                                        <FormGroup>
                                            <Form.Label>Image Name<span className={'text-red'}>*</span></Form.Label>
                                            <Form.Control required value={spec.image.name} onChange={(e) => handleFieldChange(e, 'imageName')}></Form.Control>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Tags<span className={'text-red'}>*</span></Form.Label>
                                            <Table>
                                                <tbody>
                                                {
                                                    spec?.image?.tags?.map((tag, tagIndex) => <tr>
                                                        <td width='5%'>
                                                            <Button className={'btn-secondary btn-sm'} onClick={() => removeTag(tagIndex)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                        </td>
                                                        <td>
                                                            <FormControl required value={tag} onChange={(e) => handleTagChange(e, tagIndex)}></FormControl>
                                                        </td>
                                                    </tr>)
                                                }
                                                <tr>
                                                    <td>
                                                        <Button className={'btn-primary btn-sm marginLeft'} onClick={() => addTag()}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </Button>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col className={'text-align-left marginTop'}>
                                        <h3>Access Info</h3>
                                        <FormGroup>
                                            <Form.Label>Display on All Apps?</Form.Label>
                                            <Form.Control as="select" defaultValue="stack" onChange={(e) => handleFieldChange(e, 'display')}>
                                                <option value={'stack'}>Display in All Apps page</option>
                                                <option value={'standalone'}>Do not display in All Apps page</option>
                                            </Form.Control>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Who else can access this app?</Form.Label>
                                            <Form.Control as="select" defaultValue="external" onChange={(e) => handleFieldChange(e, 'access')}>
                                                <option value={'external'}>External - Publicly Accessible</option>
                                                <option value={'internal'}>Internal - Accessible only from within Cluster</option>
                                                <option value={'none'}>None - Isolate this app on the network</option>
                                            </Form.Control>
                                        </FormGroup>
                                    </Col>
                                    <Col className={'text-align-left marginTop'}>
                                        <h3>Help Info</h3>
                                        <FormGroup>
                                            <Form.Label>Logo (optional)</Form.Label>
                                            <FormControl value={spec.logo} onChange={(e) => handleFieldChange(e, 'logo')}></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Info URL (optional)</Form.Label>
                                            <FormControl value={spec.info} onChange={(e) => handleFieldChange(e, 'info')}></FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab title={'Dependencies'} key={'Dependencies'} eventKey={'Dependencies'}>
                                <Table size={'sm'} borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Service Key</th>
                                        <th>Required?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        spec?.depends?.map((dep, depIndex) => <tr key={"dep-"+depIndex}>
                                            <td>
                                                <Button className={'btn-secondary btn-sm'} onClick={() => removeDependency(depIndex)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                            <td>
                                                <Form.Group controlId="depKey">
                                                    <Form.Control as="select" required name={'depKey'} defaultValue="stack" value={dep.key || 'Choose a dependency service'} onChange={(e) => handleDepChange(e, depIndex, 'key')}>
                                                        {
                                                            specs.map(spec => <option value={spec.key}>{spec.label} ({spec.key})</option>)
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="depRequired">
                                                    <Form.Check inline type="checkbox" name={'depRequired'} checked={dep.required} onChange={(e) => handleDepChange(e, depIndex, 'required')} />
                                                </Form.Group>
                                            </td>
                                        </tr>)
                                    }
                                    <tr>
                                        <td>
                                            <Button className={'btn-primary btn-sm'} onClick={() => addDependency()}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab title={'Environment'} key={'Environment'} eventKey={'Environment'}>
                                <Table size={'sm'} borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Label</th>
                                            <th>Value</th>
                                            <th>Is Password?</th>
                                            <th>Can Override?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        spec?.config?.map((cfg, envIndex) => <tr key={"env-"+envIndex}>
                                            <td>
                                                <Button className={'btn-secondary btn-sm'} onClick={() => removeEnv(envIndex)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                            <td>
                                                <Form.Group controlId="envName">
                                                    <Form.Control required name={'envName'} type="text" placeholder="Name is required" value={cfg.name} onChange={(e) => handleEnvChange(e, envIndex, 'name')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="envLabel">
                                                    <Form.Control name={'envLabel'} type="text" placeholder="Enter a label (optional)" value={cfg.label} onChange={(e) => handleEnvChange(e, envIndex, 'label')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="envVal">
                                                    <Form.Control type="text" name={'envValue'} placeholder="Enter a value (optional)" value={cfg.value} onChange={(e) => handleEnvChange(e, envIndex, 'value')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="envIsPassword">
                                                    <Form.Check inline type="checkbox" name={'envIsPassword'} checked={cfg.isPassword} onChange={(e) => handleEnvChange(e, envIndex, 'isPassword')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="envCanOverride">
                                                    <Form.Check inline type="checkbox" name={'envCanOverride'} checked={cfg.canOverride} onChange={(e) => handleEnvChange(e, envIndex, 'canOverride')} />
                                                </Form.Group>
                                            </td>
                                        </tr>)
                                    }
                                        <tr>
                                            <td>
                                                <Button className={'btn-primary btn-sm'} onClick={() => addEnv()}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Tab>

                            <Tab title={'Volumes'} key={'Volumes'} eventKey={'Volumes'}>
                                <Table size={'sm'} borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Container Mount Path</th>
                                        <th>From SubPath (optional)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        spec?.volumeMounts?.map((volume, volIndex) => <tr key={"vol-"+volIndex}>
                                            <td>
                                                <Button className={'btn-secondary btn-sm'} onClick={() => removeVolume(volIndex)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                            <td>
                                                <Form.Group controlId="volumeMountPath">
                                                    <Form.Control name={'volumeMountPath'} type="text" placeholder="Mount path is required"  value={volume.mountPath} onChange={(e) => handleVolChange(e, volIndex, 'mountPath')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="volumeDefaultPath">
                                                    <Form.Control type="text" name={'volumeDefaultPath'} placeholder="SubPath from User's Home folder (optional)" value={volume.defaultPath} onChange={(e) => handleVolChange(e, volIndex, 'defaultPath')} />
                                                </Form.Group>
                                            </td>
                                        </tr>)
                                    }
                                    <tr>
                                        <td>
                                            <Button className={'btn-primary btn-sm'} onClick={() => addVolume()}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Tab>

                            <Tab title={'Ports'} key={'Ports'} eventKey={'Ports'}>
                                <Table size={'sm'} borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Protocol</th>
                                        <th>Port Number</th>
                                        <th>Context Path</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        spec?.ports?.map((port, portIndex) => <tr key={"port-"+portIndex}>
                                            <td>
                                                <Button className={'btn-secondary btn-sm'} onClick={() => removePort(portIndex)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                            <td>
                                                <Form.Group controlId="portProtocol">
                                                    <Form.Control as={'select'} name={'portProtocol'} placeholder="Choose a protocol (optional)" value={port.protocol} onChange={(e) => handlePortChange(e, portIndex, 'protocol')}>
                                                        <option>HTTP</option>
                                                        <option>TCP</option>
                                                        <option>UDP</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="portPort">
                                                    <Form.Control name={'portPort'} type="number" min={1} max={65535} value={port.port} onChange={(e) => handlePortChange(e, portIndex, 'port')} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                {
                                                    port?.protocol?.toLowerCase() === 'http' && <>
                                                        <Form.Group controlId="portContextPath">
                                                            <Form.Control required name={'portContextPath'} type="text" placeholder="Enter context path (optional)" value={port.contextPath} onChange={(e) => handlePortChange(e, portIndex, 'contextPath')} />
                                                        </Form.Group>
                                                    </>
                                                }
                                            </td>
                                        </tr>)
                                    }
                                    <tr>
                                        <td>
                                            <Button className={'btn-primary btn-sm'} onClick={() => addPort()}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Accordion >
                        <Card id={'showJsonCard'} bg={darkThemeEnabled ? 'dark' : 'light'} style={{ marginTop: "25px", borderRadius: "20px", borderWidth: "2px",
                            borderColor: darkThemeEnabled ? '#283845' : '#fff',
                            backgroundColor: darkThemeEnabled ? '#283845' : '#fff' }} text={darkThemeEnabled ? 'light' : 'dark'}>
                            <Card.Header style={{
                                textAlign: "left",
                                borderRadius: showJson ? "18px 18px 0 0" : "18px",
                                borderBottomColor: !showJson  ? 'transparent' : darkThemeEnabled ? 'white' : 'lightgrey',
                                color: darkThemeEnabled ? 'white' : 'black',
                                backgroundColor: darkThemeEnabled ? '#283845' : '#fff',       // night mode bg / default bg
                            }}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={() => setShowJson(!showJson)} style={{
                                    color: darkThemeEnabled ? 'white' : 'black',
                                    marginRight: "10px",
                                    marginLeft: "30px"
                                }}>
                                    {showJson ? 'Hide' : 'Show'} JSON Spec
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0" style={{textAlign: "left"}}>
                                <Card.Body><pre>{JSON.stringify(spec, null, 4)}</pre></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default AddEditSpecPage;
