import React, {useEffect, useState} from 'react';

import Gravatar from 'react-gravatar';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import {handleError, V1, V2} from "..";
import {Redirect} from "react-router-dom";
import {Button} from "@material-ui/core";
import DarkThemeToggle from "../toggle/darkthemetoggle";
import {useDispatch, useSelector} from "react-redux";
import {resetAuth, setAuth} from "../../store/actions";

interface HeaderProps {
  //darkMode: boolean;
}

function Header(props: HeaderProps) {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const username = useSelector((state: any) => state.auth.username);
    const token = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState('');
    const [user, setUser] = useState<V1.Account | undefined>(undefined);

    const [interval, setInterv] = useState<any>();

    /*useEffect(() => {
        if (!interval) {
            // Refresh token interval
            const refreshTokenInterval = setTimeout(() => {
                const token = localStorage.getItem('token') || '';
                const uname = localStorage.getItem('username') || '';
                console.log("Refreshing token: ", token);

                if (!token || !uname) {
                    onLogout();
                } else {
                    V1.UserAccountService.refreshToken().then((token: V1.Token) => {
                        //console.log('Token has been refreshed.');
                        const tokenStr = token.token + "";
                        //onLogin(username, tokenStr);
                        localStorage.setItem('token', tokenStr);
                        dispatch(setAuth({ username: uname, token: tokenStr }));
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
    }, [username]);*/

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            V1.UserAccountService.getAccountById(storedUsername).then(user => {
                console.log("User has been fetched: ", user);
                //cookies.set('user', user);
                setUser(user);
            }).catch(reason => handleError("Failed to fetch user: ", reason));
        }
    }, [username]);

    const onLogout = () => {
        setUser(undefined);
        dispatch(resetAuth());

        setTimeout(() => {
            setRedirect('/login');
            setTimeout(() => {
                setRedirect('');
            }, 200);
        }, 1000);
    }

    return (
        redirect ?
            <Redirect to={redirect} />
            : window.location.pathname === '/' ? <></> :
        <>
            {

            }
            <Navbar variant={darkThemeEnabled ? 'dark' : 'light'} expand="lg" style={{ paddingLeft: "20px", paddingRight: "20px"}}>
                <LinkContainer key="ROOT" to="/">
                    <Navbar.Brand title='Workbench'>
                        <img src={'/favicon.svg'} /> Workbench
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        token && <Nav className="mr-auto">
                            <LinkContainer key='my-apps' to='/my-apps'>
                                <Nav.Link>My Apps</Nav.Link>
                            </LinkContainer>
                            <LinkContainer key='all-apps' to='/all-apps'>
                                <Nav.Link>All Apps</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    <Nav className="ms-auto">
                        <Navbar.Text>
                            <DarkThemeToggle />
                        </Navbar.Text>
                        <LinkContainer key='swagger' to='/swagger'>
                            <Nav.Link>API Reference</Nav.Link>
                        </LinkContainer>
                        {
                            token && <NavDropdown alignRight={true} title={username} id="basic-nav-dropdown">
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

//<Button>{ darkMode ? 'Dark' : 'Default' }</Button>
export default Header;
