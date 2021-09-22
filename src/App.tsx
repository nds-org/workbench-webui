import React from 'react';
import {Header} from './common/layout';
import './App.css';

import {Container} from "react-bootstrap";
import LandingPage from "./views/LandingPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from "./views/Login";
import MyAppsPage from "./views/MyApps";
import AllAppsPage from "./views/AllApps";
import SettingsPage from "./views/Settings";
import SwaggerUiPage from "./views/SwaggerUi";
import SpecView from "./views/SpecView";
import { QueryParamProvider } from 'use-query-params';
import DarkThemeProvider from "./common/toggle/DarkThemeProvider";

import theme from "styled-theming";
import styled from "styled-components";

export const backgroundColor = theme("theme", {
    light: "#fff",
    dark: "#2d2d2d",
});

export const textColor = theme("theme", {
    light: "#000",
    dark: "#fff",
});

const MyContainer = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
  padding-left: 0;
  padding-right: 0;
  height: 100%;
`;

function App() {
    return (
        <>
            <DarkThemeProvider>
                <Container as={MyContainer} fluid={true}>
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


            </DarkThemeProvider>
        </>
  );
}

export default App;
