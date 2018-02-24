import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Home';
import getUser from '../components/GetUser';
import Site from '../components/Site';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default () => (
  <BrowserRouter>
    <Site>
      <Route path="/" render={(props) => (<NavBar {...props} />)} />
      <Container style={{ flex: 1 }}>
        <Route exact path="/" component={getUser(Home)} />
      </Container>
      <Route path="/" render={(props) => (<Footer {...props} />)} />
    </Site>
  </BrowserRouter>
);
