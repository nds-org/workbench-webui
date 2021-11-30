import {createRef, useEffect, useMemo, useState} from 'react';
import {V1} from '../common';

import {XTerm} from 'xterm-for-react';
import {ITerminalOptions} from 'xterm';

import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";
import jwt from "jwt-decode";

const Console = (props: { stackServiceId?: string, rows?: number, cols?: number }) => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    const WS_ENDPOINT = `${env?.domain}/api/console`.replace('http', 'ws');

    // Build our socket URL
    const token = useSelector((state: any) => state.auth.token);
    const tokenJson: any = jwt(token);
    console.debug("Token decoded: ", tokenJson);
    const username = tokenJson?.name || tokenJson?.username || tokenJson?.id || tokenJson?.namespace;
    const ssid = props.stackServiceId;
    const queryParams = `namespace=${username}&ssid=${ssid}`;
    const socketUrl = (username && ssid) ? `${WS_ENDPOINT}?${queryParams}` : null;

    const xtermRef = createRef<XTerm>();
    const [stage, setStage] = useState('init');

    const theme = useMemo(() => {
        return {
            background: darkThemeEnabled ? 'black' : 'white',
            foreground: darkThemeEnabled ? 'white' : 'black',
            cursor: darkThemeEnabled ? 'white' : 'black',
            cursorAccent:  darkThemeEnabled ? 'black' : 'white',
            // NOTE: selection supports RGBA
            selection: darkThemeEnabled ? '#FFFFFFAA' : '#00000055'
        }
    }, [darkThemeEnabled]);

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
        xtermRef.current?.terminal.setOption('minimumContrastRatio', 21)
        xtermRef.current?.terminal.setOption('theme', theme);
    }, [darkThemeEnabled, xtermRef, theme]);

    const options: ITerminalOptions = {
        rows: props.rows || 30,
        cols: props.cols || 80,
        minimumContrastRatio: 21,
        theme: theme,
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
