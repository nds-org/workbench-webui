/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

// Selective imports from react-bootstrap
/*import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Accordion from "react-bootstrap/Accordion";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';*/

// Selective imports from fontawesome-icon
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {faTerminal} from "@fortawesome/free-solid-svg-icons/faTerminal";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faRocket} from "@fortawesome/free-solid-svg-icons/faRocket";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faExpand} from "@fortawesome/free-solid-svg-icons/faExpand";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {faCloudMoon} from "@fortawesome/free-solid-svg-icons/faCloudMoon";
import {faCloudSun} from "@fortawesome/free-solid-svg-icons/faCloudSun";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";*/

// Re-export for convenience
//export { Container, Alert, Carousel, Button, Form, FormControl, FormGroup, FormLabel, Accordion, Card, Col, Row, Modal, Table, ListGroup, Jumbotron, Dropdown, DropdownButton, Navbar, Nav, NavDropdown };
//export {FontAwesomeIcon, faPlus, faCloudMoon, faCloudSun, faCheckCircle, faExclamationCircle, faPowerOff, faSpinner, faTerminal, faTrash, faRocket, faStop, faCaretDown, faLink, faTimes, faExpand, faEllipsisV, faChevronLeft}

const AUTH_ERR = (reason: any) => reason.message.includes('Unauthorized');

const handleError = (message: string, reason: Error, onUnath?: () => void) => {
    console.error(`${message}: `, reason);

    if (AUTH_ERR(reason)) {
        // Clear any stale auth info
        localStorage.removeItem('auth');

        if (onUnath) {
            onUnath();
        }

        // Hard redirect to login (include return route)
        console.error("Redirecting to login view...");
        if (window.location.pathname !== '/' && !window.location.pathname.includes('login')) {
            window.location.href = '/login?rd=' + encodeURIComponent(window.location.pathname);
        }
    }

}

const waitFor = (condition: () => Promise<boolean>, period: number = 2000) => {
    let interval = setInterval(async () => {
        // Check if condition is true
        condition().then(bool => {
            bool && clearInterval(interval);
        }).catch(reason => clearInterval(interval));
    }, period);
}

export { handleError, waitFor };

export * from './card';
export * from './services';
export * from './layout';
