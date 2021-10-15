import SwaggerUI  from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {useSelector} from "react-redux";
import { colors } from "../App";

const STORAGE_KEY = 'swaggerToken';

function SwaggerUiPage() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const themeCss = `
        /* Shared colors */
        * {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light};
        }
        
        .markdown > p, .model.model-title, .title.info, .title, .base-url, .opblock-title, .try-out__btn, th.col_header,td.col_header, .response-col_status, .parameter__name, .parameter__type, .opblock-section-header > h4 {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light} !important;
        }
        
        .model-container, .scheme-container, .opblock-section-header {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light};
            background-color: ${darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light} !important;
        }
        /* inputs: always dark on light */
        input {
            color: ${colors.textColor.light}
        }
        .parameters-container .opblock-description-wrapper > p {
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light} !important;
        }
        
        
        /* Unique colors */
        /* blues */
        a {
            text-decoration: none;
            color: ${darkThemeEnabled ? "#4488FF" : "#2222FF"};
          
        }
        a:hover, td .model .prop .prop-type {
            color: ${darkThemeEnabled ? "#44BBFF" : "#2222FF"};
        }
        
        /* red */
        .parameter__name.required:after {
            color: ${darkThemeEnabled ? "#dd0000" : "#e33314"} !important;
        }
        
        /* grey */
        .parameter__in, .primitive.property {
            color: ${darkThemeEnabled ? "#BBB": "#AAAAAA"} !important;
        }
        
        /* extra overrides to invert icon colors */
        use, .btn.authorize.unlocked > svg, .model-toggle:after {
            filter: ${darkThemeEnabled ? "invert(100%)" : "invert(0%)"};
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
