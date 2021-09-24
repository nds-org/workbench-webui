import {useEffect, useState} from 'react';
import Gravatar from 'react-gravatar';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap';

import {handleError, V1, V2} from '..';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import DarkThemeToggle from "../toggle/darkthemetoggle";
import {resetAuth, setAuth} from "../../store/actions";


import jwt from 'jwt-decode';

function Header() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const env = useSelector((state: any) => state.env);

    const [username, setUsername] = useState('');
    const token = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();

    const [user, setUser] = useState<V1.Account | undefined>(undefined);

    const [interval, setInterv] = useState<any>();

    const onLogout = () => {
        setUser(undefined);
        dispatch(resetAuth());

        if (window.location.pathname !== '/' && !window.location.pathname.includes('login')) {
            window.location.href = `/login?rd=${encodeURIComponent(window.location.pathname)}`;
        }
    }

    useEffect(() => {
        if (token) {
            const tokenFields: any = jwt(token);
            const username = tokenFields?.user;
            setUsername(username);
        } else {
            setUsername('')
        }
    }, [token]);

    useEffect(() => {
        if (!interval) {
            // Refresh token interval
            const refreshTokenInterval = setTimeout(() => {
                console.log("Refreshing token: ", token);

                if (!token || !username) {
                    onLogout();
                } else {
                    V1.UserAccountService.refreshToken().then((token: V1.Token) => {
                        const tokenStr = token.token + "";
                        dispatch(setAuth({ username, token: tokenStr }));
                        V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = tokenStr;
                        return tokenStr;
                    }).catch(reason => {
                        console.error("Token has expired: ", reason);
                        onLogout();
                    });
                }
            }, 60000);

            setInterv(refreshTokenInterval);
        }
    }, [username, token, interval, dispatch, onLogout]);

    useEffect(() => {
        if (username) {
            V1.UserAccountService.getAccountById(username).then(user => {
                setUser(user);
            }).catch(reason => handleError("Failed to fetch user: ", reason));
        }
    }, [username]);

    return (
        <>
            <Navbar variant={darkThemeEnabled ? 'dark' : 'light'} expand="lg" style={{ paddingLeft: "20px", paddingRight: "20px"}}>
                <LinkContainer key="ROOT" to="/">
                    <Navbar.Brand title='Workbench'>
                        <img alt={'favicon'} src={ env?.product?.faviconPath || '/favicon.svg' } /> { env?.product?.name }
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
                            token && <NavDropdown className={'dropdown-menu-end'} color={darkThemeEnabled ? 'dark':'light'} title={
                                user?.email && <>
                                    <Gravatar style={{borderRadius:"25px"}} width={28} height={28} email={user?.email} /> {user?.email}
                                </>
                            } id='navbar-user-dropdown'>
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
