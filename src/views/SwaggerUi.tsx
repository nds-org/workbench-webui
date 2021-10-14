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
        
        .markdown > p, .model.model-title, .title.info, .title, .base-url, .opblock-title, .try-out__btn, th.col_header,td.col_header, .response-col_status, .parameter__name, .parameter__type, .model-toggle:after {
            color: ${darkThemeEnabled ? 'white' : "#283845"} !important;
        }
        
        /* inputs */
        input {
            color: ${colors.textColor.light}
        }
        /* links */
        a {
            text-decoration: none;
            color: ${darkThemeEnabled ? "#4488FF" : "#2222FF"};
          
        }
        a:hover {
            text-decoration: underline;
            color: ${darkThemeEnabled ? "#44BBFF" : "#2222FF"};
        }
        
        /* red */
        .parameter__name.required:after {
            color: ${darkThemeEnabled ? "#dd0000" : "#e33314"} !important;
        }
        
        /* grey */
        .parameter__in {
            color: ${darkThemeEnabled ? "#BBB": "#AAAAAA"} !important;
        }
        
        .opblock-section-header > h4 {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light} !important;
        }
        
        .model-container, .scheme-container, .opblock-section-header {
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
