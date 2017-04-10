import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { next, goToForm, init, setValue } from '../../../../redux/modules/nimble';
import marcas from './lib/carros_api';

class _Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      veiculo: '',
      marca: '',
      marcas,
      options: [],
			loading: false
    };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'veiculoDesejado',
      opType: 'nimble',
    };

    Mongoloid(mongoloidOptions);

    this._handleClickMarca = this._handleClickMarca.bind(this);
    this._getMarcaClassName = this._getMarcaClassName.bind(this);
  }

  _handleClickMarca(marca) {
  	this.setState({loading: true});
    Meteor.call('carros.getList', marca, (err, options) => {
    	if (options) {
    		this.setState({
      		marca,
					veiculo: '',
					options,
					loading: false,
					hasChange: false
    		});
    	}
    });
  }

  _handleClick(e) {
  	const { veiculo } = this.state;
  	if(this.props.modal) {
  		this.props.setValue(
  			{id: 'veiculoDesejado'},
				'veiculoDesejado',
				{veiculo: this.state.veiculo, name: this.state.name}
			)
		}
		else {
  		if(veiculo)
				this._handleSubmit(e)
		}
	}

  _getMarcaClassName(marca) {
    return `img-marcas click-modelo ${(this.state.marca == marca) ? 'active-tile' : ''}`;
  }

  render() {
    const { loading, marca, options, veiculo } = this.state;
    const isDisabled = (!veiculo);

    return (
      <div className="form-group carros row">
        <div className={`row ${this.props.alignCenter && 'text-center'}`}>
          <div
            onClick={ev => this._handleClickMarca('audi')}
            className={this._getMarcaClassName('audi')}
          >
            <img src="/img/audi.png" />
          </div>
          <div
            onClick={ev => this._handleClickMarca('chevrolet')}
            className={this._getMarcaClassName('chevrolet')}
          >
            <img src="/img/crevrolet.png" />
          </div>

          <div
            onClick={ev => this._handleClickMarca('ford')}
            className={this._getMarcaClassName('ford')}
          >
            <img src="/img/ford.png" />
          </div>

          <div
            onClick={ev => this._handleClickMarca('hyundai')}
            className={this._getMarcaClassName('hyundai')}
          >
            <img src="/img/hyundai.png" />
          </div>

          <div
            onClick={ev => this._handleClickMarca('nissan')}
            className={this._getMarcaClassName('nissan')}
          >
            <img src="/img/nissan.png" />
          </div>

          <div
            onClick={ev => this._handleClickMarca('peugeot')}
            className={this._getMarcaClassName('peugeot')}
          >
            <img src="/img/peugeot.png" />
          </div>

          <div
            onClick={ev => this._handleClickMarca('toyota')}
            className={this._getMarcaClassName('toyota')}
          >
            <img src="/img/toyota.png" />
          </div>
        </div>

				{marca &&
				<div className="row">
					<label style={{marginTop: '10px'}}>Modelo</label>
					<Select
						name={`select_veiculos_${marca}`}
						options={options}
						value={veiculo}
						placeholder="Selecione um veículo..."
						noResultsText="Sem resultados, selecione uma marca."
						isLoading={loading}
						onChange={({ value, label }) => {
							this._setMongoloidValue({
								veiculo: value,
								name: label,
							});
						}}
					/>
        </div>}

				{this.props.modal &&
				<button
					type="button"
					className="btn btn-danger pull-right"
					style={{margin: '10px 5px 0 0'}}
					onClick={this.props.handleBack}
				>
					Cancelar
				</button>}

        <button
          type="button"
					className={`btn btn-primary pull-right ${isDisabled ? 'disabled' : ''}`}
					style={{margin: '10px 5px 0 0'}}
          onClick={this._handleClick.bind(this)}
        >
					Seguir
        </button>
      </div>
    );
  }
}

_Component.protoTypes = {
	handleBack: PropTypes.func,	//Modal feature: Close event
};

export default connect(state => state.nimble, {
  next,
  init,
  goToForm,
	setValue
})(_Component);
