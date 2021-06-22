import React, { Component } from 'react';

import Gravatar from 'react-gravatar';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { V1, handleError } from "..";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface HeaderState {
    user?: V1.Account;
}

class Header extends Component<{ user: V1.Account }, HeaderState> {
    constructor(props: { user: V1.Account }) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        V1.UserAccountService.getAccountById('lambert8').then(user => {
            console.log("User has been fetched: ", user);
            this.setState((state, props) => ({user: user}));
        }).catch(reason => handleError("Failed to fetch user: ", reason));
    }

    logout(e: any) {
        // Remove auth cookies
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('user');

        // Navigate to login view
        window.location.href = '/login';
    }

    renderLeft() {
        if (this.state.user) {
            return (
                <Nav className="mr-auto">
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

    renderRight() {
        if (this.state.user) {
            return (
                <Nav className="ms-auto">
                    <LinkContainer key='swagger' to='/swagger'>
                        <Nav.Link>API Reference</Nav.Link>
                    </LinkContainer>
                    <NavDropdown alignRight={true} title={this.state.user.namespace} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={this.logout}>Logout</NavDropdown.Item>
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

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <LinkContainer key="ROOT" to="/">
                    <Navbar.Brand>Workbench</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {this.renderLeft()}
                    {this.renderRight()}
                </Navbar.Collapse>

            </Navbar>
        );
    }
}

export default Header;
