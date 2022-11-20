import Console from "./Console";
import {useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import ReactGA from "react-ga";
import {useEffect} from "react";

interface ConsoleViewParams {
    stackServiceId: string;
}

function ConsolePage() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const { stackServiceId } = useParams<ConsoleViewParams>();

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/console');
        }
    }, [env?.analytics_tracking_id]);

    return (
        <>
            <h5 style={{ marginLeft: "15px" }}>
                Application Console: {stackServiceId}
                <Button className='float-end' variant={darkThemeEnabled ? 'dark':'light'}
                        onClick={() => window.close()}>
                    <FontAwesomeIcon icon={'times'} />
                </Button>
            </h5>

            <Console stackServiceId={stackServiceId} rows={45} cols={100}  />
        </>
    );
}

export default ConsolePage;
