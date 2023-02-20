import Container from "react-bootstrap/Container";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";
import { QueryParamProvider } from 'use-query-params';

import {Header} from './common/layout';
import DarkThemeProvider from "./common/layout/toggle/DarkThemeProvider";
import { AllAppsPage, ConsolePage, LandingPage, LoginPage, MyAppsPage, SpecView, SwaggerUiPage } from "./views";

import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setEnv} from "./store/actions";
import ReactGA from "react-ga";
import {V1, V2} from "./common";
import EditServicePage from "./views/my-apps/EditService";
import MyCatalogPage from "./views/my-catalog/MyCatalog";
import AddEditSpecPage from "./views/my-catalog/AddEditSpec";

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

function App() {
    const dispatch = useDispatch();
    const env = useSelector((state: any) => state.env);

    const fetchEnv = async (url: string) => {
        const response = await fetch(url);
        return await response.json();
    };

    useEffect(() => {
        // Set default Tab name if nothing set explicitly
        if (!env?.customization?.product_name) {
            document.title = 'Workbench';
        }
    }, [env]);

    useEffect(() => {
        fetchEnv('/frontend.json').then(env => {
            if (env?.domain) {
                V1.OpenAPI.BASE = env?.domain + '/api/v1';
                V2.OpenAPI.BASE = env?.domain + '/api/v2';
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
                    <BrowserRouter>
                        <QueryParamProvider ReactRouterRoute={Route}>
                        <Header />
                        <Routes>
                            <Route path="/">
                                <LandingPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Route path="/my-apps">
                                <MyAppsPage />
                            </Route>
                            <Route path="/all-apps">
                                <AllAppsPage />
                            </Route>
                            <Route path="/my-catalog">
                                <MyCatalogPage />
                            </Route>
                            <Route path="/my-catalog/create">
                                <AddEditSpecPage />
                            </Route>
                            <Route path="/my-catalog/:specKey">
                                <AddEditSpecPage />
                            </Route>
                            <Route path="/my-apps/:stackId/edit">
                                <EditServicePage />
                            </Route>
                            <Route path="/all-apps/:specKey">
                                <SpecView />
                            </Route>
                            <Route path="/my-apps/:stackServiceId/console">
                                <ConsolePage />
                            </Route>
                            <Route path="/swagger" element={<SwaggerUiPage />} />
                            <Route path="/*" >
                                <Navigate to="/" replace />
                            </Route>
                        </Routes>
                        </QueryParamProvider>
                    </BrowserRouter>
                </Container>
            </DarkThemeProvider>
        </>
  );
}

export default App;
