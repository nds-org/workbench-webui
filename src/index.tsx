import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { V1, V2 } from './common/services/';
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/store";

V1.OpenAPI.BASE = V2.OpenAPI.BASE = 'http://localhost:30001/api';

ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
