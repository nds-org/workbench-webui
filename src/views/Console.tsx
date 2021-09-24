import {createRef, useEffect, useState} from 'react';
import {V1} from '../common';

import {XTerm} from 'xterm-for-react';
import {ITerminalOptions} from 'xterm';

import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";

const WS_ENDPOINT = `${V1.OpenAPI.BASE}/console`.replace('http', 'ws');

const Console = (props: { stackServiceId?: string, rows?: number, cols?: number }) => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    // Build our socket URL
    const username = useSelector((state: any) => state.auth.username);
    const ssid = props.stackServiceId;
    const queryParams = `namespace=${username}&ssid=${ssid}`;
    const socketUrl = `${WS_ENDPOINT}?${queryParams}`;

    const xtermRef = createRef<XTerm>();
    const [stage, setStage] = useState('init');

    const {
        sendMessage,
        //readyState,
    } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,   // always reconnect
        onMessage: (message: MessageEvent<string>) => {
            xtermRef.current?.terminal.write(message.data);
            setStage('recv');
        },
        onError: (e: Event) => console.error(`Error from Websocket: `, e),
        onClose: (e: CloseEvent) => console.log(`Closed connection to Websocket: `, e),
        onOpen: (e: Event) => {
            xtermRef.current?.terminal.writeln(`Connected to ${props.stackServiceId}: `);
            setStage('connected');
        },
    });

    useEffect(() => {
        xtermRef.current?.terminal.setOption('theme', {
            background: darkThemeEnabled ? 'black' : 'white',
            foreground: darkThemeEnabled ? 'white' : 'black',
            cursor: darkThemeEnabled ? 'white' : 'black',
        });
    }, [darkThemeEnabled]);

    const options: ITerminalOptions = {
        rows: props.rows || 30,
        cols: props.cols || 80,
        theme: {
            background: darkThemeEnabled ? 'black' : 'white',
            foreground: darkThemeEnabled ? 'white' : 'black',
            cursor: darkThemeEnabled ? 'white' : 'black',
        },
        rendererType: 'canvas',
    }

    if (!props.stackServiceId || stage === 'init') {
        return <></>
    }

    return (
        <XTerm ref={xtermRef} onData={sendMessage} options={options} />
    )
}

export default Console;
