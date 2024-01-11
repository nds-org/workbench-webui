import "swagger-ui-react/swagger-ui.css";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ReactGA from "react-ga";
import Button from "react-bootstrap/Button";
import {useQueryParam} from "use-query-params";
import {Navigate} from "react-router-dom";

function ErrorPage(props: { code: string; }) {
    // TODO: light/dark theming
    //const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const env = useSelector((state: any) => state.env);
    const [redirect, setRedirect] = useState<string>('');
    const [rd] = useQueryParam<string>('rd')

    useEffect(() => {
        if (env?.customization?.product_name) {
            document.title = `${env?.customization?.product_name}: Unauthorized`;
        }
    }, [env]);

    useEffect(() => {
        if (env?.analytics_tracking_id && props.code) {
            ReactGA.pageview(`/${props.code}.html`);
        } else if (env?.analytics_tracking_id) {
            ReactGA.pageview(`/error.html`);
        }
    }, [env?.analytics_tracking_id, props.code]);

    const renderErrorMessage = (code: string) => {
        switch(code) {
            case '401': {
                return (
                    <>
                        <h2>You must Sign In to view this page.</h2>
                        <Button className="btn btn-dark btn-lg" onClick={() => setRedirect('/login')}>Sign In</Button>
                    </>
                );
            }
            case '503': {
                return(
                    rd ?
                    <>
                        <h2 className={'text-center'}>App is still launching.. Please wait and you will be redirected when it is online.</h2>
                        <Button className="btn btn-dark btn-lg" onClick={() => rd ? window.location.replace(rd) : window.location.reload()}>Try Again</Button>
                    </>
                        :
                    <>
                        <h2>An unknown error has occurred</h2>
                        {
                            props?.code && <h4>Code: {props.code}</h4>
                        }
                    </>
                );
            }
            case '404': {
                return(
                    <>
                        <h2>Page not found, please try again :(</h2>
                        <h4>If you think you have reached this page in error, contact your administrator.</h4>
                    </>
                );
            }
            default: {
                return(
                    <>
                        <h2>An unknown error has occurred</h2>
                        {
                            props?.code && <h4>Code: {props.code}</h4>
                        }
                    </>
                );
            }
        }
    }

    return (
        redirect ?
            <Navigate to={redirect} replace />
            :
            <div className={'text-center'} style={{ marginTop:'20vh'}}>
                {renderErrorMessage(props?.code)}
            </div>

    );
}

export default ErrorPage;
