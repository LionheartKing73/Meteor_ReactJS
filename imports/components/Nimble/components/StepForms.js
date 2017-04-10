import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormBase from '../components/FormBase';

class _Component extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const { step } = this.props;

    return (
      <div className="row card quest-ludico nimble-container flexboxgrid">
        <FormBase />
      </div>
    );
  }
}

export default connect(state => state.nimble, {})(_Component);
