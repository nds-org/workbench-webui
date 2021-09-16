import React, {useState} from 'react';
import {Alert, Button, Container, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import {V1, V2} from '../common';
import { Redirect } from 'react-router-dom';
import {StringParam, useQueryParam} from "use-query-params";

function LoginPage(props: {}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const [nextRedirect, setNextRedirect] = useQueryParam('rd', StringParam);
    const [redirect, setRedirect] = useState('');

    const login = () => {
        V1.UserAccountService.postAuthenticate({username, password}).then(response => {
            if (!response || !response.token) {
                console.log('Empty response from POST authenticate. Please examine the API server.');
            } else {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', username);

                V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = response.token;

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
