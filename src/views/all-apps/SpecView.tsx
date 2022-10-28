import {handleError, V1} from "../../common";
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import Taglist from "./Taglist";
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
    }, [specKey, specs]);

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
                                <Col xs={1}>
                                    <img alt={spec?.key} height="75" width="75" src={spec?.logo} style={{ borderRadius: "50px" }} />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col sm={4} style={{ textAlign: "left" }}><h1>{spec?.label || spec?.key}</h1></Col>
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
                                        <Col sm={4}>
                                            <Taglist tags={tags} spec={spec} chunkSize={4} onClick={(tag) => setRedirect('/all-apps#' + tag?.name)}></Taglist>

                                            <p className={'description-text'}>{spec?.description}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>


                            {
                                spec?.additionalResources?.map(r => <>
                                    <Row key={'addl-resrc-'+r} style={{ marginTop: "50px",minHeight:"200px"}}>{r}</Row>
                                </>)
                            }
                            <hr />
                            <Row hidden={true}>
                                <Col xs={6}>
                                    <h4>Information</h4>
                                </Col>
                                <Col xs={6}>
                                    <h4>Help & Support</h4>
                                    {spec?.maintainer}
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                            {
                                // Render something for apps that depend on this app
                                (specs || []).filter(s => s?.depends?.find(d => d.key === spec.key)).map(s => s && <div key={spec.key+'-dep-of-'+s.key}>
                                    <button className="btn btn-sm btn-outline-primary dependency-link" onClick={() => setRedirect('/all-apps/' + s.key)}>
                                        {specs.find(spec => spec.key === s.key)?.label || s.key}
                                    </button>
                                    {
                                        s.depends.find(d => d.key === spec.key && d.required) && <small>(required)</small>
                                    }
                                </div>)
                            }
                        </Col>
                        <Col>
                            <h4>Dependencies
                                <span className={"badge rounded-pill"} style={{
                                    backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                    color: darkThemeEnabled ? 'white' : '#283845'
                                }}>{(spec?.depends || []).length}</span>
                            </h4>
                            {
                                // TODO: Render something for apps that are dependencies
                                spec?.depends?.map(dep => <div key={spec.key+'-dep-'+dep.key}>
                                    <button type="button" className="btn btn-sm btn-outline-primary dependency-link" onClick={() => setRedirect('/all-apps/' + dep.key)}>
                                        {(specs || []).find(s => s.key === dep.key)?.label}</button>
                                    {
                                        dep.required && <small>(required)</small>
                                    }
                                </div>)
                            }
                        </Col>
                        <Col>
                            <h4>
                                Related Apps
                                <span className="badge rounded-pill" style={{
                                    backgroundColor: darkThemeEnabled ? '#283845' : '#ddd',
                                    color: darkThemeEnabled ? 'white' : '#283845'
                                }}>
                                    {(specs || []).filter((s: V1.Service) => spec.tags?.some(t => s?.tags?.includes(t)))?.length}
                                </span>
                            </h4>
                            {
                                // TODO: Render something for other apps with same tags
                                (specs || []).filter((s: V1.Service) => spec.tags?.some(t => s?.tags?.includes(t)))?.map(s => <div key={spec.key+'-tag-'+s.key}>
                                    <button style={{ backgroundColor: 'white' }}
                                            className="btn btn-sm btn-outline-primary dependency-link"
                                            onClick={() => setRedirect('/all-apps/' + s.key)}>
                                        {s.label || s.key}
                                    </button>
                                </div>)
                            }
                        </Col>
                    </Row>
                </>
            }
        </>
    );
}

export default SpecView;
