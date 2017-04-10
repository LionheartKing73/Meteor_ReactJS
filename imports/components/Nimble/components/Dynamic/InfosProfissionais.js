import React, {Component} from "react";
import {connect} from "react-redux";
import {next, goToForm, init} from "../../../../redux/modules/nimble";
import cep from "cep-promise";

const { Select } = Mongoloid.Components;

const InfosProfissionaisSchema = new SimpleSchema({
	profissao: {
		type: String,
		label: 'Profissao',
	},
  empresa: {
    type: String,
    label: 'Empresa',
  },
  foneComercial: {
    type: String,
    label: 'Telefone comercial',
  },
  ramal: {
    type: String,
    label: 'Ramal',
  },
  cep: {
    type: String,
    label: 'EP',
  },
  logradouro: {
    type: String,
    label: 'Logradouro',
  },
  numero: {
    type: String,
    label: 'Número',
  },
  compl: {
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
  uf: {
    type: String,
    regEx: /[A-Z]{2}/,
    label: 'UF',
  },
	salarioBruto: {
		type: String,
		label: 'Salário bruto',
	},
  outraRendas: {
    type: String,
    label: 'Outras rendas',
  },
});

class _Component extends Component {
  constructor(props) {
    super(props);
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'infosprofissionais',
      schema: InfosProfissionaisSchema,
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
    next({step, value: data}, this.state);
  }

  handleChangeCEP(event) {
    const cepValue = event.target.value;
    if (Regex.CEP.test(cepValue) == true) {
      cep(cepValue).then((address) => {
        if (address.cep) {
          this._setMongoloidValue({"uf": address.state}, event.target);
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
			profissao = '',
      empresa = '',
      foneComercial = '',
      ramal = '',
      cep = '',
      logradouro = '',
      numero = '',
      compl = '',
      bairro = '',
      cidade = '',
      uf = '',
			salarioBruto = '',
      outraRendas = '',
    } = this.state;

    return (
      <div className="form-group carros purple">
				<label className="col-md-4">
					<span>Profissão:</span>
					<input
            data-autocomplete-query="nimble.values.atividadeProfissional.profissao"
            type="text" name="profissao" onChange={this._handleChange} value={profissao} />
				</label>

        <label className="col-md-4">
          <span>Empresa:</span>
          <input type="text" name="empresa" onChange={this._handleChange}
                 value={empresa}
                 data-autocomplete-query="nimble.customer.company"/>
        </label>

        <label className="col-md-4">
          <span>Telefone comercial:</span>
          <input className="phone" type="text" name="foneComercial" onChange={this._handleChange}
                 value={foneComercial}
                 data-autocomplete-query="nimble.customer.workPhone"/>
        </label>

        <label className="col-md-2">
          <span>Ramal:</span>
          <input type="text" name="ramal" onChange={this._handleChange}
                 value={ramal}
                 data-autocomplete-query="nimble.customer.ramal"/>
        </label>

        <label className="col-md-4">
          <span>CEP:</span>
			<input className="cep" type="text" name="cep" onChange={this.handleChangeCEP}
				   value={cep}
				   data-autocomplete-query="nimble.customer.homeZipcode"/>
        </label>

        <label className="col-md-6">
          <span>Logradouro:</span>
          <input type="text" name="logradouro" onChange={this._handleChange}
                 value={logradouro}
                 data-autocomplete-query="nimble.customer.workAddress"/>
        </label>

        <label className="col-md-2">
          <span>Número:</span>
          <input type="text" name="numero" onChange={this._handleChange}
                 value={numero}
                 data-autocomplete-query="nimble.customer.workAddressNumber"/>
        </label>

        <label className="col-md-2">
          <span>Compl:</span>
          <input type="text" name="compl" onChange={this._handleChange}
                 value={compl}
                 data-autocomplete-query="nimble.customer.workAddressComplemento"/>
        </label>

        <label className="col-md-4">
          <span>Bairro:</span>
          <input type="text" name="bairro" onChange={this._handleChange}
                 value={bairro}
                 data-autocomplete-query="nimble.customer.workAddressBairro"/>
        </label>

        <label className="col-md-4">
          <span>Cidade:</span>
          <input type="text" name="cidade" onChange={this._handleChange}
                 value={cidade}
                 data-autocomplete-query="nimble.customer.workCity"/>
        </label>

        <label className="col-md-4">
          <span>Estado/UF:</span>
          <Select
            data-autocomplete-query="nimble.customer.workState"
            self={this}
            className=""
            name="uf"
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
            value={uf}
          />
        </label>


        <label className="col-md-2">
          <span>Salário Bruto:</span>
          <input className="money" type="text" name="salarioBruto" onChange={this._handleChange} value={salarioBruto} />
        </label>

        <label className="col-md-6">
          <span>Outras rendas:</span>
          <input className="money" type="text" name="outraRendas" onChange={this._handleChange}
                 value={outraRendas}
                 data-autocomplete-query="nimble.customer.outrasRendas"/>
        </label>

        <div className="col-md-12">
          <button type="button" className="btn btn-primary pull-right"
                  onClick={this._handleSubmit}>
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
