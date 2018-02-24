import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Home';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SearchPage from './SearchPage';
import requireAuthentication from '../components/Auth';
import getUser from '../components/GetUser';
import Site from '../components/Site';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AccountPage from './AccountPage/View';

export default () => (
  <BrowserRouter>
    <Site>
      <Route path="/" render={(props) => (<NavBar {...props} />)} />
      <Container style={{ flex: 1 }}>
        <Route exact path="/" component={getUser(Home)} />
        <Route path="/login" render={(props) => (<LoginPage {...props} />)} />
        <Route path="/signup" render={(props) => (<SignupPage {...props} />)} />
        <Route path="/search" component={requireAuthentication(SearchPage)} />
        <Route path="/account/{id}" component={requireAuthentication(AccountPage)} />
      </Container>
      <Route path="/" render={(props) => (<Footer {...props} />)} />
    </Site>
  </BrowserRouter>
);
