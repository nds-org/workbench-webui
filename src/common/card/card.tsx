import React, { Component } from 'react';
import './card.css';

import {Card as BootstrapCard, Image} from 'react-bootstrap';
import { V1 } from '..';

interface CardState {

}

class Card extends Component<{spec: V1.Service}, CardState> {
    constructor(props: {spec: V1.Service}) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BootstrapCard>
                <BootstrapCard.Img src={this.props.spec.logo || ''} />
                <BootstrapCard.Header title={this.props.spec.key}>
                    {this.props.spec.label || this.props.spec.key}
                </BootstrapCard.Header>
                <BootstrapCard.Body>
                    {this.props.spec.description}
                </BootstrapCard.Body>
            </BootstrapCard>
        );
    }
}

export default Card;
