import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';
const { Select } = Mongoloid.Components;

const CarroSchema = new SimpleSchema({
  modelo: {
    type: String,
    min: 4,
    max: 150,
  },
  ano: {
    type: String,
    regEx: /(19|20)[0-9]{2}/,
  },
});


class _Component extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carrosEncontrados: global.__carrosEncontrados__ || [],
    };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'carro_ano',
      schema: CarroSchema,
      opType: 'nimble',
    };

    Mongoloid(mongoloidOptions);

    this._handleBuscaCarroChange = this._handleBuscaCarroChange.bind(this);
  }

  _handleBuscaCarroChange(text) {
    // FIXME: implementar espera antes de buscar
    Meteor.call('findCarros', text, (err, res) => {
      if (res) {
        const carrosEncontrados = res.map(c => ({ label: c.name, value: c.name }));
        this.setState({
          carrosEncontrados,
        });

        // TODO: passar ao redux
        global.__carrosEncontrados__ = carrosEncontrados
      }
    });
  }

  render() {
    const {ano, modelo, carrosEncontrados } = this.state;

    return (
      <div className="form-group carros col-md-12 forms">
        <label className="col-md-12">
          <span>Modelo:</span>
          <Select
            data-autocomplete-query="nimble.values.qualSeuVeiculo.modelo"
            self={this}
            name="modelo"
            options={(carrosEncontrados.length) ? carrosEncontrados : [{ label: '🔍 Busque seu Veículo', value: modelo }]}
            onInputChange={this._handleBuscaCarroChange}
            onChange={this._handleChange}
            value={modelo}
          />
        </label>

        <label className="col-md-12">
          <span>Ano:</span>
          <input
            data-autocomplete-query="nimble.values.qualSeuVeiculo.modelo"
            className="year" name="ano" onChange={this._handleChange} value={ano} />
        </label>

        <button type="button" className="btn btn-primary pull-right" onClick={this._handleSubmit}>
          Seguir
        </button>
      </div>
    );
  }
}

export default connect(state => state.nimble, {
  next, init, goToForm,
})(_Component);
