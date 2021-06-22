import React, { Component } from 'react';
import SwaggerUI  from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

class SwaggerUiPage extends Component {
    constructor(props: any) {
        super(props);
    }

    injectAuthHeader(req: any) {
        if (req.url.indexOf('/api') !== -1 && !req.headers.Authorization) {
            console.log("Checking cookies: ", cookies);
            const token = cookies.get('token');
            console.log("Including token: ", token);
            if (token) {
                req.headers.Authorization = 'Bearer ' + token;
            }
        }
        return req;
    };

    slurpToken(response: any) {
        console.log("Response recv: ", response);
        if ((response.url.indexOf('authenticate') !== -1 || response.url.indexOf('token') !== -1) && response.data) {
            const token = JSON.parse(response.data);
            console.log("Setting token: ", token.token);
            cookies.set('token', token.token);
        }
        return response;
    }

    render() {
        return (
            <SwaggerUI url="/swagger.yml" requestInterceptor={this.injectAuthHeader} responseInterceptor={this.slurpToken}/>
        );
    }
}

export default SwaggerUiPage;
