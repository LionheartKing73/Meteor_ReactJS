import React, { Component } from 'react';
import { Link, DefaultRoute } from 'react-router';
import cep from 'cep-promise';

const { Select } = Mongoloid.Components;

class Form3 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      step: 3,
    };
    this.handleChangeCEP = this.handleChangeCEP.bind(this);
    this.getField = this.getField.bind(this);
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form3',
      method: 'users.update',
      schema: Schemas.Users,
      opType: 'update',
    };
    this.hideMethodMessages = true;
    Mongoloid(mongoloidOptions);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user) {
      this.state.user = {
        ...(this.state.user || {}),
        ...nextProps.user
      };
    }
    if (nextState.methodResult) {
      this.props.router.replace('/register/4');
      return false;
    }
    return true;
  }
  
  prepareData(data) {
    //console.log("Form3->prepareData(): ", data);
    return data;
  }
  
  handleChangeCEP(event) {
    const cepValue = event.target.value;
    if (Regex.CEP.test(cepValue) == true) {
      cep(cepValue).then((address) => {
        //console.log("CEP: ", address);
        if (address.cep) {
          this._setMongoloidValue({"address.UF": address.state}, event.target);
          this._setMongoloidValue({"address.cidade": address.city}, event.target);
          this._setMongoloidValue({"address.logradouro": address.street}, event.target);
          this._setMongoloidValue({"address.bairro": address.neighborhood}, event.target);
        }
      });
    }
    this._handleChange(event, "address.CEP");
  }
  
  getField(field) {
    const state = this.state;
    const address = (this.props.user.profile || {}).address || {};
    const lastField = _.last(field.split('.'));
    return (state[field]) ? state[field] : address[field] || address[lastField] || state[lastField];
  }
  
  render() {
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
    return (
      <div className="step3 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }} />
            <div>
              <span>Etapa 3/5</span>
              <h1 className="cadastro-titulo">Dados de localização</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <div className="formulario">
                  <p></p>
                  <p></p>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="address.CEP" className="cep small"
                               onChange={this.handleChangeCEP}
                               value={this.getField('address.CEP')}/>
                        <label className="label cadastro-label" >CEP:</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" id="end" name="address.logradouro" className="logradouro large "
                               onChange={this._handleChange}
                               value={this.getField('address.logradouro')}/>
                        <label className="label cadastro-label" >Endereço Residencial:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="address.numero"
                               onChange={this._handleChange}
                               value={this.getField('address.numero')}/>
                        <label className="label cadastro-label" >Número:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="address.complemento"
                               onChange={this._handleChange}
                               value={this.getField('address.complemento')}/>
                        <label className="label cadastro-label" >Complemento:</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="address.bairro"
                               onChange={this._handleChange}
                               value={this.getField('address.bairro')}/>
                        <label className="label cadastro-label" >Bairro:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" id="cidade" name="address.cidade"
                               onChange={this._handleChange}
                               value={this.getField('address.cidade')}/>
                        <label className="label cadastro-label" >Cidade:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="input-group">
                        <label className="label cadastro-label" htmlFor="pass">Estado</label>
                        <Select self={this}
                                name="address.UF"
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
                                value={this.getField('address.UF')}/>
                      </label>
                    </div>
                  </div>
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <Link id="footer" className="pull-left" to="/register/2">
                        <button type="button" className="pull-left btn-md-lg">
                          Voltar
                        </button>
                      </Link>
                      <button type="button" className="pull-right btn-md-lg principal" onClick={this._handleSubmit}>
                        Continuar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer(() => {
  const subUser = GlobalSubsManager('user.selfProfile');
  return {
    user: Meteor.user() || {},
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready(),
  };
}, Form3);
