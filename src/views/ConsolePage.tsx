import Console from "./Console";
import {useParams} from "react-router-dom";
import {ITerminalOptions} from "xterm";

interface ConsoleViewParams {
    stackServiceId: string;
}

function ConsolePage() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { stackServiceId } = useParams<ConsoleViewParams>();

    const options: ITerminalOptions = {
        rows: 45,
        cols: 100
    }

    return (
        <>
            <h5 style={{ marginLeft: "15px" }}>
                Application Console: {stackServiceId}
            </h5>

            <Console stackServiceId={stackServiceId} options={options}  />
        </>
    );
}

export default ConsolePage;
