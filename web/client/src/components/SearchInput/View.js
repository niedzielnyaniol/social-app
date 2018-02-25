import React from 'react';
import PropTypes from 'prop-types';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { Icon, Form } from 'semantic-ui-react';

import HistoryShape from '../../shapes/history';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputContent: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      inputContent: e.target.value,
    });
  }

  handleSubmit(e) {
    // this.props.requestSearch({
    //   data: {
    //     data: this.state.inputContent,
    //   },
    //   redirect: () => {
    //     const params = new URLSearchParams(this.props.location.search);
    //     const next = params.get('next');
    //     if (next) {
    //       this.props.history.push(next);
    //     } else {
    //       this.props.history.push('/search');
    //     }
    //   },
    // });
    this.setState({ inputContent: '' });
    e.preventDefault();
  }

  render() {
    return (
      <Menu.Item style={{ margin: '0 auto' }}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            style={{ width: 400 }}
            className="icon"
            icon={<Icon name="search" link onClick={this.handleSubmit} />}
            placeholder="Search..."
            onChange={this.onInputChange}
            value={this.state.inputContent}
          />
        </Form>
      </Menu.Item>
    );
  }
}

SearchInput.propTypes = {
  history: HistoryShape.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  requestSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  location: {},
  requestSearch: () => {},
};

export default SearchInput;

