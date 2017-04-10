import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';
import schemaValidateCPF from '../../../../../lib/__core/helpers/schemaValidateCPF';

const { Date, Select } = Mongoloid.Components;


const ClienteSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nome',
    min: 2,
    max: 100,
  },
  sexo: {
    type: String,
    label: 'Sexo',
  },
  estadoCivil: {
    type: String,
    label: 'Estado Civil',
  },
  nascimento: {
    type: String,
    label: 'Data de Nascimento',
  },
  CPF: {
    type: String,
    custom: schemaValidateCPF,
    label: 'CPF',
  }
});


class _Component extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'dadosCliente',
      schema: ClienteSchema,
      opType: 'nimble',
    };

    Mongoloid(mongoloidOptions);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // _handleSubmit() {
  //   const { steps = [], currentStepID, next } = this.props;
  //   let data = this.state;
  //   delete data.mongoloidKey_carro_ano;
  //   const step = steps.find(s => s.id == currentStepID);
  //   next({ step, value: data }, this.state);
  // }

  render() {
    const { CEP, CPF, nascimento, name, sexo, estadoCivil } = this.state;

    return (
      <div className="col-md-12 form-group carros">
        <label className="col-md-8">
          <span>Nome completo:</span>
          <input
            data-autocomplete-query="nimble.customer.name"
            type="text" name="name" onChange={this._handleChange}
            value={name}
          />
        </label>

        <label className="col-md-4">
          <span>Data de Nascimento:</span>
          <Date
            data-autocomplete-query="nimble.customer.birthday"
            name="nascimento"
            value={(nascimento)? moment(nascimento).format() : ""}
            self={this}
            minYear={25}
            maxYear={100}
          />
        </label>

        <label className="col-md-4">
          <span>CPF:</span>
          <input
            data-autocomplete-query="nimble.customer.document"
            type="text" name="CPF" className="cpf"
            onChange={this._handleChange} value={CPF}
          />
        </label>

        <label className="col-md-4">
          <span>Sexo:</span>
          <Select
            data-autocomplete-query="nimble.customer.gender"
            self={this}
            name="sexo"
            options={[
              { value: '', label: 'Sexo' },
              { value: 'masculino', label: 'Masculino' },
              { value: 'feminino', label: 'Feminino' },
            ]}
            value={sexo}
          />
        </label>

        <label className="col-md-4">
          <span>Estado Civil:</span>
          <Select
            data-autocomplete-query="nimble.customer.maritalStatus"
            self={this}
            name="estadoCivil"
            options={[
              { value: '', label: 'Estado Civil' },
              { value: 'casado', label: 'Casado' },
              { value: 'divorciado', label: 'Divorciado' },
              { value: 'separado', label: 'Separado' },
              { value: 'solteiro', label: 'Solteiro' },
              { value: 'uniao_estavel', label: 'União Estável' },
              { value: 'viuvo', label: 'Viúvo' }
            ]}
            value={estadoCivil}
          />
        </label>

        {
          (this.state.error) ? (
              <label className="mongol__error-message state-error">
                {this.state.error}
              </label>
            ) : null
        }

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
  next,
  init,
  goToForm,
})(_Component);
