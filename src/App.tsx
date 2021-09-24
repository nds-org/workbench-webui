import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";
import { QueryParamProvider } from 'use-query-params';

import {Header} from './common/layout';
import DarkThemeProvider from "./common/toggle/DarkThemeProvider";
import { AllAppsPage, ConsolePage, LandingPage, LoginPage, MyAppsPage, SpecView, SwaggerUiPage } from "./views";

import './App.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setEnv} from "./store/actions";

export const backgroundColor = theme("theme", {
    light: "#FBFBFB",
    dark: "#475362",
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
    const dispatch = useDispatch();

    const fetchEnv = async (url: string) => {
        const response = await fetch(url);
        return await response.json();
    };

    useEffect(() => {
        fetchEnv('/env.json').then(env => {
            dispatch(setEnv({ env }));
        });
    }, [dispatch]);

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
