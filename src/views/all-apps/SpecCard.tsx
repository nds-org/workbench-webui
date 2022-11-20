import {useState} from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {handleError, V1} from '../../common';
import Taglist from "./Taglist";

import './SpecCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactGA from "react-ga";
import {newStack} from "../../common";

// TODO: Abstract this?




interface CardProps {
    spec: V1.Service;
    specs: Array<V1.Service>;
    stacks: Array<V1.Stack>;
    tags: Array<any>;
    setFilter: (f: string) => void;
}

//class Card extends Component<CardProps, CardState> {
function SpecCard(props: CardProps) {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    //const [stacks, setStacks] = useState([]);
    const [redirect, setRedirect] = useState('');

    const installApplication = (): void => {
        const appSpec = props.spec;
        const userApp: V1.Stack = newStack(appSpec, props.specs);

        // POST /stacks
        V1.UserAppService.createUserapp(userApp).then(stk => {
            ReactGA.event({
                category: 'application',
                action: 'add',
                label: stk.key
            });
            props.stacks.push(stk);
            setRedirect(`/my-apps`);
        }).catch(reason => handleError(`Failed to add ${userApp.key} user app`, reason));
    }

    const showDropdown = () => {

    }

    // TODO: onClick={() => setRedirect(`/all-apps/${props.spec?.key}`)}
    return (
        <Card bg={darkThemeEnabled ? 'dark' : 'light'} style={{ borderRadius: "16px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
            {
                redirect && <Redirect to={redirect} />
            }
            <Card.Body className="spec-card-body" style={{marginTop:"0", textAlign: "left", padding: "20px",  borderRadius: "15px 15px 0 0", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <img alt={props.spec.key} width="60" height="60" id="spec-card-img" src={props.spec.logo || '/ndslabs-badge.png'} style={{ borderRadius: "50px", border: "solid 1px lightgrey", backgroundColor: 'white' }}/>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant={'link'} style={{ padding: "1px",  width: "30px", height: "30px", borderRadius: "25px", border: darkThemeEnabled ? 'white 2px solid' : 'darkgrey 2px solid', marginTop: "15px" }} onClick={installApplication}>
                            <FontAwesomeIcon className={'fa-fw'} icon={'plus'} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                        </Button>
                        {
                            // TODO: "More Actions" Dropdown...
                        }
                        <Button variant={'link'} onClick={showDropdown} style={{ marginTop: "15px" }} hidden={true}>
                            <FontAwesomeIcon icon={'ellipsis-v'} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                        </Button>
                    </Col>
                </Row>
                <Row title={props.spec.key} style={{ cursor: "pointer", marginTop: "10px" }} onClick={() => setRedirect(`/all-apps/${props.spec?.key}`)}>
                    <h5>{props.spec.label || props.spec.key}</h5>
                </Row>
                <Row style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    {props.spec.description}
                </Row>
            </Card.Body>
            <Card.Footer style={{ height: "80px", border: "none", borderRadius: "0 0 15px 15px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff'}}>
                <Taglist tags={props.tags} spec={props.spec} chunkSize={2} onClick={(tag) => {
                    if (props.setFilter) {
                        props.setFilter(tag.id + "");
                    } else {
                        window.location.hash = '#' + encodeURIComponent(tag.name + "")
                    }
                }} />
            </Card.Footer>
        </Card>
    );
}

export default SpecCard;
