import Container from "react-bootstrap/Container";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import styled from "styled-components";
import theme from "styled-theming";
import { QueryParamProvider } from 'use-query-params';

import {Header} from './common/layout';
import DarkThemeProvider from "./common/toggle/DarkThemeProvider";
import { AllAppsPage, ConsolePage, LandingPage, LoginPage, MyAppsPage, SpecView, SwaggerUiPage } from "./views";

import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setEnv} from "./store/actions";
import ReactGA from "react-ga";
import {V1, V2} from "./common";

export const colors = {
    backgroundColor: { light: "#FBFBFB", dark: "#475362" },
    foregroundColor: { light: "#FFF", dark: "#283845" },
    textColor:{ light: "#283845", dark: "#FFF" }
}

// TODO: how to reuse these?
export const foregroundColor = theme("theme", {
    light: colors.foregroundColor.light,
    dark: colors.foregroundColor.dark,
});

export const backgroundColor = theme("theme", {
    light: colors.backgroundColor.light,
    dark: colors.backgroundColor.dark,
});

export const textColor = theme("theme", {
    light: colors.textColor.light,
    dark: colors.textColor.dark,
});

const MyContainer = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
  padding-left: 0;
  padding-right: 0;
  height: 100%;
`;

const history = createBrowserHistory();

function App() {
    const dispatch = useDispatch();
    const env = useSelector((state: any) => state.env);

    const fetchEnv = async (url: string) => {
        const response = await fetch(url);
        return await response.json();
    };

    useEffect(() => {
        fetchEnv('/frontend.json').then(env => {
            if (env?.domain) {
                V1.OpenAPI.BASE = env?.domain + '/api/v1';
                V2.OpenAPI.BASE = env?.domain + '/api/v2';
            } else {
                V1.OpenAPI.BASE = '/api/v1';
                V2.OpenAPI.BASE = '/api/v2';
            }

            env?.customization?.product_name && (document.title = env?.customization?.product_name);
            if (env?.analytics_tracking_id) {
                ReactGA.initialize(env?.analytics_tracking_id);
            }
            dispatch(setEnv({ env }));
        });
    }, [dispatch]);

    return (
        <>
            <DarkThemeProvider>
                <Container as={MyContainer} fluid={true}>
                    <Router history={history}>
                        <QueryParamProvider ReactRouterRoute={Route}>
                        <Header />
                        <Switch>
                            <Route exact path="/">
                                <LandingPage />
                            </Route>

                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Route exact path="/my-apps">
                                <MyAppsPage />
                            </Route>
                            <Route exact path="/all-apps">
                                <AllAppsPage />
                            </Route>
                            <Route path="/all-apps/:specKey">
                                <SpecView />
                            </Route>
                            <Route path="/my-apps/:stackServiceId">
                                <ConsolePage />
                            </Route>
                            <Route exact path="/swagger">
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
