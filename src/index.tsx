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
V1.OpenAPI.BASE = V2.OpenAPI.BASE = 'http://localhost:30001/api';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
