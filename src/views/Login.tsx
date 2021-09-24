import {useState} from 'react';
import {V1} from '../common';
import {Alert, Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import {StringParam, useQueryParam} from "use-query-params";
import {useDispatch} from "react-redux";
import {setAuth} from "../store/actions";

import jwt from 'jwt-decode';

function LoginPage(props: {}) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const [nextRedirect] = useQueryParam('rd', StringParam);
    const [redirect, setRedirect] = useState('');

    const login = () => {
        V1.UserAccountService.postAuthenticate({username, password}).then(response => {
            if (!response || !response.token) {
                console.log('Empty response from POST authenticate. Please examine the API server.');
            } else {
                const tokenStr = response.token;
                const token: any = jwt(tokenStr);
                const username = token.user;
                dispatch(setAuth({ token: response.token, username }));

                setRedirect(nextRedirect ? nextRedirect : '/all-apps');
            }
        }).catch(reason =>{
            console.error("Login was invalid: ", reason);
            setError("Invalid credentials");
        });
    }

    return (
        <Container fluid={false}>
            {
                redirect && <Redirect to={redirect} />
            }
            <Alert className='alert-danger' show={error ? true : false}>{error}</Alert>
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
