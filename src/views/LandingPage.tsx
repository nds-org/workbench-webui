import {Footer} from "../common";
import React, {useState} from "react";
import './LandingPage.css';
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

const LandingPage = () => {
    const [redirect, setRedirect] = useState('');

    return (
        redirect ?
            <Redirect to={redirect} />
            :
        <>
            <div className="login area row">
                <div className="login banner" style={{
                    backgroundImage: 'url("/login-banner.jpg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "2200px 1200px",
                    backgroundPosition: "-400px -300px",
                    paddingTop: "100px",
                    height: "450px",
                    paddingBottom: "40px",
                }}>
                    <h1 className="ui white header">
                        <p className="nomargin">Labs Workbench allows developers to</p>
                        <p className="nomargin">prototype tools that help build out the</p>
                        <p className="nomargin">NDS framework and services.</p>
                    </h1>

                    <Button style={{ marginTop: "100px", padding: "10px 30px" }} variant="light" size={'lg'} onClick={() => setRedirect("/login")}>Log In</Button>
                </div>
            </div>

            <div className="container" style={{ marginTop: "200px" }}>
                <div id="sectionOneHeader" className="row justify-content-md-center">
                    <div className="row">
                        <div className="col">
                            <h2>How It Works...</h2>
                        </div>
                    </div>
                </div>

                <div id="sectionOneBody" className="row justify-content-md-center">
                    <div className="col-6">
                        <div className="row">
                            <div className="col">
                                <h3 className="text-header">
                                    <div className="row">
                                        <div className="col-4"><span className="numeric-header">01</span></div>
                                        <div className="col"><span className="header-text">Find the tools you need</span></div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>
                            </div>
                        </div>
                    </div>

                    <div id="sectionOneDiagram" className="col-6">
                        <img className="image-content" src="/landing-diagram-1.png" width="316px" height="260x" />
                    </div>
                </div>

                <div id="sectionTwo" className="row justify-content-md-center">
                    <div id="sectionTwoDiagram" className="col-6">
                        <img className="image-content" src="/landing-diagram-2.png" width="316px" height="316px" />
                    </div>

                    <div className="col-6">
                        <div className="row">
                            <div className="col">
                                <h3 className="text-header">
                                    <div className="row">
                                        <div className="col-4"><span className="numeric-header">02</span></div>
                                        <div className="col"><span className="header-text">Run the tools on our cloud service</span></div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="visitAllApps" className="row justify-content-md-center">
                    <div className="col">
                        <Button className="btn btn-dark btn-lg" onClick={() => setRedirect('/all-apps')}>Visit All the Apps</Button>
                    </div>
                </div>

                <div id="contactUs" className="row justify-content-md-center">
                    <div className="col-9">
                        <div className="card text-dark bg-warning">
                            <div className="card-body" style={{ marginTop: "150px" }}>
                                <h3 className="card-title">Have Issues With Your Service?</h3>
                                <a href="#" className="btn btn-dark btn-lg">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
}

export default LandingPage;
