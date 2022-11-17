import {useEffect, useState} from 'react';
import {V1} from '..';
import Container from "react-bootstrap/Container";

import './footer.css';
import {useSelector} from "react-redux";
import {colors} from "../../App";

function Footer() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    const [version, setVersion] = useState('');
    const [hash, setHash] = useState('');

     useEffect(() => {
        V1.SystemService.getVersion().then((v: { version?: string; hash?: string; }) => {
            v.version && setVersion(v.version);
            v.hash && setHash(v.hash);
        }).catch(reason => console.error("Failed to fetch version: ", reason));
    }, [])

    const color = darkThemeEnabled ? colors.textColor.dark : colors.textColor.light;

    return (
        <footer className="footer mt-auto padded text-center" style={{
            backgroundColor: darkThemeEnabled ? '#283845' : '#fff'
        }}>
            <Container fluid={true}>
                <span>{version || 'No version data'}</span>
                {
                    hash && <small>
                        <a id={'version-hash-link'} style={{color}}
                           href={'https://github.com/nds-org/workbench-apiserver-python/tree/'+hash}>
                            {hash.substr(0,8)}
                        </a>
                    </small>
                }
            </Container>
        </footer>
    );
}

export default Footer;
