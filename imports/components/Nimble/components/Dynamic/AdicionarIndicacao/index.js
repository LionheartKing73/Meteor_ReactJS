import React, {Component} from "react";
import {connect} from "react-redux";
import {next, replace} from "../../../../../redux/modules/nimble";
import "./style.scss";
import Form from "./Form";

const {Select} = Mongoloid.Components;

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
	uf: {
		type: String,
		regEx: /[A-Z]{2}/,
		label: 'UF',
	},
});


const Schema = new SimpleSchema({});

class _Component extends Component {

	constructor(props) {
		super(props);

		const mongoloidOptions = {
			self: this,
			mongoloidStateKey: 'AdicionarIndicacao',
			schema: Schema,
			opType: 'nimble',
		};

		Mongoloid(mongoloidOptions);

		// this.handleChangeCEP = this.handleChangeCEP.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleAdd() {
		//TODO: Adicionar multiplos
	}

	render() {
		return (
			<div className="adicionar-condutores-wrapper">
				<div className="row card condutores-card">

					<div id="form111"
						 className="nimble-acel col-sm-3 col-md-3 animate-transition-2 adicionar-indicacao-btn-col">
						<div className="tile purple">
							<div className="icons">
								<img id="form381-img" src="/icones/usuario/usuario_condutor_add_b_480.png"
									 className="img-card"/>
								<span className="span-t span-b">Adicionar Indicações</span>
							</div>
						</div>
					</div>

					<Form />

				</div>
			</div>
		);
	}
}

const ContainedComponent = GLOBAL.createContainer(props => props, _Component);

export default connect(state => state.nimble, {next, replace})(ContainedComponent);
