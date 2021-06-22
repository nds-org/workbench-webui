import React, {ChangeEvent, Component} from 'react';
import {Alert, Button, Container, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { V1 } from '../common';
import { Redirect } from 'react-router-dom';

interface LoginState {
    username: string;
    password: string;
    redirect?: string;
    error?: string;
}

class LoginPage extends Component<{ onLogin: Function }, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {username: '', password: ''};

        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);
    }

    // Bind user inputs
    usernameChanged = (e: any) => this.setState((state, props) => ({username: e.target.value}));
    passwordChanged = (e: any) => this.setState((state, props) => ({password: e.target.value}));

    // Bind component outputs
    handleLogin = (username: string, token?: string) => this.props.onLogin(username, token);

    login() {
        const username = this.state.username;
        const password = this.state.password;

        V1.UserAccountService.postAuthenticate({username, password}).then(response => {
            this.handleLogin(username, response.token);
            window.location.href = '/all-apps';
        }).catch(reason =>{
            console.error("Login was invalid: ", reason);
            this.setState((state, props) => ({ error: "Invalid credentials" }))
        });
    }

    render() {
        return (
            <Container fluid={false}>
                <Alert className='alert-danger' show={this.state.error ? true : false}>{this.state.error}</Alert>
                <Form onSubmit={this.login}>
                    <FormGroup>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <FormControl id='username' name='username' type='text' value={this.state.username} onChange={this.usernameChanged} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormControl id='password' name='password' type='password' value={this.state.password} onChange={this.passwordChanged} />
                    </FormGroup>
                </Form>
                <Button onClick={this.login}>Login</Button>
            </Container>
        );
    }
}

export default LoginPage;
