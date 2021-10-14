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

interface SpecViewParams {
    specKey: string;
}

function SpecView() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { specKey } = useParams<SpecViewParams>();
    const [ tags, setTags ] = useState<Array<any>>([]);
    const [ spec, setSpec ] = useState<V1.Service>();

    const [ redirect, setRedirect ] = useState('');

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
                                <Button variant="link" style={{ color: darkThemeEnabled ? "white" : "black" }}><FontAwesomeIcon icon={faEllipsisV} /></Button>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: "50px",minHeight:"200px"}}>{spec?.description}</Row>
                        <hr style={{ marginTop: "100px" }} />
                        <Row>
                            <Col xs={6}>
                                <h4>Information</h4>
                            </Col>
                            <Col xs={6}>
                                <h4>Help & Support</h4>
                            </Col>
                        </Row>

                    </Col>
                    <Col xs={3}>
                        <h4>Related Apps</h4>

                    </Col>
                </Row>
            }
        </>
    );
}

export default SpecView;
