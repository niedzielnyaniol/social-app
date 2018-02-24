import React from 'react';
import styled from 'styled-components';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

const StyledFooter = styled.div`
  width: 100%;
  height: 50px;
  background: #2185D0;
  display: float;
  align-items: center;
`;

const Footer = () => (
  <StyledFooter>
    <Container>
      <Header as="h5" inverted floated="right">
        © 2017 by social-app
      </Header>
    </Container>
  </StyledFooter>
);

export default Footer;
