import {useEffect, useState} from 'react';
import {V1} from '..';
import {Container} from "react-bootstrap";

import './footer.css';

function Footer() {
    const [version, setVersion] = useState('');

     useEffect(() => {
        V1.SystemService.getVersion().then((v: string) => {
            setVersion(v);
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
