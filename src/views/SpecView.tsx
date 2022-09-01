import {handleError, V1} from "../common";
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import Taglist from "../common/taglist/Taglist";
import {useSelector} from "react-redux";
import Badge from "react-bootstrap/Badge";
import ReactGA from "react-ga";

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
    }, [specKey]);

    return (
        <>
            {!spec && <p>Loading... Please Wait!</p>}
            {
                redirect && <Redirect to={redirect} />
            }
            {spec &&
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
                                <Row><Col style={{ textAlign: "left" }}><h1>{spec?.label || spec?.key}</h1></Col></Row>
                                <Row><Col><Taglist tags={tags} spec={spec} chunkSize={4} onClick={(tag) => setRedirect('/all-apps#' + tag?.name)} /></Col></Row>
                            </Col>
                            <Col xs={2}>
                                <Button variant={ darkThemeEnabled ? 'light' : 'dark' }>Add</Button>
                                {
                                    // TODO: "More Actions" Dropdown...
                                }
                                <Button hidden={true} variant="link" style={{ color: darkThemeEnabled ? "white" : "black" }}><FontAwesomeIcon icon={faEllipsisV} /></Button>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: "50px",minHeight:"200px"}}>{spec?.description}</Row>
                        <hr style={{ marginTop: "100px" }} />
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
                    <Col xs={3}>
                        {
                            spec?.depends?.length > 0 && <h4>Dependencies <Badge>{spec?.depends?.length}</Badge></h4>
                        }
                        {
                            // TODO: Render something for apps that are dependencies
                            spec.depends.forEach(dep => <p>
                                <Button variant={'link'} size={'sm'} onClick={() => setRedirect('/all-apps/' + dep.key)}>
                                    {(specs || []).find(s => s.key === dep.key)?.label}
                                </Button>
                                dep.required && <small>(required)</small>
                            </p>)
                        }
                        {
                            (specs || [])
                                .filter(s => (s?.depends || [])
                                    .find(d => d.key === spec.key))?.length > 0 && <h4>Dependency Of
                                <Badge>
                                    {(specs || [])
                                        .filter(s => (s?.depends || [])
                                            .find(d => d.key === spec.key))?.length}
                                </Badge>
                            </h4>
                        }
                        {
                            // TODO: Render something for apps that depend on this app
                            (specs || []).filter(s => (s?.depends || []).find(d => d.key === spec.key)).forEach(s => <p>
                                <Button variant={'link'} size={'sm'} onClick={() => setRedirect('/all-apps/' + s.key)}>
                                    {s.label || s.key}
                                </Button>
                            </p>)
                        }
                        {
                            (spec.tags || [])
                                .forEach(tagId => (tags || [])
                                        .filter((t: {id: number, name: string, description: string}) => spec.tags?.includes(t.id+""))?.length > 0 && <h4>
                                Related Apps
                                <Badge>
                                    {(tags || []).filter((t: {id: number, name: string, description: string}) => spec.tags?.includes(t.id+""))}
                                </Badge>
                            </h4>)
                        }
                        {
                            // TODO: Render something for other apps with same tags
                            (spec.tags || []).forEach(tagId => (tags || []).filter((t: {id: number, name: string, description: string}) => spec.tags?.includes(t.id+"")).forEach(tag => <p>
                                <Button variant={'link'} size={'sm'} onClick={() => setRedirect('/all-apps#' + encodeURIComponent(tag.name))}>
                                    {tag.name || tag.id}
                                </Button>
                            </p>))
                        }
                    </Col>
                </Row>
            }
        </>
    );
}

export default SpecView;
