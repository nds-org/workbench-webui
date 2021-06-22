import React, { Component } from 'react';
import { V1, V2 } from "../services";
import './footer.css';

interface FooterState {
    version?: string;
}

class Footer extends Component<{}, FooterState> {
    constructor(props: any) {
        super(props);
        this.state = { version: '' };
    }

     componentDidMount() {
        //const version = await V2.SystemService.getVersion()
        V1.SystemService.getVersion().then(version => {
            console.log("Version has been fetched: ", version);
            this.setState((state, props) => ({version: version}), () => {
                console.log("Version has been set in state: ", this.state.version);
            })
        }).catch(reason => console.error("Failed to fetch version: ", reason));
    }

    render() {
        return (
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">
                        {this.state.version || 'No version data'}
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;
