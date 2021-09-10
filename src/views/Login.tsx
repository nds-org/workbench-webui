import React, {ChangeEvent, Component, useState} from 'react';
import {Alert, Button, Container, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { V1 } from '../common';
import { Redirect } from 'react-router-dom';

interface LoginState {
    username: string;
    password: string;
    redirect?: string;
    error?: string;
}

//class LoginPage extends Component<{ onLogin: Function }, LoginState> {
function LoginPage(props: { onLogin: (username: string, token?: string) => void }) {
    /*constructor(props: any) {
        super(props);
        this.state = {username: '', password: ''};

        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);
    }*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const [error, setError] = useState('');

    // Bind component outputs
    const handleLogin = (username: string, token?: string) => props.onLogin(username, token);

    const login = () => {
        V1.UserAccountService.postAuthenticate({username, password}).then(response => {
            handleLogin(username, response.token);
            window.location.href = '/all-apps';
        }).catch(reason =>{
            console.error("Login was invalid: ", reason);
            setError("Invalid credentials");
        });
    }

    return (
        <Container fluid={false}>
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
