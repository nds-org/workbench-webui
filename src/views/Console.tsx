import React, {createRef, useEffect, useRef, useState} from 'react';
import { Container } from "react-bootstrap";
import { V1 } from '../common';

import { XTerm } from 'xterm-for-react';
import { ITerminalOptions, RendererType } from 'xterm';

import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";

const Console = (props: { stackService?: V1.StackService }) => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const username = useSelector((state: any) => state.auth.username);
    const ssid = props.stackService?.id;

    const queryParams = `namespace=${username}&ssid=${ssid}`;
    const endpoint = `${V1.OpenAPI.BASE}/console`.replace('http', 'ws');

    const socketUrl = `${endpoint}?${queryParams}`;

    const options: ITerminalOptions = {
        rendererType: 'canvas',
        theme: {
            background: darkThemeEnabled ? 'black' : 'white',
            foreground: darkThemeEnabled ? 'white' : 'black',
            cursor: darkThemeEnabled ? 'white' : 'black',
        }
    }

    const xtermRef = createRef<XTerm>();
    const [stage, setStage] = useState('init');

    useEffect(() => {
        console.log("Connecting...");
        setStage('connected');
    }, []);

    const {
        sendMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,   // always reconnect
        onError: (e: Event) => console.error(`Error from Websocket: `, e),
        onClose: (e: CloseEvent) => console.log(`Closed connection to Websocket: `, e),
        onMessage: (message: MessageEvent<string>) => {
            xtermRef.current?.terminal.write(message.data);
        },
        onOpen: (e: Event) => {
            //console.log(`Opened connection to Websocket: `, e);
            xtermRef.current?.terminal.writeln(`Connected to ${props.stackService?.id}`);
            setStage('connected');
        },
    });

    if (stage === 'init') {
        return <pre>Loading... Please Wait</pre>
    }

    return <XTerm ref={xtermRef} onData={sendMessage} options={options} />;
}

export default Console;
