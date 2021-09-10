import React, {createRef, useEffect, useState} from 'react';
import { Container } from "react-bootstrap";
import { V1 } from '../common';

import { XTerm } from 'xterm-for-react';

import useWebSocket from "react-use-websocket";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Console = (props: { stackService?: V1.StackService }) => {
    const username = cookies.get('username');
    const ssid = props.stackService?.id;
    const host = `localhost:30001`;

    const socketUrl = `ws://${host}/api/console?namespace=${username}&ssid=${ssid}`;

    const xtermRef = createRef<XTerm>();
    const [ref, setRef] = useState<any>();

    /*useEffect(() => {
        console.log(xtermRef);
    }, []);*/

    const {
        sendMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        onError: (e: Event) => console.error(`Error from Websocket: `, e),
        //onClose: (e: CloseEvent) => console.log(`Closed connection to Websocket: `, e),
        onOpen: (e: Event) => { console.log(`Opened connection to Websocket: `, e); xtermRef?.current?.terminal.writeln(`Opened connection to ${props.stackService?.id}`); },
        onMessage: (message: MessageEvent<string>) => xtermRef?.current?.terminal.write(message.data),
        shouldReconnect: () => true,   // always reconnect
    });

    return <XTerm ref={xtermRef} onData={sendMessage} />;
}

export default Console;
