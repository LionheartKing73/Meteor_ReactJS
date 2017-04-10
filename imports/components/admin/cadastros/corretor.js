import React, { Component } from 'react';
const { Select } = Mongoloid.Components;
import classNames from 'classnames';

class AdminCorretor extends Component {


  constructor(props) {
    super(props);

    this.state = { disabled: false, tipoPessoa: '', teste: '' };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form',
      method: 'admin.createUser',
      schema: Schemas.Users,
      opType: 'insert',
      schemas: {
        'emails.address': {
          schema: Schemas.Email,
          prepareData: data => data.emails
        }
      }
    };

    Mongoloid(mongoloidOptions);
  }

  render() {
    const state = this.state;

    var labelpessoa = classNames({
      'admin-label': true,
      'admin-label-desactive': this.state.disabled
    });

    return (
      <div className="admin-cadastro-corretor">

        <h1 className="cadastro-titulo">Cadastro novo corretor</h1>

        <div className="row">
          <div className="admin-campo-grande">
            <label>
              <label className="admin-label">Nome</label>
              <input type="text"
                     className="admin-input"
                     name="profile.name"
                     value={state["profile.name"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>

          <div className="admin-campo-grande">
            <label>
              <label className="admin-label">E-Mail</label>
              <input type="email"
                     className="admin-input"
                     name="emails.$.address"
                     value={state["emails.$.address"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>

          <div className="admin-campo-pequeno">
            <label>
              <label className="admin-label">CPF</label>
              <input type="text"
                     className="cpf admin-input"
                     name="profile.CPF"
                     value={state["profile.CPF"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>

          <div className="admin-campo-pequeno">
            <label>
              <label className="admin-label">Telefone</label>
              <input type="text"
                     className="phone admin-input"
                     name="profile.telefone"
                     value={state["profile.telefone"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="admin-campo-pequeno admin-select">
            <label>
              <label className="admin-label admin-select-label">Pessoa</label>
              <Select className="small"
                      self={this}
                      name="profile.tipoPessoa"
                      options={[
                        { value: 'pf', label: 'Física' },
                        { value: 'pj', label: 'Jurídica' },
                      ]}
                      value={state["profile.tipoPessoa"]}
                      onChange={(obj) => {
                        if (obj.value == 'pf') {
                          this.setState({ disabled: true });
                        } else {
                          this.setState({ disabled: false });
                        }
                        this._handleChange(obj.value, "profile.tipoPessoa");
                      }}
              />
            </label>
          </div>


          {/*<label className="radio-inline">*/}
          {/*<input*/}
          {/*type="radio"*/}
          {/*name="profile.tipoPessoa"*/}
          {/*value="pf"*/}
          {/*onChange={this._handleChange}/>*/}
          {/*Pessoa Física*/}
          {/*</label>*/}

          {/*<label className="radio-inline">*/}
          {/*<input*/}
          {/*type="radio"*/}
          {/*name="profile.tipoPessoa"*/}
          {/*value="pj"*/}
          {/*onChange={this._handleChange}/>*/}
          {/*Pessoa Jurídica*/}
          {/*</label>*/}


          <div className="admin-campo-pequeno">
            <label>
              <label className={labelpessoa}>Razão
                Social</label>
              <input type="text"
                     className="admin-input"
                     name="profile.razaoSocial"
                     value={state["profile.razaoSocial"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}
                     disabled={this.state.disabled}/>
            </label>
          </div>

          <div className="admin-campo-grande">
            <label>
              <label className={labelpessoa}>CNPJ</label>
              <input type="text"
                     className="cnpj admin-input"
                     name="profile.CNPJ"
                     value={state["profile.CNPJ"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}
                     disabled={this.state.disabled}/>
            </label>
          </div>

          <div className="admin-campo-pequeno">
            <label>
              <label className="admin-label">SUSEP</label>
              <input type="text"
                     className="admin-input"
                     name="profile.SUSEP"
                     value={state["profile.SUSEP"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>

          <div className="admin-campo-pequeno">
            <label>
              <label
                className="admin-label">Susepinha</label>
              <input type="text"
                     className="admin-input"
                     name="profile.susepinha"
                     value={state["profile.susepinha"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
        </div>
        <button type="button fluid"
                className="admin-botao btn pull-right"
                onClick={() => this._handleSubmit()}>
          Cadastrar
        </button>
      </div>
    )
  }
}

export default AdminCorretor;
//export default connect(state => state.nimble)(_Component);
