import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  color: #fff;
  font-size: 17px;
  border: none;
  margin: calc(2rem - .14285em) 0 1rem;
  padding: 0;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-weight: 700;
  line-height: 1.2857em;
  text-transform: none;

  a {
    color: #fff;
  }
`;

const Header = () => (
  <StyledHeader>
    Social App
  </StyledHeader>
);

export default Header;
