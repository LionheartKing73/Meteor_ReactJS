import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class PersonalInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = {};

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'PersonalInfo',
      opType: 'update',
    };

    Mongoloid(mongoloidOptions);
  }

  //------------------------------------------------------------------------------------------
  // prepareData
  //------------------------------------------------------------------------------------------
  prepareData(data) {
    console.log(data);
    return data;
  }

  //------------------------------------------------------------------------------------------
  // Clear state form and its visual components (fields)
  //------------------------------------------------------------------------------------------
  clearStateForm() {
    this.setState({

      id: '',
      name: '',
      nickName: '',
      birthday: '',
      document: '',
      gender: '',
      maritalStatus: '',
      homePhone: '',
      homeEmail: '',
      mobilePhone: '',
      mobileOperator: '',
      mobileBill: ''
    });

    this.db.remove({});
  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    $('.contenedor-formulario--view--pessoais').removeClass('hidden');
    $('.contenedor-formulario--pessoais').addClass('hidden');

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    $('.contenedor-formulario--view--pessoais').removeClass('hidden');
    $('.contenedor-formulario--pessoais').addClass('hidden');

    Meteor.call('customers.updatePersonal', this.state);

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editarPessoais(customer){

    $('.contenedor-formulario--view--pessoais').addClass('hidden');
    $('.contenedor-formulario--pessoais').removeClass('hidden');

    console.log(customer);

    var _birthday;
    if (customer.birthday) {
      _birthday = new Date(customer.birthday).toISOString().substring(0, 10);
    }

    const _cust = {

      id: customer._id,
      name: customer.name,
      nickName: customer.nickName,
      birthday: _birthday,
      document: customer.document,
      gender: customer.gender,
      maritalStatus: customer.maritalStatus,
      homePhone: customer.homePhone,
      homeEmail: customer.homeEmail,
      mobilePhone: customer.mobilePhone,
      mobileOperator: customer.mobileOperator,
      mobileBill: customer.mobileBill
    };

    this.db.update({}, _cust);
    this.setState(_cust);
  }

  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    const state = this.state;

    var { custDoc } = this.props;

    var _birthday;
    if (custDoc.birthday) {
      _birthday = moment(new Date(custDoc.birthday).toISOString().substring(0, 10)).format('DD/MM/YYYY');
    }

    return (

      <div className="tab-pane fade in active" id="pessoais">
        <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--pessoais">
          <div className="formulario">
            <div className="formgroup-info">
              <button className="fa fa-pencil btn btn-editar" onClick={() => this.editarPessoais(custDoc)}></button>
              <div className="row">
                <div className="col-md-5">
                  <div className="input-group">
                    <span className="label">Nome e Sobrenome:</span>
                    <p>{custDoc.name}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  { (custDoc.nickName) ? (
                      <div className="input-group">
                        <span className="label">Como quer ser chamado (apelido):</span>
                        <p>{custDoc.nickName}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.birthday) ? (
                      <div className="input-group">
                        <span className="label">Data de nascimento:</span>
                        <p>{_birthday}</p>
                      </div>
                    ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  { (custDoc.document) ? (
                      <div className="input-group">
                        <span className="label">CPF:</span>
                        <p>{custDoc.document}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.gender) ? (
                      <div className="input-group">
                        <span className="label">Sexo:</span>
                        <p>{custDoc.gender}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-2">
                  { (custDoc.maritalStatus) ? (
                      <div className="input-group">
                        <span className="label">Estado civil:</span>
                        <p>{custDoc.maritalStatus}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-2">
                  { (custDoc.homePhone) ? (
                      <div className="input-group">
                        <span className="label">Telefone fixo:</span>
                        <p>{custDoc.homePhone}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.mobilePhone) ? (
                      <div className="input-group">
                        <span className="label">Telefone celular:</span>
                        <p>{custDoc.mobilePhone}</p>
                      </div>
                    ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  { (custDoc.mobileOperator) ? (
                      <div className="input-group">
                        <span className="label">Operadora/Plano:</span>
                        <p>{custDoc.mobileOperator}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.mobileBill) ? (
                      <div className="input-group">
                        <span className="label">Conta mensal:</span>
                        <p>{custDoc.mobileBill}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-4">
                  { (custDoc.homeEmail) ? (
                      <div className="input-group">
                        <span className="label">Email:</span>
                        <p>{custDoc.homeEmail}</p>
                      </div>
                    ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contenedor-formulario contenedor-formulario--pessoais hidden">
          <div className="formulario">
            <div className="formgroup-info formgroup-info--editavel">
              <div className="row">
                <div className="col-md-5">
                  <input name="id" value={state.id} type="hidden" className="form-control" />
                  <div className="input-group">
                    <label className="label" for="nome">Nome e Sobrenome:</label>
                    <input type="text" name="name" value={state.name} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="input-group">
                    <label className="label" for="apl">Como quer ser chamado (apelido):</label>
                    <input type="text" name="nickName" value={state.nickName} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="data-nasc">Data de nascimento:</label>
                    <input type="date" name="birthday" value={state.birthday} className="small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-group">
                    <label className="label" for="cpf">CPF:</label>
                    <input type="text" name="document" value={state.document} className="cpf small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="sexo">Sexo:</label>
                    <select name="gender" className="small" value={state.gender} onChange={ev => this._handleChange(ev)}>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-group">
                    <label className="label" for="estadocivil">Estado civil:</label>
                    <select name="maritalStatus" className="small" value={state.maritalStatus} onChange={ev => this._handleChange(ev)}>
                      <option value="Solteiro">Solteiro</option>
                      <option value="Casado">Casado</option>
                      <option value="Divorciado">Divorciado</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="input-group">
                    <label className="label" for="fone">Telefone fixo:</label>
                    <input type="text" name="homePhone" value={state.homePhone} className="fone small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="cell">Telefone Celular:</label>
                    <input type="text" name="mobilePhone" value={state.mobilePhone} className="cell small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="col-md-2">
                  <div className="input-group">
                    <label className="label" for="cell">Operadora/Plano:</label>
                    <input type="text" name="mobileOperator" value={state.mobileOperator} className="cell small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="cell">Conta mensal:</label>
                    <input type="text" name="mobileBill" value={state.mobileBill} className="cell small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <label className="label" for="email">Email:</label>
                    <input type="text" name="homeEmail" value={state.homeEmail} className="email small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <button className="btn pull-right btn-padrao" onClick={() => this.onConfirmEdit()}>Salvar</button>
                <button className="btn pull-right btn-padrao btn-secundario" onClick={() => this.onCancelEdit()}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}

export default createContainer(() => {

  //-------------------------------------
  // Comes from CustomerHeader
  //-------------------------------------
  const objCust = Session.get('customerDoc') || {};
  let custId = objCust.customerId;

  const customersHandle = GlobalSubsManager('customers.all');
  const custDoc = Customers.findOne({ _id: custId });

  return {
    custDoc,
    loading: !customersHandle.ready(),
    user: Meteor.user(),
  };
}, PersonalInfo);
