// React + plugins
import {useState} from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ReactGA from "react-ga";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from "@fortawesome/free-solid-svg-icons/faCopy";
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

// Custom helpers
import Taglist from "./Taglist";
import {newStack, copySpec, CONFLICT_409, handleError, V1} from "../../common/services";

import '../../index.css';
import './SpecCard.css';


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
    const user = useSelector((state: any) => state.auth.user);

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

    const cloneSpec = (): void => {
        const specCopy = copySpec(props.spec);

        V1.AppSpecService.createService(specCopy).then(appSpec => {
            ReactGA.event({
                category: 'application',
                action: 'clone',
                label: appSpec.key
            });
            props.specs.push(appSpec);
            setRedirect(`/my-catalog/${appSpec.key}`);
        }).catch(reason => {
            if (CONFLICT_409(reason)) {
                // Copy of this spec already exists, redirect to the copy
                setRedirect(`/my-catalog/${specCopy.key}`);
            } else {
                handleError(`Failed to clone ${specCopy.key} app spec`, reason)
            }
        });
    }

    // TODO: onClick={() => setRedirect(`/all-apps/${props.spec?.key}`)}
    return (
        <Card bg={darkThemeEnabled ? 'dark' : 'light'} style={{ borderRadius: "16px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
            {
                redirect && <Navigate to={redirect} replace />
            }
            <Card.Body className="spec-card-body" style={{marginTop:"0", textAlign: "left", padding: "20px",  borderRadius: "15px 15px 0 0", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', borderColor: darkThemeEnabled ? '#283845' : 'lightgrey' }}>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <img alt={props.spec.key} width="60" height="60" id="spec-card-img" src={props.spec.logo || '/ndslabs-badge.png'} style={{ borderRadius: "50px", border: "solid 1px lightgrey", backgroundColor: 'white' }}/>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        <ButtonGroup>
                            <Button variant={'link'} style={{ padding: "1px", marginRight: "8px", width: "30px", height: "30px", borderRadius: "25px", border: darkThemeEnabled ? 'white 2px solid' : 'darkgrey 2px solid', marginTop: "15px" }} onClick={installApplication}>
                                <FontAwesomeIcon className={'fa-fw'} icon={faPlus} style={{ color: darkThemeEnabled ? '#FFFFFF' : '#707070'}} />
                            </Button>
                            {
                                user?.groups?.includes('/workbench-developers') && <Dropdown className={'spec-dropdown'}>
                                    <Dropdown.Toggle variant={'link'} style={{ padding: "1px",  width: "30px", height: "30px", borderRadius: "25px", border: 'none', marginTop: "15px", color: darkThemeEnabled ? '#FFFFFF' : '#707070', backgroundColor: darkThemeEnabled ? '#283845' : '#fff'}}>
                                        <FontAwesomeIcon className={'fa-fw'} icon={faEllipsisV} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={cloneSpec} style={{ color: '#707070' }}>
                                            <FontAwesomeIcon className={'fa-fw'} icon={faCopy} /> Clone Application
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </ButtonGroup>
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
