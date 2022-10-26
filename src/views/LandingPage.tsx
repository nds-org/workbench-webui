import {Footer} from "../common";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

import './LandingPage.css';
import styled from "styled-components";
import {textColor} from "../App";
import {useSelector} from "react-redux";
import ReactGA from "react-ga";

const NumericHeader = styled.span`
    bottom: 10px;
    width: 291px;
    height: 116px;
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 80pt;
    line-height: 116px;

    /* mid */

    color: #EB2A52;

    opacity: 0.6;
`;

const LandingPage = () => {
    const [redirect, setRedirect] = useState('');
    const env = useSelector((state: any) => state.env);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/');
        }
    }, [env?.analytics_tracking_id]);

    const SectionHeader = styled.h3`
        color: ${textColor};
        
        width: 349px;
        height: 43px;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 44px;
        text-align: left;
    `;

    const gotoLogin = () => {
        if (env?.signin_url) {
            window.location.href = env?.signin_url;
        } else {
            setRedirect("/login")
        }
    }

    return (
        redirect ?
            <Redirect to={redirect} />
            :
        <>
            <div className="login area row">
                <div className="login banner" style={{
                    position: 'relative',
                    background: 'url("/login-banner.jpg") 0 -900px/auto auto no-repeat fixed',
                    minHeight: '20vh',
                    width: '100vw'}}>
                    <h1 className="ui white header">
                        {
                            (env?.customization?.landing_html && <span dangerouslySetInnerHTML={{__html: env?.customization?.landing_html+""}}></span>) || <>
                                <p className="nomargin">Labs Workbench allows developers to</p>
                                <p className="nomargin">prototype tools that help build out the</p>
                                <p className="nomargin">NDS framework and services.</p>
                            </>
                        }
                    </h1>

                    <Button style={{ padding: "10px 30px" }} variant="light" size={'lg'} onClick={() => gotoLogin()}>Log In</Button>
                </div>
            </div>

            <div className="container sections">
                <div id="sectionListHeader" className="row">
                    <div className="col">
                        <h2>How It Works...</h2>
                    </div>
                </div>

                <div id="sectionOne" className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col-4" id="sectionOneHeader"><NumericHeader>01</NumericHeader></div>
                                    <div className="col" id="sectionOneBody"><SectionHeader>
                                        {
                                            env?.customization?.landing_header_1 && <span className="text-content" dangerouslySetInnerHTML={{__html: env?.customization?.landing_header_1+""}}></span>
                                        }
                                        {
                                            !env?.customization?.landing_header_1 && <>Find the tools you need</>
                                        }
                                    </SectionHeader></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {
                                    env?.customization?.landing_section_1 && <p className="text-content" dangerouslySetInnerHTML={{__html: env?.customization?.landing_section_1+""}}></p>
                                }
                                {
                                    !env?.customization?.landing_section_1 &&
                                        <p className="text-content">
                                            Search our catalog of web-based research and software tools.
                                            We offer over 30 different software tools that fit many common scenarios
                                            encountered in research software development.
                                            Find a set of tools to help you build out a new software product or
                                            extend an existing one.
                                        </p>
                                }
                            </div>
                        </div>
                    </div>

                    <div id="sectionOneDiagram" className="col-6">
                        <img alt={'landing-diagram-1'} className="image-content" src="/landing-diagram-1.svg" width="316px" height="260x" />
                    </div>
                </div>

                <div id="sectionTwo" className="row">
                    <div id="sectionTwoDiagram" className="col-6">
                        <img alt={'landing-diagram-2'} className="image-content" src="/landing-diagram-2.svg" width="316px" height="316px" />
                    </div>

                    <div className="col-6">
                        <div className="row">
                            <div className="col">
                                    <div className="row">
                                        <div className="col-4" id="sectionTwoHeader"><NumericHeader>02</NumericHeader></div>
                                        <div className="col" id="sectionTwoBody">
                                            <SectionHeader>
                                                {
                                                    env?.customization?.landing_header_2 && <span className="text-content" dangerouslySetInnerHTML={{__html: env?.customization?.landing_header_2+""}}></span>
                                                }
                                                {
                                                    !env?.customization?.landing_header_2 && <>Run the tools on our cloud service</>
                                                }

                                                </SectionHeader>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {
                                    env?.customization?.landing_section_2 && <p className="text-content" dangerouslySetInnerHTML={{__html: env?.customization?.landing_section_2+""}}></p>
                                }
                                {
                                    !env?.customization?.landing_section_2 &&
                                        <p className="text-content">
                                            Once you've narrowed down your choices, launch your desired tool set on our
                                            cloud resources.
                                            Access your running applications using our web interface, and start integrating
                                            the tools and shaping your software product.
                                        </p>
                                }
                            </div>
                        </div>
                    </div>
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
