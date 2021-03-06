import {useCallback, useEffect, useState} from 'react';
import Gravatar from 'react-gravatar';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap';

import {handleError, V1} from '..';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DarkThemeToggle from "../toggle/darkthemetoggle";
import {resetAuth} from "../../store/actions";


import jwt from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";


function Header() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const env = useSelector((state: any) => state.env);

    const [username, setUsername] = useState('');
    const token = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();

    const [user, setUser] = useState<V1.Account | undefined>(undefined);

    //const [interval, setInterv] = useState<any>();

    const onLogout = useCallback(() => {
        setUser(undefined);
        dispatch(resetAuth());

        if (window.location.pathname !== '/' && !window.location.pathname.includes('login')) {
            window.location.href = `/`;
        }
    }, [dispatch]);

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
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = env?.customization?.favicon_path || '/favicon.svg';
    }, [env]);

    /*useEffect(() => {
        if (!interval) {
            // Refresh token interval
            const refreshTokenInterval = setInterval(() => {
                // FIXME: can't read redux state here? fallback to localStorage
                const json = localStorage.getItem('auth') || '{"token":"","username":""}';
                const auth = JSON.parse(json);
                const token = auth.token;
                const username = auth.username;

                if (!token || !username) {
                    onLogout();
                } else {
                    console.log("Refreshing token: ", token);
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
    }, [username, token, interval, dispatch, onLogout]);*/

    useEffect(() => {
        if (username) {
            V1.UserAccountService.getAccountById(username).then(user => {
                setUser(user);
            }).catch(reason => handleError("Failed to fetch user: ", reason));
        }
    }, [username]);

    const activeColor = darkThemeEnabled ? 'white' : '#283845';
    const css = `
    .navbar-light {
        box-shadow: 0 2px 3px darkgrey;
    }
    .nav-link.active {
        border-bottom: ${activeColor} 8px solid;
        margin-bottom: -10px;
    }
    #navbar-user-dropdown .dropdown-menu {
      right: 0;
      left: auto;
    }
`

    return (
        <>
            <style>{css}</style>
            <Navbar expand="lg" variant={darkThemeEnabled ? 'dark' : 'light'} style={{ paddingLeft: "20px", paddingRight: "20px", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? '#fff' : '#283845' }}>
                <LinkContainer key="ROOT" to="/">
                    <Navbar.Brand title='Workbench'>
                        <img alt={'favicon'} width="32" height="32" src={ env?.customization?.favicon_path || '/favicon.svg' } /> { env?.customization?.product_name }
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        token && <Nav activeKey="">
                            <LinkContainer key='all-apps' to='/all-apps'>
                                <Nav.Link>All Apps</Nav.Link>
                            </LinkContainer>
                            <LinkContainer key='my-apps' to='/my-apps'>
                                <Nav.Link>My Apps</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    <Nav className="ms-auto" activeKey="">
                        <Navbar.Text>
                            <DarkThemeToggle />
                        </Navbar.Text>
                        {
                            (env?.customization?.help_links?.length > 0) && <NavDropdown color={darkThemeEnabled ? 'dark':'light'} title={
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                            } id='navbar-help-dropdown'>
                                {
                                    env?.customization?.help_links?.map((link: any, index: number) =>
                                        <NavDropdown.Item key={'helplink-' + index} href={link?.url} target="_blank">
                                            {/* FIXME: icons currently won't load from string icon name */}
                                            <FontAwesomeIcon fixedWidth icon={link?.icon} /> {link?.name}
                                        </NavDropdown.Item>
                                    )
                                }
                            </NavDropdown>
                        }
                        <LinkContainer key='swagger' to='/swagger'>
                            <Nav.Link>API Reference</Nav.Link>
                        </LinkContainer>
                        {
                            token && <NavDropdown color={darkThemeEnabled ? 'dark':'light'} title={
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
