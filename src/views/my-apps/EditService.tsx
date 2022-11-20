import {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Redirect, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

import ReactGA from "react-ga";
import {Button, Col, Form, Nav, Row, Tab, Table, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {V1} from "../../common";

interface EnvVar {
    name: string;
    value: string;
}

interface ServiceVars {
    service: string;
    env: Array<EnvVar>;
}

function EditServicePage(props: {}) {
    const env = useSelector((state: any) => state.env);
    const user = useSelector((state: any) => state.auth.user);

    const tabNames = ['Environment Variables'];
    const {stackId} = useParams<{ stackId: string; }>();
    const [saving, setSaving] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [userApp, setUserApp] = useState<V1.Stack>();
    const [key, setKey] = useState<string>('0');
    const [innerKey, setInnerKey] = useState<string>(tabNames[0]);
    const [vars, setVars] = useState<Array<ServiceVars>>([]);

    useEffect(() => {
        if (env?.customization?.product_name && user) {
            const username = user?.sub?.replace('@', '')?.replace('.', '');
            document.title = `${env?.customization?.product_name}: Edit ${username}-${stackId}`;
        }
    }, [env, user, stackId]);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/edit');
        }
    }, [env?.analytics_tracking_id]);


    useEffect(() => {
        V1.UserAppService.getUserappById(stackId).then((app) => {
            const serviceVars: Array<ServiceVars> = [];
            app?.services?.forEach((svc: V1.StackService) => {
                const env: Array<EnvVar> = [];
                for (const name in svc?.config) {
                    const value = svc.config[name];
                    env.push({name, value});
                }
                serviceVars.push({service: svc.service, env });
            })
            setUserApp(app);
            setVars(serviceVars);
            if (app?.services?.length) {
                setKey(app?.services[0].service);
            }
        });
    }, [stackId]);

    const css = `
        #editContainer {
            margin-top: 10vh;
        }
        .marginTop {
            margin-top: 2vh;
        }
        .marginRight {
            margin-right: 2vh;
        }
        .nav.nav-pills {
            border-bottom: 0;
        }
        .nav-link.active {
            border-bottom: none;
            margin-bottom: 0;
        }
        input:invalid {
            border-color: red;
        }
    `;


    const addVar = (svc: string) => {
        const envVars = vars;
        const svcEnv = vars.find(s => s.service === svc);
        if (!svcEnv) {
            console.error(`Failed to find service with key=${svc}`);
            return;
        }
        const index = envVars.indexOf(svcEnv);
        svcEnv.env.push({name: '', value: ''});
        envVars[index] = svcEnv;
        setVars([...envVars]);
    }

    const handleChange = (event: any, serviceKey: string, envIndex: number, field: string = 'name') => {
        console.log("Handling change to target: ", );
        const envVars = vars;
        const svcEnv = vars.find(s => s.service === serviceKey);
        if (!svcEnv) {
            console.error(`Failed to find service with key=${serviceKey}`);
            return;
        }
        const index = envVars.indexOf(svcEnv);
        const env: any = svcEnv.env[envIndex];
        env[field] = event.target.value;
        envVars[index] = svcEnv;
        setVars([...envVars]);
    };

    const save = () => {
        setSaving(true);
        userApp?.services?.forEach(svc => {
            const svcEnv = vars.find(s => s.service === svc.service);
            svc.config = {};
            svcEnv?.env?.forEach(e => svc.config[e.name] = e.value);
            V1.UserAppService.updateUserapp(stackId, userApp).then((updated) => {
                console.log("UserApp saved: ", updated);
                setRedirect('/my-apps');
            }).finally(() => {
                setSaving(false);
            });
        });
    }

    const disabled = (): boolean => {
        if (saving) return true;
        if (!userApp?.services) {
            return false;
        }
        for (const svc of userApp?.services) {
            const svcEnv = vars.find(s => s.service === svc.service);
            svc.config = {};
            if (!svcEnv?.env) {
                continue;
            }
            for (const env of svcEnv?.env) {
                if (!env.name) return true;
            }
        }
        return false;
    }

    if (!stackId || !userApp) {
        return <></>
    }

    return <Container id={'editContainer'} style={{textAlign: "left"}}>
        <style>{css}</style>
        {
            redirect && <Redirect to={redirect}></Redirect>
        }
        <Button variant="link" onClick={() => window.location.href = '/my-apps'}>
            <FontAwesomeIcon icon={'caret-left'} className={'marginRight'} />
            My Apps
        </Button>
        <h2 className={'marginTop'}>Edit UserApp: {user?.sub.replace('@', '').replace('.', '')}-{stackId}</h2>
        <Tabs id={'outerTabBar'} activeKey={key} onSelect={(e) => e && setKey(e)} fill>
            {
                userApp?.services?.map((svc, index) => <Tab title={svc.service} key={svc.service+"-svc-"+index} eventKey={svc.service}>
                    <Tab.Container id={'innerTabBar'} key={innerKey} activeKey={innerKey} onSelect={(e) => e && setInnerKey(e)}>
                        <Row key={'env-row-0'} className={'marginTop'}>
                            <Col key={'env-col-0'} sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        {tabNames.map(name => <Nav.Link key={name} eventKey={name}>{name}</Nav.Link>)}
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col key={'env-col-1'} sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Environment Variables">
                                        <Form>
                                            <h4>Environment: {svc.service}</h4>
                                            {
                                                vars.filter(s => svc.service === s.service).map((sv, svcIndex) => <span key={svc.service+"-var-"+svcIndex}>
                                                    <Table size={'sm'}>
                                                        <tbody>
                                                        {
                                                            sv?.env?.map((e, envIndex) => <tr key={svc.service+"-env-"+envIndex} >
                                                                <td>
                                                                    <Form.Group controlId="envName">
                                                                        <Form.Control required name={'envName'} type="text" placeholder="Name is required" value={e.name} onChange={(e) => handleChange(e, svc.service, envIndex, 'name')} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td>
                                                                    <Form.Group controlId="envVal">
                                                                        <Form.Control type="text" name={'envValue'} placeholder="Enter a value (optional)" value={e.value} onChange={(e) => handleChange(e, svc.service, envIndex, 'value')} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>)
                                                        }
                                                        </tbody>
                                                    </Table>

                                                    Total: {sv?.env?.length}
                                                </span>)
                                        }
                                        </Form>

                                        <Button onClick={() => addVar(svc.service)}><FontAwesomeIcon icon={'plus'} /></Button>
                                        <Button disabled={disabled()} className={'btn-success'} onClick={save}><FontAwesomeIcon className={saving ? 'fa-spin' : ''} icon={saving ? 'spinner' : 'save'} /></Button>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Tab>)
            }
        </Tabs>
    </Container>
}

export default EditServicePage;
