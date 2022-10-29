import {handleError, V1} from "../../common";
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {useSelector} from "react-redux";
import ReactGA from "react-ga";

import './SpecView.css';
import {newStack} from "../../common/services/userapps.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

interface SpecViewParams {
    specKey: string;
}

function SpecView() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { specKey } = useParams<SpecViewParams>();
    const [ tags, setTags ] = useState<Array<any>>([]);
    const [ spec, setSpec ] = useState<V1.Service>();
    const [ specs, setSpecs ] = useState<Array<V1.Service>>([]);

    const [ redirect, setRedirect ] = useState('');

    const installApplication = (): void => {
        const appSpec = specs.find(s => s.key === specKey);
        if (!appSpec) {
            return;
        }
        const userApp: V1.Stack = newStack(appSpec, specs);

        // POST /stacks
        V1.UserAppService.createUserapp(userApp).then(stk => {
            ReactGA.event({
                category: 'application',
                action: 'add',
                label: stk.key
            });
            setRedirect(`/my-apps`);
        }).catch(reason => handleError(`Failed to add ${userApp.key} user app`, reason));
    }

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/all-apps/' + specKey);
        }
    }, [specKey, env?.analytics_tracking_id]);

    useEffect(() => {
        V1.AppSpecService.listServicesAll().then((specs: Array<V1.Service>) => {
            setSpecs(specs || []);
        }).catch(reason => handleError('Failed to fetch specs: ', reason));
    }, []);

    useEffect(() => {
        V1.VocabularyService.getVocabularyByName("tags").then((tags: V1.Vocabulary) => {
            setTags(tags.terms || []);
        }).catch(reason => handleError('Failed to fetch tags: ', reason));
    }, []);

    useEffect(() => {
        V1.AppSpecService.getServiceById(specKey).then((target: V1.Service) => {
            setSpec(target);
        }).catch(reason => handleError(`Failed to fetch spec=${specKey}: `, reason));
    }, [specKey, specs, darkThemeEnabled]);

    return (
        <>
            {!spec && <p>Loading... Please Wait!</p>}
            {
                redirect && <Redirect to={redirect} />
            }
            {spec && <>
                    <Row style={{ marginTop: "50px" }}>
                        <Col xs={1} style={{ textAlign: "center", paddingTop: "20px" }}>
                            <Button variant="link" onClick={() => setRedirect('/all-apps')}><FontAwesomeIcon icon={faChevronLeft} style={{ color: darkThemeEnabled ? "white" : "black" }}/></Button>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={2}>
                                    <img alt={spec?.key} height="200" width="200" src={spec?.logo} style={{ borderRadius: "50px" }} />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col style={{ textAlign: "left" }}>
                                            <h1>{spec?.label || spec?.key}</h1>
                                            <small>ID: {spec.key}</small>
                                        </Col>
                                        <Col sm={2}>
                                            <Button variant={'link'} style={{ padding: "1px",  width: "30px", height: "30px", borderRadius: "25px", border: darkThemeEnabled ? 'white 2px solid' : 'darkgrey 2px solid', marginTop: "15px" }} onClick={installApplication}>
                                                <FontAwesomeIcon className={'fa-fw'} icon={faPlus} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                                            </Button>
                                            {
                                                // TODO: "More Actions" Dropdown...
                                            }
                                            <Button hidden={true} variant="link" style={{ color: darkThemeEnabled ? "white" : "black" }}><FontAwesomeIcon icon={faEllipsisV} /></Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ textAlign: "left" }}>
                                           <p className={'description-text'}>{spec?.description}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Col style={{ textAlign: "left", marginTop: "50px" }} sm={11}>
                                {
                                    spec?.tags?.length > 0 && <>
                                        <hr/>
                                        <Row>
                                            <Col sm={3}>
                                                <h4>
                                                    Tags
                                                    <span className="badge rounded-pill" style={{
                                                        backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                                        color: darkThemeEnabled ? 'white' : '#283845'
                                                    }}>
                                                    {(spec?.tags || []).length}
                                                </span>
                                                </h4>
                                            </Col>
                                            <Col style={{ textAlign: "left" }}>
                                                {
                                                    spec?.tags?.map(tag => <>
                                                            {
                                                                tags.find(t => tag === t.id) && <>
                                                                    <Button className="btn btn-sm btn-warning"
                                                                            style={{borderRadius: "10px"}}
                                                                            onClick={() => setRedirect('/all-apps#' + tags.find(t => t.id == tag)?.name)}>{
                                                                        tags.find(t => tag === t.id)?.name}
                                                                    </Button>
                                                                </>
                                                            }
                                                        </>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                }
                                {
                                    (specs || [])
                                        .filter(s => (s?.depends || [])
                                            .find(d => d.key === spec.key))?.length > 0 && <>
                                    <hr/>
                                    <Row>
                                        <Col sm={3}>
                                            <h4>Dependency Of
                                                <span className="badge rounded-pill" style={{
                                                    backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                                    color: darkThemeEnabled ? 'white' : '#283845'
                                                }}>
                                            {(specs || [])
                                                .filter(s => (s?.depends || [])
                                                    .find(d => d.key === spec.key))?.length}
                                        </span>
                                            </h4>
                                        </Col>

                                        <Col sm={6}>
                                            {
                                                // Render something for apps that depend on this app
                                                (specs || []).filter(s => s?.depends?.find(d => d.key === spec.key)).map(s => s && <>
                                                    <Button key={spec.key+'-dep-of-'+s.key}
                                                            style={{ borderRadius: "10px" }}
                                                            className="btn btn-sm btn-info"
                                                            onClick={() => setRedirect('/all-apps/' + s.key)}>
                                                        {specs.find(spec => spec.key === s.key)?.label || s.key}
                                                    </Button>
                                                </>)
                                            }
                                        </Col>
                                    </Row>
                                    </>
                                }
                                {
                                    spec?.depends?.length > 0 && <>
                                        <hr/>
                                        <Row>
                                            <Col sm={3}>
                                                <h4>Dependencies
                                                    <span className={"badge rounded-pill"} style={{
                                                        backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                                        color: darkThemeEnabled ? 'white' : '#283845'
                                                    }}>{(spec?.depends || []).length}</span>
                                                </h4>
                                            </Col>

                                            <Col sm={6}>
                                                {
                                                    // Render something for apps that depend on this one
                                                    spec?.depends?.map(dep => <>
                                                        <Button key={spec.key+'-dep-'+dep.key}
                                                                style={{ borderRadius: "10px" }}
                                                                className="btn btn-sm btn-info"
                                                                onClick={() => setRedirect('/all-apps/' + dep.key)}>
                                                            {(specs || []).find(s => s.key === dep.key)?.label}
                                                            {
                                                                dep.required && <div><small>(required)</small></div>
                                                            }
                                                        </Button>
                                                    </>)
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                }
                                {
                                    (specs || []).filter((s: V1.Service) => spec.tags?.some(t => s?.tags?.includes(t)))?.length > 0 && <>
                                        <hr/>
                                        <Row>
                                            <Col sm={3}>

                                                <h4>
                                                    Related Apps
                                                    <span className="badge rounded-pill" style={{
                                                        backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                                        color: darkThemeEnabled ? 'white' : '#283845'
                                                    }}>
                                                {(specs || []).filter((s: V1.Service) => spec.key !== s.key && spec.tags?.some(t => s?.tags?.includes(t)))?.length}
                                            </span>
                                                </h4>
                                            </Col>
                                            <Col sm={6}>
                                                {
                                                    // Render something for other apps with same tags
                                                    (specs || []).filter((s: V1.Service) => spec.key !== s.key && spec.tags?.some(t => s?.tags?.includes(t)))?.map(s => <>
                                                        <Button key={spec.key+'-tag-'+s.key}
                                                                style={{ borderRadius: "10px" }}
                                                                className="btn btn-sm btn-info"
                                                                onClick={() => setRedirect('/all-apps/' + s.key)}>
                                                            {s.label || s.key}
                                                        </Button>
                                                    </>)
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                }
                                <hr />

                            </Col>
                            <Row style={{ textAlign: "left" }}>
                                <Col xs={3}>
                                    <h4>Help & Support</h4>
                                </Col>
                                <Col xs={5}>
                                    Maintainer: {spec?.maintainer || 'Anonymous'}
                                </Col>
                            </Row>


                            {
                                spec?.additionalResources?.length > 0 && <>
                                    <Row>
                                        <Col sm={11}>
                                            <hr/>
                                            <h4>Additional Resources</h4>
                                            <ul>
                                                {
                                                    spec?.additionalResources?.map(r => <>
                                                        <li key={'addl-resrc-'+r} style={{ marginTop: "50px",minHeight:"200px"}}>{r}</li>
                                                    </>)
                                                }
                                            </ul>
                                        </Col>
                                    </Row>
                                </>
                            }

                        </Col>
                    </Row>
                </>
            }
        </>
    );
}

export default SpecView;
