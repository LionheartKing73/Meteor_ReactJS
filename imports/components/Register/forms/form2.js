import React, { Component } from 'react';
import { Link, DefaultRoute } from 'react-router';

class Form2 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      step: 2,
    };
    this._getField = this._getField.bind(this);
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form2',
      method: 'users.update',
      schema: Schemas.Users,
      opType: 'update',
    };
    this.hideMethodMessages = true;
    Mongoloid(mongoloidOptions);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user) {
      this.state.user = { ...(this.state.user || {}), ...nextProps.user };
    }
    if (nextState.methodResult) {
      this.props.router.replace('/register/3');
      return false;
    }
    return true;
  }
  
  prepareData(data) {
    return data;
  }
  
  _getField(field) {
    const state = this.state;
    const profile = this.props.user.profile || {};
    const lastField = _.last(field.split('.'));
    return (typeof state[field] !== 'undefined') ? state[field] : profile[lastField] || state[lastField];
  }

  render() {
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
    const profile = this.props.user.profile || {};
    let classPessoa = 'row';
    if (profile.tipoPessoa == 'pj') {
      classPessoa = 'row';
    } else {
      classPessoa = 'row pf';
    }
    return (
      <div className="step2 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }} />
            <div>
              <span>Etapa 2/5</span>
              <h1 className="cadastro-titulo">Dados profissionais</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <div className="formulario">
                  <p></p>
                  <p></p>
                  <div className={classPessoa}>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" name="profile.razaoSocial" className="large"
                               onChange={this._handleChange}
                               value={this._getField('profile.razaoSocial')}/>
                        <label className="label cadastro-label">Razão Social da Corretoria:</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" name="profile.CNPJ" className="cnpj large"
                               onChange={this._handleChange}
                               value={this._getField('profile.CNPJ')}/>
                        <label className="label cadastro-label">CNPJ:</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" name="profile.SUSEP" className="large"
                               onChange={this._handleChange}
                               value={this._getField('profile.SUSEP')}/>
                        <label className="label cadastro-label">SUSEP:</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input type="text" name="profile.susepinha" className="large"
                               onChange={this._handleChange}
                               value={this._getField('profile.susepinha')}/>
                        <label className="label cadastro-label">Susepinha:</label>
                      </div>
                    </div>
                  </div>
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <Link id="footer" className="pull-left" to="/register/1">
                        <button type="button" className="pull-left btn-md-lg">
													Voltar
												</button>
                      </Link>
                      <button type="button" className="pull-right btn-md-lg principal"
                              onClick={this._handleSubmit}>
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
}, Form2);
