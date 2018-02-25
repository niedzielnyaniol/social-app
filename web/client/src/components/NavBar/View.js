import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import UserCard from '../UserCard';
import Header from '../Header';
import SearchInput from '../SearchInput';
import UserShape from '../../shapes/user';
import HistoryShape from '../../shapes/history';

const loggedIn = (user) => (
  <Menu.Menu position="right">
    <Menu.Item
      name="user"
      onClick={() => { window.location.href = '/account'; }}
      style={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <UserCard user={user} />
    </Menu.Item>

    <Menu.Item name="logout" onClick={() => { window.location.href = '/logout'; }}>
      <b>Logout</b>
    </Menu.Item>
  </Menu.Menu>
);

const loggedOut = (history) => (
  <Menu.Menu position="right">
    <Menu.Item name="signup" onClick={() => history.push('/signup')}>
      <b>Sign Up</b>
    </Menu.Item>
    <Menu.Item name="login" onClick={() => history.push('/login')}>
      <b>Login</b>
    </Menu.Item>
  </Menu.Menu>
);

const NavBar = ({
  user, requestLogout, history,
}) => (
  <Menu color="blue" inverted fixed="top">
    <Container>
      <Menu.Item name="home" onClick={() => history.push('/')}>
        <Header />
      </Menu.Item>
      {
        Object.values(user).length
        ? <SearchInput history={history} />
        : null
      }
      {
        Object.values(user).length
        ? loggedIn(user, requestLogout, history)
        : loggedOut(history)
      }
    </Container>
  </Menu>
);

NavBar.defaultProps = {
  requestLogout: () => {},
  user: {},
};

NavBar.propTypes = {
  history: HistoryShape.isRequired,
  requestLogout: PropTypes.func,
  user: UserShape,
};

export default NavBar;
