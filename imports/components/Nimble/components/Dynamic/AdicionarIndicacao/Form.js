import React, { Component } from "react";
import { connect } from "react-redux";
import { next, replace, setValue } from "../../../../../redux/modules/nimble";
import cep from "cep-promise";
import schemaValidateSpecialCharacters from "../../../../../../lib/__core/helpers/schemaValidateSpecialCharacters";
import DatePicker from "react-bootstrap-date-picker";
import Select from "react-select";
import { updateAndCheck, getValidationErrors } from './helpers';

const Schema = new SimpleSchema({
  name: {
    type: String,
    min: 2,
    max: 150,
    custom: schemaValidateSpecialCharacters,
    label: "Nome",
    optional: true,
  },

  agendar: {  // TODO: validate  Date
    type: String,
    optional: true,
  },

  produto: {
    type: String,
    optional: true,
  },

  possuiVeiculos: {
    type: String,
    optional: true,
  },

  quantidaDeVeiculos: {
    type: String,
    label: "Quantidade de Carros",
    optional: true,
    custom: function () {
      const possuiVeiculos = this.field('possuiVeiculos').value;
      if (possuiVeiculos === 'sim' && !this.value) return 'required';
    }
  },

  temFilhos: {
    type: String,
    optional: true,
  },

  quantidaDeFilhos: {
    type: String,
    label: "Quantidade de Filhos",
    optional: true,
    custom: function () {
      const possuiFilhos = this.field('quantidaDeFilhos').value;
      if (possuiFilhos === 'sim' && !this.value) return 'required';
    }
  },

  estadoCivil: {
    type: String,
    optional: true,
  },

  RG: {
    type: String,
    optional: true,
    custom: schemaValidateSpecialCharacters,
  },

  logradouro: {
    type: String,
    min: 2,
    max: 200,
    optional: true,
  },

  numero: {
    type: String,
    min: 1,
    max: 10,
    optional: true,
  },

  phone: {
    type: String,
    regEx: Regex.telefone,
    optional: true,
  },

  CEP: {
    type: Regex.CEP,
    optional: true,
  },

  complemento: {
    type: String,
    min: 1,
    max: 200,
    optional: true,
    custom: schemaValidateSpecialCharacters,
  },

  bairro: {
    type: String,
    max: 200,
    optional: true,
    custom: schemaValidateSpecialCharacters,
  },

  cidade: {
    type: String,
    max: 200,
    optional: true
  },

  UF: {
    type: String,
    regEx: /[A-Z]{2}/,
    optional: true,
  },

  empresa: {
    type: String,
    optional: true,
  },

  profissao: {
    type: String,
    min: 1,
    max: 200,
    optional: true,
    custom: schemaValidateSpecialCharacters,
  },

  telefoneComercial: {
    type: String,
    regEx: Regex.telefone,
    optional: true,
    label: "Telefone",
  },

  telefoneResidencial: {
    type: String,
    optional: true,
    label: "Telefone",
  },

  ramal: {
    type: String,
    optional: true,
  },

  timeDeFutebol: {
    type: String,
    max: 100,
    optional: true,
    custom: schemaValidateSpecialCharacters,
  },

  anotacoes: {
    type: String,
    max: 1000,
    optional: true
  },

  celular: {
    type: String,
    regEx: Regex.celular,
    optional: true,
  },
  leads: {
    type: Array,
    optional: true
  },
  'leads.$': {
    type: Object,
    blackbox: true
  }
});

class AdicionarIndicacaoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leads: [],
    };

    this.handleChangeCEP = this.handleChangeCEP.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkout = this.checkout.bind(this);
  }


  handleChange(event) {
    const { name, value } = event.target;
    if (value) updateAndCheck(name, value, Schema, event.target);
    this.setState({ [name]: value });
  }


  handleChangeCEP(event) {
    const cepValue = event.target.value;
    if (Regex.CEP.test(cepValue) == true) {
      cep(cepValue).then((address) => {
        if (address.cep) {
          this.setState({
            "UF": address.state,
            "cidade": address.city,
            "logradouro": address.street,
            "bairro": address.neighborhood
          });
        }
      });
    }
  }

  handleAdd() {
    let data = { ...this.state };
    delete data.leads;
    const errors = getValidationErrors(data, Schema);

    if (errors.length) return errors.map(e => Alert.error(e, { effect: 'genie' }));

    const emptyInputsState = Object.keys(data).reduce((prev, next) => {
      return { ...prev, [next]: '' }
    }, {});

    this.setState({
      ...emptyInputsState,
      leads: this.state.leads.concat([data])
    });
  }

  checkout() {
    this.props.setValue(
      this.props.steps.find(s => s.id === this.props.currentStepID),
      'adicionarIndicacao',
      this.state.leads,
      () => this.props.replace('checkout')
    );
  }

  render() {
    const {
      name,
      timeDeFutebol,
      telefone,
      estadoCivil,
      bairro,
      profissao,
      produto,
      agendar,
      CEP,
      logradouro,
      numero,
      complemento,
      cidade,
      UF,
      possuiVeiculos,
      quantidaDeVeiculos = 1,
      temFilhos,
      quantidaDeFilhos = 1,
      anotacoes
    } = this.state;

    console.log(this.state);

    return (
      <div className="nimble-acel col-sm-3 col-md-7 nova-indicacao-form-wr">
        <div id="tile4" className="tile carros purple">
          <div className="form-group col-md-12">
            <img className="icon-p"
                 src="/icones/usuario/noun_574395_cc_03_b.png"/><p>Indicações do
            cliente</p>

            <label className="col-md-6">
              <span>Nome:</span>

              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}/>
            </label>

            <label className="col-md-6">
              <span>Telefone:</span>

              <input className="phone"
                     type="text"
                     name="telefoneResidencial"
                     onChange={this.handleChange}
                     value={telefone}
              />
            </label>

            <label className="col-md-6">
              <span>Profissão:</span>

              <input
                type="text"
                name="profissao"
                onChange={this.handleChange}
                value={profissao}
              />
            </label>

            <label className="col-md-6">
              <span>Estado Civil:</span>

              <Select
                name="estadoCivil"
                options={[
                  { value: 'casado', label: 'Casado' },
                  { value: 'Divorciado', label: 'Divorciado' },
                  { value: 'separado', label: 'Separado' },
                  { value: 'solteiro', label: 'Solteiro' },
                  { value: 'uniaoEstavel', label: 'União Estável' },
                  { value: 'viuvo', label: 'Viúvo' },
                ]}
                onChange={({value}) => this.setState({estadoCivil: value})}
                value={estadoCivil}
              />
            </label>

            <label className="col-md-6">
              <span>Tem Filhos:</span>

              <label className="radio-inline control-label">
                <input
                  type="radio"
                  name="temFilhos"
                  value="sim"
                  onChange={this.handleChange}
                  checked={temFilhos == 'sim'}
                />
                Sim
              </label>

              <label className="radio-inline control-label">
                <input
                  type="radio"
                  name="temFilhos"
                  value="nao"
                  onChange={this.handleChange}
                  checked={temFilhos == 'nao'}
                />
                Não
              </label>

              <label
                className="quantidade-select-wrapper-label qtdn-v select-label-wrapper">
                {
                  (temFilhos !== 'sim') ? null : (
                    <Select
                      name="quantidaDeFilhos"
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4 ou mais' },
                      ]}
                      onChange={({value}) => this.setState({quantidaDeFilhos: value})}
                      value={quantidaDeFilhos}
                      searchable={false}
                      placeholder="0"
                    />
                  )
                }
              </label>
            </label>


            <label className="col-md-6">
              <span>Possui Veículos:</span>

              <label className="radio-inline control-label">
                <input
                  type="radio"
                  name="possuiVeiculos"
                  defaultValue="sim"
                  onChange={this.handleChange}
                  checked={possuiVeiculos == 'sim'}
                />
                Sim
              </label>

              <label className="radio-inline control-label">
                <input
                  type="radio"
                  name="possuiVeiculos"
                  defaultValue="nao"
                  onChange={this.handleChange}
                  checked={possuiVeiculos == 'nao'}
                />
                Não
              </label>

              {
                (possuiVeiculos !== 'sim') ? null : (
                  <label
                    className="quantidade-select-wrapper-label qtdn-v select-label-wrapper">
                    <Select
                      searchable={false}
                      self={this}
                      name="quantidaDeVeiculos"
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4 ou mais' },
                      ]}
                      onChange={({value}) => this.setState({quantidaDeVeiculos: value})}
                      value={quantidaDeVeiculos}
                      placeholder="0"
                    />
                  </label>
                )
              }
            </label>


            <label className="col-md-6">
              <span>Time de futebol:</span>

              <input
                type="text"
                name="timeDeFutebol"
                onChange={this.handleChange}
                value={timeDeFutebol}
              />
            </label>

            <div className="address-wrapper">
              <div
                className={"Address address-wrapper " + this.props.className}>
                <label className="col-md-6 numero label-wrapper">
                  <span>CEP:</span>

                  <input
                    className="cep"
                    type="text"
                    name="CEP"
                    onChange={this.handleChangeCEP}
                    value={CEP}
                  />
                </label>

                <label className="col-md-8 numero label-wrapper">
                  <span>Logradouro:</span>

                  <input
                    value={logradouro}
                    type="text"
                    name="logradouro"
                    onChange={this.handleChange}
                  />
                </label>


                <label className="col-md-2 numero label-wrapper">
                  <span>Número:</span>

                  <input
                    type="text"
                    name="numero"
                    onChange={this.handleChange}
                    value={numero}
                  />
                </label>

                <label className="col-md-2 complemento label-wrapper">
                  <span>Compl:</span>
                  <input
                    type="text"
                    name="complemento"
                    onChange={this.handleChange}
                    value={complemento}
                  />
                </label>

                <label className="col-md-4 bairro label-wrapper">
                  <span>Bairro:</span>

                  <input
                    type="text"
                    name="bairro"
                    onChange={this.handleChange}
                    value={bairro}
                  />
                </label>

                <label className="col-md-4 cidade label-wrapper">
                  <span>Cidade:</span>

                  <input
                    type="text"
                    name="cidade"
                    onChange={this.handleChange}
                    value={cidade}
                  />
                </label>

                <label className="col-md-4 UF label-wrapper">
                  <span>Estado/UF:</span>

                  <Select
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
                    onChange={({value}) => this.setState({UF: value})}
                  />
                </label>
              </div>
            </div>

            <label className="col-md-12">
              <span>Anotações:</span>

              <textarea
                name="anotacoes"
                value={anotacoes}
                className="col-md-12 anot-ind"
                onChange={this.handleChange}
              />
            </label>

            <label className="col-md-6">
              <span >Agendar:</span>

              <DatePicker
                showClearButton={false}
                previousButtonElement=""
                nextButtonElement=""
                dateFormat="DD/MM/YYYY"
                dayLabels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                monthLabels={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                value={agendar}
                onChange={isoDate => {
                  this.setState({ agendar: isoDate })
                }}
              />
            </label>

            <label className="col-md-6">
              <span>Produto:</span>

              <Select
                name="produto"
                options={[
                  { value: 'auto', label: 'Auto' },
                  { value: 'carroFacil', label: 'Carro Fácil' },
                  { value: 'alarme', label: 'Alarme' },
                ]}
                onChange={({value}) => this.setState({produto: value})}
                value={produto}
              />
            </label>

            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary pull-left"
                style={{ background: '#525252', border: 'none' }}
                onClick={ () => {
                  this.props.replace("checkout");
                }}
              >
                Ignorar
              </button>

              <button type="button" className="btn btn-primary pull-right"
                      onClick={this.handleAdd}>
                Adicionar
              </button>
            </div>

            <div id='handle-end-button-wr' className="handle-end-button-wr">
              <div id="seguir4" className="col-sm-2">
                <button id="tileSeguir4" className="tile green"
                        onClick={this.checkout}>
                  <div className="icons">
                    <img src="/icones/usuario/checked.png"
                         className="img-card"/>

                    <span className="span-t span-b">
                      Vamos em frente ?
                    </span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state.nimble, {
  next,
  replace,
  setValue
})(AdicionarIndicacaoForm);
