import React from "react";

const { Date, Select } = Mongoloid.Components;

class Form1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
    this._getField = this._getField.bind(this);
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form1',
      method: 'users.update',
      schema: Schemas.Users,
      opType: 'update',
    };
    this.hideMethodMessages = true;
    Mongoloid(mongoloidOptions);
  }
  
  prepareData(data) {
    return data;
  }
  
  _getField(field) {
    const state = this.state;
    const profile = this.props.user.profile || {};
    if (field == 'emails.$.address') {
      const propsEmail = ((this.props.user.emails || [])[0] || {}).address;
      const stateEmail = state[field];
      return (typeof stateEmail !== 'undefined') ? stateEmail : propsEmail;
    }
    const lastField = _.last(field.split('.'));
    return (typeof state[field] !== 'undefined') ? state[field] : profile[lastField] || state[lastField];
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user) {
      this.state.user = { ...(this.state.user || {}), ...nextProps.user };
    }
    if (nextState.methodResult) {
      this.props.router.replace('/register/2');
      return false;
    }
    return true;
  }
  
  render() {
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
    //const gender = this.props.facebookProfile.gender;
    //const { gender: stateGender } = this.state;
    return (
      <div className="step1 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }}/>
            <div>
              <span>Etapa 1/5</span>
              <h1 className="cadastro-titulo">Dados pessoais</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <p></p>
                <p></p>
                <div className="formulario label-cadastro">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label">Nome e Sobrenome:</label>
                          <input type="text" name="profile.name" className="large"
                                 onChange={this._handleChange}
                                 value={this._getField('profile.name')}/>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label"> Como quer ser chamado (apelido)</label>
                          <input type="text" className="large"
                                 name="profile.apelido"
                                 onChange={this._handleChange}
                                 value={this._getField('profile.apelido')}/>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="input-group">
                        <label className="label cadastro-label" htmlFor="pass">CPF:</label>
                        <input type="text" className="cpf large"
                               name="profile.CPF"
                               onChange={this._handleChange}
                               value={this._getField('profile.CPF')}/>
                      </label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <label className="label cadastro-label" htmlFor="pass">Sexo</label>
                        <Select self={this}
                                name="profile.sexo"
                                options={[
                                  // {value: "", label: 'Sexo'},
                                  { value: 'm', label: 'Masculino' },
                                  { value: 'f', label: 'Feminino' },
                                ]}
                                value={this._getField('profile.sexo')}/>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <label className="label cadastro-label" htmlFor="pass">Estado Civil</label>
                        <Select self={this}
                                name="profile.estadoCivil"
                                options={[
                                  // {value: "", label: 'Estado Civil'},
                                  { value: 'solteiro', label: 'Solteiro' },
                                  { value: 'casado', label: 'Casado' },
                                  { value: 'divorciado', label: 'Divorciado' },
                                ]}
                                value={this._getField('profile.estadoCivil')}/>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label" htmlFor="pass">Data de Nascimento</label>
                          <Date name="profile.nascimento" value={this._getField('profile.nascimento')} self={this} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label" htmlFor="pass">Telefone</label>
                          <input type="text" className="phone large"
                                 name="profile.telefone"
                                 onChange={this._handleChange}
                                 value={this._getField('profile.telefone')}/>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label">Celular</label>
                          <input type="text" className="phone cell large"
                                 name="profile.celular"
                                 onChange={this._handleChange}
                                 value={this._getField('profile.celular')}/>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <label>
                          <label className="label cadastro-label" htmlFor="pass">Email</label>
                          <input type="email" className="email large"
                                 name="emails.$.address"
                                 onChange={this._handleChange}
                                 value={this._getField('emails.$.address')}/>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* --------------------------------------------------------- */}
                  {/* TODO: nao exibir se PF */}
                  {/* --------------------------------------------------------- */}
                  {/* <div className="row">*/}
                  {/* <div className="col-md-3">*/}
                  {/* <div className="input-group">*/}
                  {/* <label>*/}
                  {/* <label htmlFor="pass">Razão Social</label>*/}
                  {/* <input type="text" className="large"*/}
                  {/* name="profile.razaoSocial"*/}
                  {/* onChange={this._handleChange}*/}
                  {/* value={this._getField('profile.razaoSocial')}/>*/}
                  {/* </label>*/}
                  {/* </div>*/}
                  {/* </div>*/}
                  {/**/}
                  {/**/}
                  {/**/}
                  {/* <div className="col-md-3">*/}
                  {/* <div className="input-group">*/}
                  {/* <label>*/}
                  {/* <label className="label">CNPJ</label>*/}
                  {/* <input type="text" className="cnpj cell large"*/}
                  {/* name="profile.CNPJ"*/}
                  {/* onChange={this._handleChange}*/}
                  {/* value={this._getField('profile.CNPJ')}/>*/}
                  {/* </label>*/}
                  {/* </div>*/}
                  {/* </div>*/}
                  {/* </div>*/}
                  {/* --------------------------------------------------------- */}
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <button type="button"
                              className="pull-right btn-md-lg principal"
                              onClick={ev => this._handleSubmit()}>
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

export default GLOBAL.createContainer((props) => {
  const subUser = GlobalSubsManager('user.selfProfile');
  return {
    user: Meteor.user() || {},
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready(),
  };
}, Form1);
