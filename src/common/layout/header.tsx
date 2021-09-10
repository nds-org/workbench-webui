import React, {Component, useEffect} from 'react';

import Gravatar from 'react-gravatar';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { V1, handleError } from "..";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface HeaderProps {
    user: V1.Account;
    onLogout: () => void;
}
interface HeaderState {

}

//class Header extends Component<HeaderProps, HeaderState> {
function Header(props: HeaderProps) {

    useEffect(() => {
        const username = cookies.get('username');
        /*V1.UserAccountService.getAccountById(username).then(user => {
            console.log("User has been fetched: ", user);
            cookies.set('user', user);
            //this.setState((state, props) => ({user: user}));
        }).catch(reason => handleError("Failed to fetch user: ", reason));*/
    }, []);

    const renderLeft = () => {
        if (props.user) {
            return (
                <Nav className="mr-auto" hidden={window.location.pathname === '/'}>
                    <LinkContainer key='my-apps' to='/my-apps'>
                        <Nav.Link>My Apps</Nav.Link>
                    </LinkContainer>
                    <LinkContainer key='all-apps' to='/all-apps'>
                        <Nav.Link>All Apps</Nav.Link>
                    </LinkContainer>
                </Nav>
            )
        } else {
            return (<span></span>)
        }
    }

    const renderRight = () => {
        if (props.user) {
            return (
                <Nav className="ms-auto">
                    <LinkContainer key='swagger' to='/swagger'>
                        <Nav.Link>API Reference</Nav.Link>
                    </LinkContainer>
                    <NavDropdown alignRight={true} title={props.user.namespace} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={props.onLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            );
        } else {
            return (
                <Nav className="ms-auto">
                    <LinkContainer key='swagger' to='/swagger'>
                        <Nav.Link>API Reference</Nav.Link>
                    </LinkContainer>
                </Nav>
            );
        }
    }

    return (
        <Navbar bg="light" expand="lg" style={{ paddingLeft: "20px", paddingRight: "20px"}}>
            <LinkContainer key="ROOT" to="/">
                <Navbar.Brand>Workbench</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                {renderLeft()}
                {renderRight()}
            </Navbar.Collapse>

        </Navbar>
    );
}

export default Header;
