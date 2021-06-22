import React from 'react';
import logo from './logo.svg';
import { Footer } from './common/layout';
import './App.css';

import {Container} from "react-bootstrap";

function App() {
  return (
    <div className="App">
        <Container fluid={false}>
            Landing Page, Ahoy!
        </Container>

        <Footer />
    </div>
  );
}

export default App;
