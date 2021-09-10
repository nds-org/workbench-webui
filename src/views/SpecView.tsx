import {handleError, V1} from "../common";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import Taglist from "../common/taglist/Taglist";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";

interface SpecViewParams {
    specKey: string;
}

interface SpecViewProps {
    spec?: V1.Service;
}

function SpecView() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { specKey } = useParams<SpecViewParams>();
    const [ tags, setTags ] = useState<Array<any>>([]);
    const [ spec, setSpec ] = useState<V1.Service>();

    useEffect(() => {
        V1.VocabularyService.getVocabularyByName("tags").then((tags: V1.Vocabulary) => {
            setTags(tags.terms || []);
        });
    }, []);

    useEffect(() => {
        V1.AppSpecService.getServiceById(specKey).then((target: V1.Service) => {
            setSpec(target);
        });
    }, [specKey]);

    return (
        <>
            <pre>{!spec && "Loading... Please Wait!"}</pre>
            {spec &&
                <>
                    <Row>
                        <Col xs={1}>
                            <Button variant="link" onClick={() => window.history.back()}><FontAwesomeIcon icon={faChevronLeft} style={{ color: "black" }}/></Button>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={1}>
                                    <img height="75" width="75" src={spec?.logo} style={{ borderRadius: "50px" }} />
                                </Col>
                                <Col>
                                    <Row><Col style={{ textAlign: "left" }}><h1>{spec?.label || spec?.key}</h1></Col></Row>
                                    <Row><Col><Taglist tags={tags} spec={spec} onClick={(tag) => window.location.href = '/all-apps#' + tag?.name} /></Col></Row>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="dark">Add</Button>
                                    <Button variant="link" style={{ color: "black" }}><FontAwesomeIcon icon={faEllipsisV} /></Button>
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
                </>
            }
        </>
    );
}

export default SpecView;
