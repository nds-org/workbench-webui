import {useEffect, useState} from 'react';
import {V1} from '..';
import Container from "react-bootstrap/Container";

import './footer.css';
import {useSelector} from "react-redux";

function Footer() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const [version, setVersion] = useState('');

     useEffect(() => {
        V1.SystemService.getVersion().then((v: string) => {
            setVersion(v);
        }).catch(reason => console.error("Failed to fetch version: ", reason));
    }, [])

    return (
        <footer className="footer mt-auto padded text-center" style={{
            backgroundColor: darkThemeEnabled ? '#283845' : '#fff'
        }}>
            <Container fluid={true}>
                <span style={{ color: darkThemeEnabled ? '#bbb' : '#475362' }}>
                    {version || 'No version data'}
                </span>
            </Container>
        </footer>
    );
}

export default Footer;
