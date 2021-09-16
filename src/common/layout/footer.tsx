import React, {Component, useEffect, useState} from 'react';
import { V1, V2 } from "../services";
import './footer.css';
import {Container} from "react-bootstrap";

function Footer(props: {}) {
    const [version, setVersion] = useState('');

     useEffect(() => {
        V1.SystemService.getVersion().then((v: string) => {
            console.log("Version has been fetched: ", v);
            setVersion(v)
        }).catch(reason => console.error("Failed to fetch version: ", reason));
    }, [])

    return (
        <footer className="footer mt-auto py-3 bg-light text-center">
            <Container fluid={true}>
                <span className="text-muted">
                    {version || 'No version data'}
                </span>
            </Container>
        </footer>
    );
}

export default Footer;
