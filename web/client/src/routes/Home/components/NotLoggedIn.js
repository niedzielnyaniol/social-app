import React from 'react';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import SignupPage from '../../SignupPage';

import HistoryShape from '../../../shapes/history';

const NotLoggedIn = ({ history }) => (
  <Grid>
    <Grid.Column width={6}>
      <Header as="h1">
        Social-app!
      </Header>
      <Image src="/assets/img/logo.png" />
    </Grid.Column>
    <Grid.Column width={10}>
      <Segment>
        <Header as="h1">
          Register now!
          <SignupPage history={history} />
        </Header>
      </Segment>
    </Grid.Column>
  </Grid>
);

NotLoggedIn.propTypes = {
  history: HistoryShape.isRequired,
};

export default NotLoggedIn;
