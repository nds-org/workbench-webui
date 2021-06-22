import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Cookies from 'universal-cookie';

import LoginPage from "./views/Login";
import SwaggerUiPage from "./views/SwaggerUi";

import {Header} from "./common";
import MyAppsPage from "./views/MyApps";
import AllAppsPage from "./views/AllApps";
import SettingsPage from "./views/Settings";

import { V1, V2 } from './common/services/';

import { fetchUser } from './store';
import SwaggerUI from "swagger-ui-react";
import {Account} from "./common/services/openapi/v1";
V1.OpenAPI.BASE = V2.OpenAPI.BASE = 'http://localhost:30001/api';

// Set auth cookie
const cookies = new Cookies();


const onLogin = (username: string, token: string) => {
    cookies.set('username', username);
    cookies.set('token', token);
    V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = token;

    // Attempt to fetch user account
    //const user = fetchUser(username, token);
    // updateToken();
}

const token = cookies.get('token');
const username = cookies.get('username');
let user: Account = {};
if (token && username) {
    onLogin(username, token);
    V1.UserAccountService.getAccountById(username).then(userAccount => {
        // TODO: wat?
        user = userAccount;
        if (window.location.href.includes('login')) {
            window.location.href = `/all-apps`;
        }
    }).catch(reason => {
        console.error("Token was invalid: ", reason);
        if (!window.location.href.includes('login')) {
            window.location.href = '/login';
        }
    });
} else if (!window.location.href.includes('login')) {
    window.location.href = '/login';
}



ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Header user={user} />
          <Switch>
              <Route exact path="/">
                  <App />
              </Route>

              <Route path="/login">
                  <LoginPage onLogin={onLogin}/>
              </Route>
              <Route path="/my-apps">
                  <MyAppsPage />
              </Route>
              <Route path="/all-apps">
                  <AllAppsPage />
              </Route>
              <Route path="/settings">
                  <SettingsPage />
              </Route>
              <Route path="/swagger">
                  <SwaggerUiPage />
              </Route>
          </Switch>
      </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
