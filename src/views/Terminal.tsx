import React, {useEffect} from 'react';

// @ts-ignore
import Terminal from 'react-console-emulator';
import useWebSocket from "react-use-websocket";
import Cookies from "universal-cookie";
import { V1 } from '../common';

const cookies = new Cookies();

const MyTerminal = (props: { close: () => void, stackService?: V1.StackService }) => {
    let ws: WebSocket;

    const socketUrl = `ws://localhost:30001/api/console?namespace=${cookies.get('username')}&ssid=${props.stackService?.id}`;

    useEffect(() => {
        //console.log("Writing to ref: ", xtermRef);
        //xtermRef?.current?.terminal.writeln('It\'s working.');
    }, []);

    const {
        sendMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        onError: (e) => console.error(`Error from Websocket: `, e),
        onClose: (e) => console.log(`Closed connection to Websocket: `, e),
        onOpen: (e) => {
            console.log(`Opened connection to Websocket: `, e);
            //xtermRef?.current?.terminal.writeln(`Opened connection to ${socketUrl}`);
        },
        onMessage: (message: MessageEvent<any>) => {
            console.log(`Recv'd message from ${socketUrl}: `, message.data);
            //xtermRef?.current?.terminal.write(message.data);
        },
        shouldReconnect: () => true   // always reconnect
    });

    const commands = {
        connect: {
            description: 'Connect to Workbench Service',
            usage: 'connect <string>',
            fn: function () {
                // TODO: Open WebSocket connection to: /api/console?namespace=lambert8&ssid=s12345-toolmanager
                const svcId = 'sbzdph-toolmanager'; //`${Array.from(arguments).join(' ')}`;
                const namespace = 'lambert8';
                const host = `ws://localhost:30001`;
                const path = `api/console?namespace=${namespace}&ssid=${svcId}`;
                ws = new WebSocket(`${host}/${path}`);
                ws.addEventListener('open', (event) => console.log(`Opened connection to ${svcId}: `, event));
                ws.addEventListener('message', (message) => {
                    console.log(`Recv'd message from ${svcId}: `, message.data);

                });
                ws.addEventListener('close', (event) => console.log(`Closed connection to ${svcId}: `, event));
            }
        },
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>',
            fn: function () {
                return `${Array.from(arguments).join(' ')}`
            }
        },
        exit: {
            description: "Exit and close the console.",
            usage: 'exit',
            fn: props.close
        }
    }
    return (
        <Terminal
            welcomeMessage={'Welcome to the React terminal!'}
            promptLabel={'me@React:~$'}
        />
    );
}

export default MyTerminal;
