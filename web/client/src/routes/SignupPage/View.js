import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import forEach from 'lodash/forEach';
import moment from 'moment';

import { Button, Form } from 'semantic-ui-react';
import DropZone from 'react-dropzone';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import HistoryShape from '../../shapes/history';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const DayPickerInputWrapper = styled.div`
  .DayPickerInput {
    width: 100%;
  }
`;

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      avatar: {},
      birthDay: '',
    };

    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day) {
    this.setState({ birthDay: day });
  }

  handleImageDrop(avatar) {
    const reader = new FileReader();
    const file = avatar[0];

    reader.onloadend = () => {
      this.setState({
        avatar: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    if (this.state.avatar === undefined) {
      // this.setState({ error: true });
    } else {
      this.props.requestSignup({
        redirect: () => this.props.history.push('/login'),
        data: {
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          avatar: this.state.avatar,
          birthDay: this.state.birthDay,
          joined: moment(),
        },
      });
      e.preventDefault();
      this.setState({
        name: '',
        surname: '',
        email: '',
        password: '',
        avatar: {},
        birthDay: '',
      });
    }
  }

  isFormValid() {
    let isValid = true;

    forEach(this.state, (el) => {
      if (!el) {
        isValid = false;
      }
    });

    return isValid;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            name="name"
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            placeholder="Name"
          />
          <Form.Input
            label="Surname"
            name="surname"
            onChange={(e) => this.setState({ surname: e.target.value })}
            value={this.state.surname}
            placeholder="Surname"
          />
        </Form.Group>
        <Form.Input
          label="Email"
          name="email"
          onChange={(e) => this.setState({ email: e.target.value })}
          value={this.state.email}
          placeholder="Email"
        />
        <Form.Input
          label="Password"
          name="password"
          onChange={(e) => this.setState({ password: e.target.value })}
          value={this.state.password}
          placeholder="Password"
          type="password"
        />
        <Form.Group widths="equal">
          <Form.Field>
            <label>Avatar</label>
            {/* <input name="avatar" type="file" onChange={this.handleImageDrop} /> */}
            <DropZone
              style={{
                height: 37,
                borderWidth: 2,
                borderColor: 'rgba(34,36,38,.15)',
                borderRadius: '.28571429rem',
                borderStyle: 'dashed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onDrop={this.handleImageDrop}
              accept="image/jpeg, image/png, image/bmp"
            >
              <div>Click or drop</div>
            </DropZone>
            <p>{this.state.avatar.name}</p>
          </Form.Field>
          <Form.Select label="Gender" options={genderOptions} placeholder="Gender" />
          <Form.Field>
            <label>Birthday</label>
            <DayPickerInputWrapper>
              <DayPickerInput onDayChange={this.handleDayChange} />
            </DayPickerInputWrapper>
          </Form.Field>
        </Form.Group>
        <Form.Field style={{ marginTop: 40 }}>
          {
            this.isFormValid() ?
              <Button type="submit" color="blue" fluid size="big">Sign up</Button> :
              <Button type="submit" color="blue" fluid size="big" disabled>Sign up</Button>
          }
        </Form.Field>
      </Form>
    );
  }
}

SignupPage.defaultProps = {
  requestSignup: () => ({}),
};

SignupPage.propTypes = {
  history: HistoryShape.isRequired,
  requestSignup: PropTypes.func,
};

export default SignupPage;
