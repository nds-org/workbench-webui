import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import  './LoginBanner.css'

const LoginBanner = () => {
    const [redirect, setRedirect] = useState('');
    const env = useSelector((state: any) => state.env);

    const gotoLogin = () => {
        if (env?.signin_url) {
            window.location.href = env?.signin_url;
        } else {
            setRedirect("/login")
        }
    }

    return (
        redirect ? <Navigate to={redirect} replace /> : <>
            <div className="thumbnail text-center">
                <img src="/login-banner.jpg" className="img-fluid" alt="..." />
                <div className="caption">
                    <h1 className="ui white header">
                        {
                            (env?.customization?.landing_html &&
                                <span dangerouslySetInnerHTML={{__html: env?.customization?.landing_html + ""}}></span>) || <>
                                <p className="nomargin">Labs Workbench allows developers to</p>
                                <p className="nomargin">prototype tools that help build out the</p>
                                <p className="nomargin">NDS framework and services.</p>
                            </>
                        }
                    </h1>

                    <Button style={{padding: "10px 30px"}} variant="light" size={'lg'} onClick={() => gotoLogin()}>
                        Log In
                    </Button>
                </div>
            </div>
        </>
    );
}

export default LoginBanner;
