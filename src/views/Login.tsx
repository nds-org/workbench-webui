import {useEffect, useState} from 'react';
import {V1} from '../common';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import { Redirect } from 'react-router-dom';
import {StringParam, useQueryParam} from "use-query-params";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../store/actions";

import jwt from 'jwt-decode';
import Cookies from "universal-cookie";
import ReactGA from "react-ga";

const cookies = new Cookies();

const getUsername = (token: string) => {
    const tokenJson: any = jwt(token);
    return tokenJson?.name;
}

function LoginPage(props: {}) {
    const dispatch = useDispatch();
    const env = useSelector((state: any) => state.env);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const [token] = useQueryParam('token', StringParam);
    const [nextRedirect] = useQueryParam('rd', StringParam);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/login');
        }
    }, [env?.analytics_tracking_id]);

    const handleNextRedirect = () => {
        setRedirect(nextRedirect ? nextRedirect : '/all-apps');
    }

    const login = () => {
        V1.UserAccountService.postAuthenticate({username, password}).then(response => {
            if (!response || !response.token) {
                console.log('Empty response from POST authenticate. Please examine the API server.');
            } else {
                const token = response.token;
                const username = getUsername(token);
                dispatch(setAuth({ token, username }));
                handleNextRedirect();
            }
        }).catch(reason =>{
            console.error("Login was invalid: ", reason);
            setError("Invalid credentials");
        });
    }

    const css = `
        #loginContainer {
            margin-top: 10vh;
        }
    `;

    // Check for JWT
    if (token) {
        const uname = getUsername(token);
        dispatch(setAuth({ token, username: uname }));
        handleNextRedirect()
        return <Container id={'loginContainer'} style={{textAlign: "center"}}>
            <style>{css}</style>
            <Redirect to={redirect}></Redirect>
            <h3>Logging you in...</h3>
        </Container>
    }

    // Check for OAuth cookie
    if (env?.signin_url) {
        V1.UserAccountService.validateOAuthToken().then(resp => {
            console.log("Successfully verified OAuth token. ", resp);
            setRedirect('');
            if (resp) {
                const token = resp;
                const uname = getUsername(token);
                dispatch(setAuth({token, username: uname}));
                handleNextRedirect();
            } else {
                console.warn("Empty token encountered...")
            }
        }, reason => {
            console.warn("Failed validating OAuth token... Redirecting to login: ", reason)

            // Redirect to signin
            setTimeout(() => {
                window.location.href = env?.signin_url;
            }, 2500);
        });

        return <Container id={'loginContainer'} style={{textAlign: "center"}}>
            {
                redirect && <Redirect to={redirect} />
            }
            <style>{css}</style>
            <h3>Redirecting to Login...</h3>

            <p><a href={env?.signin_url}>Click here</a> if you are not redirected automatically.</p>
        </Container>
    }

    // If no signin_url configured, show basic login page
    return (
        <Container fluid={false} id={'loginContainer'}>
            {
                redirect && <Redirect to={redirect} />
            }
            <style>{css}</style>
            <Alert className='alert-danger' show={!!error}>{error}</Alert>
                <Form onSubmit={login}>
                    <FormGroup>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <FormControl id='username' name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormControl id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                </Form>
            <Button onClick={login}>Login</Button>
        </Container>
    );
}

export default LoginPage;
