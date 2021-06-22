import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, Jumbotron} from 'react-bootstrap';
import { V1, Card, handleError } from '../common';

import Cookies from "universal-cookie";


const cookies = new Cookies();

const componentCss = `
    .bg-banner {
        background-image: '/catalog-banner.jpg';
        height: 200px;
    }
`

interface AllAppsState {
    specs: Array<V1.Service>;
    tags: Array<any>;
}

class AllAppsPage extends Component<{}, AllAppsState> {
    constructor(props: any) {
        super(props);
        this.state = { specs: [], tags: [] };
    }

    componentDidMount() {
        V1.VocabularyService.getVocabularyByName('tags').then(vocab => {
            console.log("Vocabulary: ", vocab);
            this.setState((state, props) => ({ tags: vocab.terms || [] }))
        }).catch(reason => handleError("Failed to fetch tags", reason));

        V1.AppSpecService.listServices('all').then(specs => {
            console.log("App specs: ", specs);
            // Sort by label or key
            const sorted = specs.sort((s1, s2) => {
                const lc1 = s1.label?.toLowerCase() || s1.key;
                const lc2 = s2.label?.toLowerCase() || s2.key;
                return lc1.localeCompare(lc2);
            })
            this.setState((state, props) => ({ specs: sorted }))
        }).catch(reason => handleError("Failed to fetch app specs", reason));
    }

    filterClicked() {

    }

    render() {
        return (
            <Container fluid={false}>
                <Jumbotron className='bg-banner'>
                    <h1>Explore Apps from NCSA</h1>
                    <p>

                    </p>
                </Jumbotron>
                <Row>
                    <Col className='col-3'>
                        <h3>Tags</h3>

                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action href="#link1" onClick={this.filterClicked}>
                                Python
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2" onClick={this.filterClicked}>
                                Javascript
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <h3>All Apps</h3>
                            </Col>
                        </Row>

                        <Row>
                            {
                                this.state.specs.map(spec =>
                                    <Col className='col-3' key={spec.key}>
                                        <Card spec={spec}/>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AllAppsPage;
