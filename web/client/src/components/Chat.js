import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Input } from 'semantic-ui-react';

const Container = styled.div`
  width: 270px;
  position: fixed;
  bottom: 0;
  background: #fefefe;
  right: 240px;
`;

const Content = styled.div`
  border: 1px solid rgba(34,36,38,.1);
  border-top: none;
  border-bottom: none;
  height: 270px;
`;

const Header = styled.div`
  font-size: 14px;
  font-weight: 600;
  background: #2185D0;
  padding: 5px 10px;
  color: #fff;
  min-height: 29px;
`;

const BtnX = styled.div`
  float: right;
  cursor: pointer;
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      hidden: false,
    };
  }
115
  hide = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      this.state.visible ?
        <Container>
          <Header onClick={this.hide}>Chat<BtnX onClick={this.close}>&#10006;</BtnX></Header>
          {
            this.state.hidden ? null : [
              <Content />,
              <Input
                icon={<Icon name="mail outline" inverted circular link f />}
                placeholder="Message..."
                fluid
                style={{ borderRadius: 0 }}
              />,
            ]
          }
        </Container> : null
    );
  }
}

export default Chat;
