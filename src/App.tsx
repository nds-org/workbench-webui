import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import {Footer, Header} from './common/layout';
import './App.css';

import {Container} from "react-bootstrap";
import LandingPage from "./views/LandingPage";
import {BrowserRouter as Router, Redirect, Route, Switch, useParams} from "react-router-dom";
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
import { QueryParamProvider } from 'use-query-params';

function App() {
    return (
        <Container fluid={true} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Router>
                <QueryParamProvider ReactRouterRoute={Route}>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>

                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/my-apps">
                        <MyAppsPage />
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
                </QueryParamProvider>
            </Router>
        </Container>
  );
}

export default App;
