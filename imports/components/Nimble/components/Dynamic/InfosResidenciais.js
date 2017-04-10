import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';
const { Select } = Mongoloid.Components;
import cep from 'cep-promise';

const InfosResidencaisSchema = new SimpleSchema({
	CEP: {
	  type: String,
	  label: 'CEP',
	  regEx: Regex.CEP,
	},
  logradouro: {
    type: String,
    label: 'Logradouro',
  },
  numero: {
    type: String,
    label: 'Número',
  },
  complemento: {
    type: String,
    label: 'Complemento',
    optional: true,
  },
  bairro: {
    type: String,
    label: 'Bairro',
  },
  cidade: {
    type: String,
    label: 'Cidade',
  },
  UF: {
    type: String,
    regEx: /[A-Z]{2}/,
    label: 'UF',
  },
});


class _Component extends Component {
  constructor(props) {
    super(props);

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'infosresidencais',
      schema: InfosResidencaisSchema,
      opType: 'nimble',
    };

    Mongoloid(mongoloidOptions);

    this.handleChangeCEP = this.handleChangeCEP.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    const { steps = [], currentStepID, next } = this.props;
    const data = this.state;
    const step = steps.find(s => s.id == currentStepID);
    next({ step, value: data }, this.state);
  }

  handleChangeCEP(event) {
    const cepValue = event.target.value;
    if (Regex.CEP.test(cepValue) == true) {
      cep(cepValue).then((address) => {
        if (address.cep) {
          this._setMongoloidValue({"UF": address.state}, event.target);
          this._setMongoloidValue({"cidade": address.city}, event.target);
          this._setMongoloidValue({"logradouro": address.street}, event.target);
          this._setMongoloidValue({"bairro": address.neighborhood}, event.target);
        }
      });
    }
    this._handleChange(event, "cep");
  }

  render() {
    const {
    	CEP = '',
      logradouro = '',
      numero = '',
      complemento = '',
      bairro = '',
      cidade = '',
      UF = '',
    } = this.state;

    return (

      <div className="form-group carros purple">
        <label className="col-md-4">
          <span>CEP:</span>
          <input className="cep" type="text" name="CEP" onChange={this.handleChangeCEP}
                 value={CEP}
                 data-autocomplete-query="nimble.customer.homeZipcode"/>
        </label>

        <label className="col-md-8">
          <span>Logradouro:</span>
          <input data-autocomplete-query="nimble.customer.homeAddress"
                 type="text" name="logradouro" onChange={this._handleChange} value={logradouro} />
        </label>

        <label className="col-md-2">
          <span>Número:</span>
          <input data-autocomplete-query="nimble.customer.homeNumber"
                 type="text" name="numero" onChange={this._handleChange} value={numero} />
        </label>

        <label className="col-md-2">
          <span>Compl:</span>
          <input data-autocomplete-query="nimble.customer.homeComplemento"
                 type="text" name="complemento" onChange={this._handleChange} value={complemento} />
        </label>

        <label className="col-md-4">
          <span>Bairro:</span>
          <input data-autocomplete-query="nimble.customer.homeBairro"
                 type="text" name="bairro" onChange={this._handleChange} value={bairro} />
        </label>

        <label className="col-md-4">
          <span>Cidade:</span>
          <input data-autocomplete-query="nimble.customer.homeCity"
                 type="text" name="cidade" onChange={this._handleChange} value={cidade} />
        </label>

        <label className="col-md-4">
          <span>Estado/UF:</span>
          <Select
            self={this}
            data-autocomplete-query="nimble.customer.homeState"
            className="small"
            name="UF"
            options={[
                    { value: 'AC', label: 'AC' },
                    { value: 'AL', label: 'AL' },
                    { value: 'AP', label: 'AP' },
                    { value: 'AM', label: 'AM' },
                    { value: 'BA', label: 'BA' },
                    { value: 'CE', label: 'CE' },
                    { value: 'DF', label: 'DF' },
                    { value: 'ES', label: 'ES' },
                    { value: 'GO', label: 'GO' },
                    { value: 'MA', label: 'MA' },
                    { value: 'MT', label: 'MT' },
                    { value: 'MS', label: 'MS' },
                    { value: 'MG', label: 'MG' },
                    { value: 'PA', label: 'PA' },
                    { value: 'PB', label: 'PB' },
                    { value: 'PR', label: 'PR' },
                    { value: 'PE', label: 'PE' },
                    { value: 'PI', label: 'PI' },
                    { value: 'RJ', label: 'RJ' },
                    { value: 'RN', label: 'RN' },
                    { value: 'RS', label: 'RS' },
                    { value: 'RO', label: 'RO' },
                    { value: 'RR', label: 'RR' },
                    { value: 'SC', label: 'SC' },
                    { value: 'SP', label: 'SP' },
                    { value: 'SE', label: 'SE' },
                    { value: 'TO', label: 'TO' },
            ]}
            value={UF}
          />
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
