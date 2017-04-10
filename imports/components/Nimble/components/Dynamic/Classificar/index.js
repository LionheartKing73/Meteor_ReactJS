import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../../redux/modules/nimble';
const Rate = require('rc-rate');
import './styles.scss';

class _Component extends Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(v) {
    const { steps = [], currentStepID, next } = this.props;
    const step = steps.find(s => s.id == currentStepID);
    next({ step, value: v }, this.state);
  }

  render() {
    return (
      <div className="col-md-12">
        <Rate onChange={this._handleChange} count={4} />
      </div>
    );
  }
}

export default connect(state => state.nimble, { next })(_Component);
