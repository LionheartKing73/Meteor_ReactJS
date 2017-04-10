import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';

const InfosContatoSchema = new SimpleSchema({
  foneResidencial: {
    type: String,
    label: 'Telefone Residencial',
    regEx: Regex.telefone,
  },
  foneCelular: {
    type: String,
    label: 'Telefone Celular',
    regEx: Regex.telefone,
  },
  email: {
    type: String,
    regEx: Regex.Email,
    label: 'Email',
  },
});


class _Component extends Component {
  constructor(props) {
    super(props);

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'infoscontatos',
      schema: InfosContatoSchema,
      opType: 'nimble',
    };

    Mongoloid(mongoloidOptions);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    const { steps = [], currentStepID, next } = this.props;
    const data = this.state;
    const step = steps.find(s => s.id == currentStepID);
    next({ step, value: data }, this.state);
  }

  render() {
    const {
      foneResidencial = '',
      foneCelular = '',
      email = '',
    } = this.state;

    return (

      <div className="form-group carros purple">

        <label className="col-md-4">
          <span>Telefone Residêncial:</span>
          <input
            data-autocomplete-query="nimble.customer.homePhone"
            type="text" className="phone large"
            name="foneResidencial"
            onChange={this._handleChange}
            value={foneResidencial}
          />
        </label>

        <label className="col-md-4">
          <span>Telefone Celular:</span>
          <input
            data-autocomplete-query="nimble.customer.mobileNumber"
            type="text" className="phone large"
            name="foneCelular"
            onChange={this._handleChange}
            value={foneCelular}
          />
        </label>

        <label className="col-md-4">
          <span>Email:</span>
          <input
            data-autocomplete-query="nimble.customer.homeEmail"
            type="text" name="email" onChange={this._handleChange} value={email} />
        </label>

        <div className="col-md-12">
          <button type="button" className="btn btn-primary pull-right" onClick={this._handleSubmit}>
            Seguir
          </button>
        </div>

      </div>

    );
  }
  }

export default connect(state => state.nimble, {
  next, init, goToForm,
})(_Component);
