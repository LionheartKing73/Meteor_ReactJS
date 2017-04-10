import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';
const { Date, Select } = Mongoloid.Components;


const ValidationSchema = new SimpleSchema({
  profissao: {
    type: String,
    label: 'Profissão',
    min: 4,
    max: 100,
  },

  salario: {
    type: String,
    label: 'Salário bruto',
    min: 4,
    max: 100,
  },
});

class _Component extends Component {
  constructor(props) {
    super(props);

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'atividadeProfissional',
      schema: ValidationSchema,
      opType: 'update',
    };

    Mongoloid(mongoloidOptions);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    const { steps = [], currentStepID, next } = this.props;
    const data = this.state;
    delete data.mongoloidKey_carro_ano;
    const step = steps.find(s => s.id == currentStepID);
    next({ step, value: data }, this.state);
  }

  render() {
    const { salario, profissao } = this.state;

    return (
      <div className="form-group">
        <label className="col-md-4">
          <span>Profissão:</span>
          <input
            data-autocomplete-query="nimble.inforsHabilitacao.cnh"
            type="text" name="profissao" className="profissao"
            onChange={this._handleChange} value={profissao}
          />
        </label>

        <label className="col-md-12">
          <span>Salário bruto:</span>
          <Select
            data-autocomplete-query="nimble.inforsHabilitacao.firstCnh"
            self={this}
            name="salario"
            options={[
              {
                value: 'R$ 1.500,00 a R$ 2.500,00',
                label: 'R$ 1.500,00 a R$ 2.500,00',
              },
              {
                value: 'R$ 3.000,00 a R$ 4.000,00',
                label: 'R$ 3.000,00 a R$ 4.000,00',
              },
              {
                value: 'R$ 4.500,00 a R$ 5.000,00',
                label: 'R$ 4.500,00 a R$ 5.000,00',
              },
              {
                value: 'Maior que R$ 5.000,00',
              },
            ]}
            value={salario}
          />
        </label>

        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary pull-right"
            onClick={this._handleSubmit}
          >
            Seguir
          </button>
        </div>
      </div>
    );
  }
}

const conector = connect(state => state.nimble, { next });

const ComponentConectado = conector(_Component);

export default ComponentConectado;
