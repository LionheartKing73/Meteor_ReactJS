import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm } from '../../../../../redux/modules/nimble';
import VeiculoDesejado from '../VeiculoDesejado';
import './style.scss';
const OfertaSchema = new SimpleSchema({});

const formatCurrency = function(value) {
	if(!value) return 0;
	return value.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:2});
};


class _Component extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quoteNum: this.props.quoteNum,	//Quotation Number
			currentContract: false,					//Cotação
			currentPacote: false,						//Cotação
			currentDiscount: false,
			currentCarCheaper: false,
			currentCarSuperior: false,
			currentCarDefault: false,
			currentCar: false,							//Cotação
			loading: false,
			modal: false,
			pacotes: [
				{ _id: 1, km_adicional: 10000, price: 350.00, classes: ['A','B','C','D','E','F','G','H'] }, 	//Pacote Compacto
				{ _id: 2, km_adicional: 20000, price: 900.00, classes: ['A','B','C','D','E','F','G','H'] }, 	//Pacote Compacto
				{ _id: 3, km_adicional: 30000, price: 1300.00, classes: ['A','B','C','D','E','F','G','H'] }, 	//Pacote Compacto
				{ _id: 4, km_adicional: 10000, price: 500.00, classes: ['I','J','K','L','R'] }, 							//Pacote Intermediario
				{ _id: 5, km_adicional: 20000, price: 1200.00, classes: ['I','J','K','L','R'] }, 			//Pacote Intermediario
				{ _id: 6, km_adicional: 30000, price: 2000.00, classes: ['I','J','K','L','R'] }, 			//Pacote Intermediario
				{ _id: 7, km_adicional: 10000, price: 500.00, classes: ['S','M','O'] }, 							//Pacote Luxo
				{ _id: 8, km_adicional: 20000, price: 1200.00, classes: ['S','M','O'] }, 							//Pacote Luxo
				{ _id: 9, km_adicional: 30000, price: 2000.00, classes: ['S','M','O'] }, 							//Pacote Luxo
			],
			franquias: [
				{ classe: 'A',  price: 2500.00 },
				{ classe: 'B',  price: 2500.00 },
				{ classe: 'C',  price: 2700.00 },
				{ classe: 'D',  price: 3000.00 },
				{ classe: 'E',  price: 3000.00 },
				{ classe: 'F',  price: 3000.00 },
				{ classe: 'G',  price: 3000.00 },
				{ classe: 'H',  price: 4000.00 },
				{ classe: 'J',  price: 4000.00 },
				{ classe: 'L',  price: 4000.00 },
				{ classe: 'I',  price: 3500.00 },
				{ classe: 'K',  price: 3500.00 },
				{ classe: 'R',  price: 4200.00 },
				{ classe: 'S',  price: 4500.00 },
				{ classe: 'M',  price: 4500.00 },
				{ classe: 'O',  price: 6000.00 }
			],
			paymentMethod: [
				{ parcelas: 24, label: '24x'},
				{ parcelas: 12, label: '12x'},
				{ parcelas: 1, label: 'à vista'},
			]
		};

		const mongoloidOptions = {
			self: this,
			mongoloidStateKey: 'ofertaFinal',
			schema: OfertaSchema,
			opType: 'nimble'
		};

		Mongoloid(mongoloidOptions);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.quoteNum) {
			this.setState({quoteNum: nextProps.quoteNum})
		}
		if(nextProps.values.veiculoDesejado)
			this._getCarList(nextProps.values.veiculoDesejado.veiculo)
	}

	componentWillMount() {
		const { veiculoDesejado } = this.props.values;
		if(veiculoDesejado && veiculoDesejado.veiculo)
			this._getCarList(veiculoDesejado.veiculo);
	}

	_handleBack() {
		this.props.goToForm({responses: [{goto: 'veiculoDesejado'}]}); //FIXME: Simplificar goToForm
	}

	_handleClick(e) {
		let errors = [];

		//Error messages
		if(!this.state.currentContract) {
			errors.push('O tempo de contrato é obrigatório');
		}
		else {
			if (this.state.currentContract.paymentMethod === false || this.state.currentContract.paymentMethod == undefined)
				errors.push('A quantidade de parcelas é obrigatória.');
		}

		//Show errors or submit
		if(errors.length) {
			swal('', errors.join('\n'), 'success');
		}
		else {
			this._handleSubmit(e)
		}
	}

	_handleClickContract(contract) {
		const currentContract = {
			...contract,
			paymentMethod: false //contract.parcelas //Default payment method (parcelado)
		};

		this.setState({
			currentContract
		});
	}

	_handleClickPayment(method) {
		const contract = this.state.currentContract;
		contract.paymentMethod = parseInt(method.parcelas);

		this.setState({
			currentContract: contract
		});
	}

	_handleChangePacotes(e) {
		const pacote = this.state.pacotes.find((p) => p._id == e.target.value);
		this.setState({
			currentPacote: (pacote || false)
		});
	}

	_handleClickDiscount() {
		this.setState({
			currentDiscount: !this.state.currentDiscount
		});
	}

	_handleClickCar(type) {
		let currentCar = this.state.currentCar;

		switch(type) {
			case 'cheaper':
				currentCar = this.state.currentCarCheaper;
				break;
			case 'default':
				currentCar = this.state.currentCarDefault;
				break;
			case 'superior':
				currentCar = this.state.currentCarSuperior;
				break;
		}

		const currentContract = currentCar.contratos[0] || false;
		//currentContract.paymentMethod = currentContract.parcelas || 0;

		this.setState({
			currentCar,
			currentContract: false,
			currentPacote: false
		});
	}

	_handleClickModal() {
		this.setState({modal: !this.state.modal})
	}

	_getCarList(veiculo) {
		const { currentCar, modal } = this.state;

		if(veiculo) {
			if (!currentCar || currentCar._id != veiculo) {
				this.setState({loading: true, modal: false});

				Meteor.call('carros.getOffer', veiculo, (err, res) => {
					if (err) {
						console.log(err);
						return this.setState({loading: false});
					}
					if (res) {
						// const currentContract = {
						// 	...res.current.contratos[0],
						// 	paymentMethod: res.current.contratos[0].parcelas
						// };

						this.setState({
							loading: false,

							currentContract: false,
							currentCar: res.current,

							currentCarDefault: res.current,
							currentCarCheaper: res.inferior || false,
							currentCarSuperior: res.superior || false
						});
					}
				})
			}
			else {
				if(modal)
					this.setState({modal: false});
			}
		}
	}

	_getDetailIcon(type) {
		switch(type) {
			case 'motor':
				return <img src="/icones/oferta/icon6.png"/>;
				break;
			case 'potencia':
				return <img src="/icones/oferta/icon2.png"/>;
				break;
			case 'cambio':
				return <img src="/icones/oferta/icon4.png"/>;
				break;
			case 'combustivel':
				return <img src="/icones/oferta/icon1.png"/>;
				break;
			case 'consumo':
				return <img src="/icones/oferta/icon3.png"/>;
				break;
			case 'direcao':
				return <img src="/icones/oferta/icon5.png"/>;
				break;
				return '';
				break;
		}
	}

	_renderModal() {
		const { modal } = this.state;
		return (
			<div className={`modal fade ${modal && 'in'}`}
					 style={{display: (modal ? 'block' : '')}}
					 tabIndex="-1" role="dialog">
				<div className="modal-dialog"
						 role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button"
											className="close"
											onClick={this._handleClickModal.bind(this)}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Escolha um veículo</h4>
						</div>
						<div className="modal-body">
							{modal &&
							<VeiculoDesejado modal alignCenter handleBack={this._handleClickModal.bind(this)}/>}
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const {
			currentCar,
			currentContract,
			currentPacote,
			currentDiscount,
			currentCarCheaper,
			currentCarDefault,
			currentCarSuperior,
			pacotes,
			franquias,
			paymentMethod,
			loading,
			quoteNum
		} = this.state;

		if(!loading && !currentCar)
			return (
				<div className="OfertaFinal__container card oferta text-center">
					<p className="text-danger">Veículo não pode estar vazio.</p>
					<button onClick={this._handleBack.bind(this)}
									type="button"
									className="btn btn-danger">
						<i className="fa fa-car" aria-hidden="true"/> Escolher veículo
					</button>
				</div>
			);

		const filteredPacotes = pacotes.filter((a) => _.contains(a.classes, currentCar.classe));
		const filteredFranquia = franquias.find((f) => f.classe == currentCar.classe);

		const _haveDeal = (car) => car.contratos && car.contratos.filter((c) => c.price_deal).length > 0;

		const _discountPrice = (total) => (total * 0.1 > 150) ? (total - 150) : (total * 0.9); //10% discount limitado a 150 reais
		const _totalPrice = ((currentPacote.price || 0) + (currentContract.price || 0));
		const _totalByPaymentMethod = (price = false) => {
			if(currentContract.paymentMethod == 1) {
				return currentContract.parcelas * (price || _totalPrice);
			}
			else {
				return (price || _totalPrice);
			}
		};

		return (
			<div className={`OfertaFinal__container card oferta ${loading && 'loading'}`}>
				<p className="numero-cotacao">
					<span>Nº Cotação:</span> {quoteNum}
				</p>

				<ol className="carousel-indicators">
					<li onClick={this._handleClickCar.bind(this, 'cheaper')}
							className={`${(currentCar._id == currentCarCheaper._id) && 'active'} ${!currentCarCheaper && 'hidden'}`}>
						{_haveDeal(currentCarCheaper) &&
						<div className="badge-oferta">
							<i className="fa fa-usd"  aria-hidden="true"/>
						</div>}
						{currentCarCheaper.marca}
					</li>

					<li onClick={this._handleClickCar.bind(this, 'default')}
							className={((currentCar._id == currentCarDefault._id) && 'active')}>
						{_haveDeal(currentCarDefault) &&
						<div className="badge-oferta" title="Oferta">
							<i className="fa fa-usd"  aria-hidden="true"/>
						</div>}
						{currentCarDefault.marca}
					</li>

					<li onClick={this._handleClickCar.bind(this, 'superior')}
							className={`${(currentCar._id == currentCarSuperior._id) && 'active'} ${!currentCarSuperior && 'hidden'}`}>
						{_haveDeal(currentCarSuperior) &&
						<div className="badge-oferta" title="Oferta">
							<i className="fa fa-usd"  aria-hidden="true"/>
						</div>}
						{currentCarSuperior.marca}
					</li>
				</ol>

				{/* Wrapper for slides */}
				<div className="carousel-inner col-md-12">
					<div className="item textao active">
						<div className="col-md-8">
							<button onClick={this._handleClickModal.bind(this)}
											type="button"
											className="btn-esc-car btn btn-default">
								<i className="fa fa-exchange" aria-hidden="true"/> Alterar veiculo
							</button>
							<div className="detalhes-oferta">
								<img src={currentCar.imgPath}
										 className="img-responsive"/>
								<div>
									<h2>{currentCar.marca}</h2>
									<span>{currentCar.name}</span><br/>
									{filteredFranquia &&
									<span><b>Franquia de {formatCurrency(filteredFranquia.price)}</b></span>
									}
								</div>
							</div>
							<hr/>
							<div className="itens-serie col-md-12">
								{currentCar.details && currentCar.details.map((d, k) =>
									<div className="col-md-4" key={k}>
										{this._getDetailIcon(d.type)}
										<p className="title__p--titulo">{d.label}:</p>
										<p className="title__p--subtitulo">{d.value}</p>
									</div>
								)}
							</div>
						</div>

						<div className="col-md-4 valor">
							{currentCar.contratos ?
								<form>
									<fieldset className="form-group">
										<div className="contratos">
											<div>
												<legend style={{marginTop: 0}}>
													<h2>Duração do contrato</h2>
												</legend>
												{currentCar.contratos.map((c, key) => {
														const isSelected = currentContract && currentContract.km_base == c.km_base;
														const isDeal = (currentContract.price_deal);
														return (
															<div
																className={`option ${isSelected && 'selected'} ${isDeal && 'deal'}`}
																key={key}
																onClick={this._handleClickContract.bind(this, c)}>
																<div
																	type="button"
																	className={`btn btn__check`}>
																	{c.parcelas / 12} {(c.parcelas / 12 > 1 ? "anos" : "ano")}
																</div>
															</div>
														);
													}
												)}
											</div>

											{currentContract &&
											<div>
												<legend>
													<h2>Quantidade de Parcelas</h2>
												</legend>
												{paymentMethod.map((p, key) => {
														if (p.parcelas == 1 || p.parcelas == currentContract.parcelas) //a vista or currentcontract parcelas
															return (
																<div
																	className={`option ${(currentContract.paymentMethod == p.parcelas) && 'selected'}`}
																	key={key}
																	onClick={this._handleClickPayment.bind(this, p)}>
																	<div
																		type="button"
																		className={`btn btn__check`}>
																		{p.label}
																	</div>
																</div>
															);
													}
												)}
											</div>
											}

											{(currentContract && currentContract.paymentMethod) &&
											<div className="precos">
												{currentContract.price_deal &&
												<div className="form-check">
													<label className="form-check-label">
														<p style={{textDecoration: 'line-through'}}>
															<span className="label--smn">DE: </span>
															<span className="label--mdn">{currentContract.parcelas}x </span>
															<span className="label--smn">de </span>
															<span className="label--mdn">{formatCurrency(currentContract.price_deal)}</span>
														</p>
													</label>
												</div>
												}

												<div className="form-check">
													<label className="form-check-label">
														<p>
															{currentContract.price_deal &&
															<span className="label-price">PARA: </span>
															}
															<span className="label-price">{currentContract.paymentMethod}x de </span>
															<span className="label-price">
															{formatCurrency(_totalByPaymentMethod(currentContract.price))}
														</span>
														</p>
													</label>
												</div>
											</div>
											}
										</div>

										{currentContract.paymentMethod &&
										<div>
											<p className="fow">KM Adicional</p>
											<select
												className="soflow"
												onChange={this._handleChangePacotes.bind(this)}
												disabled={(!currentContract)}>
												<option>Selecione uma opção</option>
												{currentContract && filteredPacotes.map((p, key) =>
													<option key={key}
																	value={p._id}>
														{p.km_adicional} KM (+ {formatCurrency(_totalByPaymentMethod(p.price))}
														{(currentContract.paymentMethod > 1) && ' na parcela'})
													</option>
												)}
											</select>
										</div>
										}

										{currentContract.paymentMethod &&
										<div className="cartao">
											<h2>Cartão porto seguro</h2>
											<img src="/img/cards.png" className="imf img pull-right"/>
											<label>
												<input
													type="checkbox"
													style={{float: 'left'}}
													checked={(this.state.currentDiscount)}
													onClick={this._handleClickDiscount.bind(this)}/>
												<span style={{fontDize: '18px', marginLeft: '5px', marginRight: '5px'}}>
														10%
													</span> de desconto
											</label>
											<br/>
											<p className="nor">(Desconto na 1° parcela, Limitado a R$ 150,00)</p>
										</div>
										}

										{_totalPrice && currentContract.paymentMethod ?
											<div className="preco-tt">
												<p>
													<span className="label--smb-bold">TOTAL: </span>

													{(currentContract.paymentMethod > 1 && currentDiscount) &&
													<span className="label--mdb-bold">
													{formatCurrency(_discountPrice(_totalPrice))} +&nbsp;
												</span>
													}


													<span className="label--mdb-bold">
													{currentDiscount
														? ((currentContract.paymentMethod - 1) || currentContract.paymentMethod)
														: currentContract.paymentMethod
													}
														x de&nbsp;
												</span>


													{(currentContract.paymentMethod == 1 && currentDiscount) ?
														<span className="label--mdb-bold">
														{formatCurrency(_discountPrice(_totalByPaymentMethod()))}
													</span>
														:
														<span className="label--mdb-bold">
														{formatCurrency(_totalByPaymentMethod())}
													</span>
													}
												</p>
											</div>
											:
											<div className={`preco-tt`}>
												<p style={{fontSize:'14px',margin:0,fontWeight:'bold'}}>Selecione um contrato e parcelamento</p>
											</div>
										}
									</fieldset>
								</form>
								:
								<div className={`contratos`}>
									<h1>Contrato indisponível.</h1>
								</div>
							}
						</div>
					</div>
				</div>
				<div className="col-md-12">
					<button
						type="button"
						className="proposta btn btn-primary pull-right"
						onClick={this._handleClick.bind(this)}>
						Vamos em frente ?
					</button>
				</div>
				{this._renderModal()}
			</div>
		)
	}
}

export default connect(state => state.nimble, {next, goToForm})(_Component);
