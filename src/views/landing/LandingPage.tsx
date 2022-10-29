import {Footer} from "../../common";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

import './LandingPage.css';
import {useSelector} from "react-redux";
import ReactGA from "react-ga";
import LoginBanner from "./LoginBanner";
import LandingSection from "./LandingSection";

const LandingPage = () => {
    const [redirect, setRedirect] = useState('');
    const env = useSelector((state: any) => state.env);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/');
        }
    }, [env?.analytics_tracking_id]);


    return (
        redirect ?
            <Redirect to={redirect} />
            :
        <>
            <div className="login area row">
                <LoginBanner />
            </div>

            <div className="container sections" style={{ textAlign: "center" }}>
                <div id="sectionListHeader" className="row">
                    <div className="col">
                        <h2>How It Works...</h2>
                    </div>
                </div>

                <div id="sectionOne">
                    <LandingSection numeral={'01'} header={env?.customization?.landing_header_1} body={env?.customization?.landing_section_1} diagram={'/landing-diagram-1.svg'} textFirst={true}></LandingSection>
                </div>


                <div id="sectionTwo">
                    <LandingSection numeral={'02'} header={env?.customization?.landing_header_2} body={env?.customization?.landing_section_2} diagram={'/landing-diagram-2.svg'} textFirst={false}></LandingSection>
                </div>

                <div id="visitAllApps" className="row justify-content-md-center">
                    <div className="col">
                        <Button className="btn btn-dark btn-lg" onClick={() => setRedirect('/all-apps')}>Visit All the Apps</Button>
                    </div>
                </div>

                {
                    env?.support_email && <>
                        <div id="contactUs" className="row justify-content-md-center">
                            <div className="col-9">
                                <div className="card text-dark bg-warning">
                                    <div className="card-body" style={{ marginTop: "150px" }}>
                                        <h3 className="card-title">Have Issues With Your Service?</h3>
                                        <a href={ 'mailto:' + env?.support_email } className="btn btn-dark btn-lg">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

            <div style={{ height: "50px" }}></div>

            <Footer></Footer>
        </>
    );
}

export default LandingPage;
