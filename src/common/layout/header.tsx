import React, {useEffect, useState} from 'react';

import Gravatar from 'react-gravatar';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import {V1, handleError, V2} from "..";
import {Redirect} from "react-router-dom";

function Header(props: {}) {
    const [redirect, setRedirect] = useState('');
    const [user, setUser] = useState<V1.Account | undefined>(undefined);
    const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');

    const [interval, setInterv] = useState<any>();

    useEffect(() => {
        if (!interval) {
            // Refresh token interval
            const refreshTokenInterval = setTimeout(() => {
                const token = localStorage.getItem('token') || '';
                const uname = localStorage.getItem('username') || '';
                setUsername(uname);
                console.log("Refreshing token: ", token);

                if (!token || !uname) {
                    onLogout();
                } else {
                    V1.UserAccountService.refreshToken().then((token: V1.Token) => {
                        //console.log('Token has been refreshed.');
                        const tokenStr = token.token + "";
                        //onLogin(username, tokenStr);
                        localStorage.setItem('token', tokenStr);
                        V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = tokenStr;
                        return tokenStr;
                    }).catch(reason => {
                        console.error("Token has expired: ", reason);
                        onLogout();
                    });
                }
            }, 5000);

            setInterv(refreshTokenInterval);
        }
    }, [username]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            V1.UserAccountService.getAccountById(storedUsername).then(user => {
                console.log("User has been fetched: ", user);
                //cookies.set('user', user);
                setUser(user);
                setUsername(storedUsername);
            }).catch(reason => handleError("Failed to fetch user: ", reason));
        }
    }, [username]);

    const onLogout = () => {
        setUser(undefined);
        setUsername('');

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        //cookies.remove('user');

        setRedirect('/login');
        //window.location.href = '/login';
        setTimeout(() => {
            setRedirect('');
        }, 200);
    }

    const onLogin = () => {
        V1.UserAccountService.getAccountById(username).then(user => {
            console.log("User has been fetched: ", user);
            //cookies.set('user', user);
            setUser(user);
        }).catch(reason => handleError("Failed to fetch user: ", reason));
    }

    return (
        redirect ?
            <Redirect to={redirect} />
            : window.location.pathname === '/' ? <></> :
        <>
            {

            }
            <Navbar bg="light" expand="lg" style={{ paddingLeft: "20px", paddingRight: "20px"}}>
                <LinkContainer key="ROOT" to="/">
                    <Navbar.Brand title='Workbench'>
                        <img src={'/favicon.svg'} /> Workbench
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        user && <Nav className="mr-auto">
                            <LinkContainer key='my-apps' to='/my-apps'>
                                <Nav.Link>My Apps</Nav.Link>
                            </LinkContainer>
                            <LinkContainer key='all-apps' to='/all-apps'>
                                <Nav.Link>All Apps</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    <Nav className="ms-auto">
                        <LinkContainer key='swagger' to='/swagger'>
                            <Nav.Link>API Reference</Nav.Link>
                        </LinkContainer>
                        {
                            user && <NavDropdown alignRight={true} title={username} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" onClick={onLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
