import React from 'react';
import logo from './logo.svg';
import {Footer, Header} from './common/layout';
import './App.css';

import {Container} from "react-bootstrap";
import LandingPage from "./views/LandingPage";
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import LoginPage from "./views/Login";
import MyAppsPage from "./views/MyApps";
import AllAppsPage from "./views/AllApps";
import SettingsPage from "./views/Settings";
import SwaggerUiPage from "./views/SwaggerUi";
import Cookies from "universal-cookie";
import {V1, V2} from "./common/services";
import SpecView from "./views/SpecView";
import {Provider} from "react-redux";
import {store} from "./store";


// Set auth cookie
const cookies = new Cookies();

const token = cookies.get('token');
const username = cookies.get('username');

let user: V1.Account = {};

//V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = cookies.get('token');

const redirectToLogin = () => {
    if (window.location.pathname !== '/' && !window.location.href.includes('login')) {
        window.location.href = '/login';
    }
}

const onLogout = () => {
    cookies.remove('username');
    cookies.remove('token');
    cookies.remove('user');
    user = {};

    redirectToLogin();
}

const onLogin = (username: string, token?: string) => {
    cookies.set('username', username);
    cookies.set('token', token);
    V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = token;

    V1.UserAccountService.getAccountById(username).then(userAccount => {
        // TODO: wat?
        user = userAccount;
        //cookies.set('user', userAccount);
        if (window.location.href.includes('login')) {
            window.location.href = `/all-apps`;
        }
        return user;
    }).catch(reason => {
        console.error("Failed to fetch account: ", reason);
        //onLogout();
    });
}

if (token && username) {
    onLogin(username, token);
} else if (window.location.pathname !== '/' && !window.location.href.includes('login')) {
    onLogout();
}

// Refresh token interval
setInterval(() => {
    return;

    const token = cookies.get('token');
    const username = cookies.get('username');
    console.log("Refreshing token: ", token);

    if (!token || !username) {
        onLogout();
    } else {
        V1.UserAccountService.refreshToken().then((token: V1.Token) => {
            //console.log('Token has been refreshed.');
            const tokenStr = token.token+"";
            onLogin(username, tokenStr);
            return tokenStr;
        }).catch(reason => {
            console.error("Token has expired: ", reason);
            //onLogout();
        });
    }
}, 60000);


function App() {
  return (
        <Container fluid={true} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Router>
                <Header user={user} onLogout={onLogout} />
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>

                    <Route path="/login">
                        <LoginPage onLogin={onLogin}/>
                    </Route>
                    <Route path="/my-apps">
                        <MyAppsPage username={username} />
                    </Route>
                    <Route exact path="/all-apps">
                        <AllAppsPage />
                    </Route>
                    <Route path="/settings">
                        <SettingsPage />
                    </Route>
                    <Route path="/all-apps/:specKey">
                        <SpecView />
                    </Route>
                    <Route path="/swagger">
                        <SwaggerUiPage />
                    </Route>
                </Switch>
            </Router>
        </Container>
  );
}

export default App;
