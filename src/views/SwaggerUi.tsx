import SwaggerUI  from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {useSelector} from "react-redux";
import { colors } from "../App";

const STORAGE_KEY = 'swaggerToken';

function SwaggerUiPage() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const themeCss = `
        * {
            color: ${darkThemeEnabled ? 'white' : "#283845"};
        }
        
        .markdown > p, .model.model-title, .title.info, .title, .base-url {
            color: ${darkThemeEnabled ? 'white' : "#283845"} !important;
        }
        
        .scheme-container {
            background-color: ${darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light} !important;
        }
         
        .model-container {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light};
            background-color: ${darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light} !important;
       
        }
    `;

    const injectAuthHeader = (req: any) => {
        if (req.url.indexOf('/api') !== -1 && !req.headers.Authorization) {
            const token = localStorage.getItem(STORAGE_KEY);
            if (token) {
                req.headers.Authorization = 'Bearer ' + token;
            }
        }
        return req;
    };

    const slurpToken = (response: any) => {
        console.log("Response recv: ", response);
        if ((response.url.indexOf('authenticate') !== -1 || response.url.indexOf('token') !== -1) && response.data) {
            const token = JSON.parse(response.data);
            console.log("Setting token: ", token.token);
            localStorage.setItem(STORAGE_KEY, token.token);
        }
        return response;
    }

    return (
        <>
            <style>{themeCss}</style>
            <SwaggerUI url="/swagger.yml" requestInterceptor={injectAuthHeader} responseInterceptor={slurpToken}/>
        </>
    );
}

export default SwaggerUiPage;
