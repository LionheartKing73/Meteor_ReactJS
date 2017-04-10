import React, { Component } from 'react';

class _Component extends Component {
  constructor(props) {
    super(props);

    this.state = { disabled: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form',
      method: 'admin.createUser',
      schema: Schemas.Users,
      opType: 'insert',
      schemas: {
        'emails.address': {
          schema: Schemas.Email,
          prepareData: data => data.emails,
        },
      },
    };

    Mongoloid(mongoloidOptions);
  }


  render() {
    const state = this.state;

    return (
      <div
        className="nimble-acel col-sm-2 col-md-5 active animate-transition-2"
      >
        <div className="tile purple">
          <div className="form-group col-md-12">

            <p style={{ textAlign: 'justify' }}>
              Cadastrar Novo Corretor
            </p>


            <div className="col-md-12">
              <label className="col-md-12">
                <span>Nome</span>
                <input
                  type="text"
                  name="profile.name"
                  value={state['profile.name']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>

            <div className="col-md-12">
              <label className="col-md-12">
                <span>E-Mail</span>
                <input
                  type="email"
                  name="emails.$.address"
                  value={state['emails.$.address']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>

            <div className="col-md-12">
              <label className="col-md-12">
                <span>CPF</span>
                <input
                  type="text"
                  className="cpf"
                  name="profile.CPF"
                  value={state['profile.CPF']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>

            <div className="col-md-12">
              <label className="col-md-12">
                <span>Telefone</span>
                <input
                  type="text"
                  className="phone"
                  name="profile.telefone"
                  value={state['profile.telefone']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>

            <div className="col-md-12">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="profile.tipoPessoa"
                  value="pf"
                  onChange={this._handleChange}
                />
                Pessoa Física
              </label>
              <br />

              <label className="radio-inline">
                <input
                  type="radio"
                  name="profile.tipoPessoa"
                  value="pj"
                  onChange={this._handleChange}
                />
                Pessoa Jurídica
              </label>
              <br />
            </div>


            <div className="col-md-12">

              <label className="col-md-12">
                <span>Razão Social</span>
                <input
                  type="text"
                  name="profile.razaoSocial"
                  value={state['profile.razaoSocial']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                  disabled={this.state.disabled}
                />
              </label>

              <label className="col-md-12">
                <span>CNPJ</span>
                <input
                  type="text"
                  className="cnpj"
                  name="profile.CNPJ"
                  value={state['profile.CNPJ']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                  disabled={this.state.disabled}
                />
              </label>
            </div>


            <div className="col-md-12">
              <label className="col-md-12">
                <span>SUSEP</span>
                <input
                  type="text"
                  name="profile.SUSEP"
                  value={state['profile.SUSEP']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>


            <div className="col-md-12">
              <label className="col-md-12">
                <span>Susepinha</span>
                <input
                  type="text"
                  name="profile.susepinha"
                  value={state['profile.susepinha']}
                  onBlur={this._handleBlur}
                  onChange={this._handleChange}
                />
              </label>
            </div>

            <div className="col-md-12">
              <button
                type="button fluid"
                className="btn btn-primary pull-right"
                onClick={() => this._handleSubmit()}
              >
                Cadastrar
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default _Component;
// export default connect(state => state.nimble)(_Component);
