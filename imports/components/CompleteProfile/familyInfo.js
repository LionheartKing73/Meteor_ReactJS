import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ChildrenInfo from './children';

class FamilyInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = { update: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'FamilyInfo',
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

      customerId: '',
      name: '',
      birthday: '',
      gender: '',
      mobilePhone: '',
      income: ''
    });

    this.db.remove({});
  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    Meteor.call('customers.updatePartner', this.state);

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editPartner(customer){

    const _birthday = new Date(customer.partner.birthday).toISOString().substring(0, 10);

    const _partner = {

      customerId: customer._id,
      name: customer.partner.name,
      birthday: _birthday,
      gender: customer.partner.gender,
      mobilePhone: customer.partner.mobilePhone,
      income: customer.partner.income
    };

    this.db.update({}, _partner);

    this.setState(_partner);
    this.setState({ update: true });
  }

  //------------------------------------------------------------------------------------------
  // Remove partner fields from collection
  //------------------------------------------------------------------------------------------
  removePartner(customer){

    swal({
      title: 'Confirma a exclusão?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function() {

      Meteor.call('customers.removePartner', customer);

      this.clearStateForm();
      this.setState({ update: false });

    }, function(dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  //------------------------------------------------------------------------------------------
  // Initialize data first time is edited
  //------------------------------------------------------------------------------------------
  initializePartner(){

    if (!this.props.custDoc.partner) {

      const _partner = {
        customerId: this.props.custDoc._id,
        name: '',
        birthday: '',
        gender: '',
        mobilePhone: '',
        income: ''
      };

      this.db.update({}, _partner);
      this.setState(_partner);
    }
  }

  //------------------------------------------------------------------------------------------
  // Verifies if there is data to be filled
  //------------------------------------------------------------------------------------------
  possuiConjuge(ev){

    const { value } = ev.target;

    if (value == 'sim') {

      this.initializePartner();
      // this.clearStateForm();
      this.setState({ update: true });
    } else {
      this.setState({ update: false });
    }
  }

  //------------------------------------------------------------------------------------------
  // Render component
  //------------------------------------------------------------------------------------------
  renderConjuge() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    const state = this.state;
    var { custDoc } = this.props;

    var _birthday;
    if (custDoc.partner) {
      _birthday = moment(new Date(custDoc.partner.birthday).toISOString().substring(0, 10)).format('DD/MM/YYYY');
    }

    return (

      <div>
        {!custDoc.partner ?
          <div className="contenedor-formulario contenedor-formulario--firstquestion contenedor-formulario--firstquestion--conjuge">
            <div className="formulario">
              <div className="formgroup-info">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="label">Possui Cônjuge:</span>
                      <select onChange={ev => this.possuiConjuge(ev)} id="possui-conjuge" name="possui-conjugue" className="small">
                        <option value="nao" selected>Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          : ""}

        {!this.state.update && custDoc.partner ?
          <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--familiares__conjuge ">
            <div className="formulario">
              <div className="formgroup-info">
                <button className="fa fa-pencil btn btn-editar" onClick={() => this.editPartner(custDoc)}></button>
                <button className="fa fa-trash btn btn-excluir" onClick={() => this.removePartner(custDoc)}></button>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="label">Nome Cônjuge:</span>
                      {custDoc.partner ?
                        <p>{custDoc.partner.name}</p>
                        : ''}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Data Nascimento:</span>
                      {custDoc.partner ?
                        <p>{_birthday}</p>
                        : ''}
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="input-group">
                      <span className="label">Sexo:</span>
                      {custDoc.partner ?
                        <p>{custDoc.partner.gender}</p>
                        : ''}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Telefone Celular:</span>
                      {custDoc.partner ?
                        <p>{custDoc.partner.mobilePhone}</p>
                        : ''}
                    </div>
                  </div>

                </div>
                <div className="row">

                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Renda familiar:</span>
                      {custDoc.partner ?
                        <p>{custDoc.partner.income}</p>
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : ""}

        {this.state.update ?
          <div className="contenedor-formulario contenedor-formulario--familiares__conjuge ">
            <div className="formulario">
              <div className="formgroup-info formgroup-info--editavel">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group">
                      <label className="label" for="cj">Nome Cônjuge:</label>
                      <input type="text" name="name" value={state.name} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="input-group">
                      <label className="label" for="dt-nasc">Data Nascimento:</label>
                      <input type="date" name="birthday" value={state.birthday} className="small" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="input-group">
                      <label className="label" for="sexo-conjugue">Sexo:</label>
                      <select name="gender" className="small" value={state.gender} onChange={ev => this._handleChange(ev)}>
                        <option value="" selected></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <label className="label" for="fone2">Telefone Celular:</label>
                      <input type="text" name="mobilePhone" value={state.mobilePhone} className="fone2 small" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  </div>

                </div>
                <div className="row">

                  <div className="col-md-3">
                    <div className="input-group">
                      <label className="label" for="rendafamiliar">Renda familiar:</label>
                      <input type="text" name="income" value={state.income} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
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
          : ""}

      </div>

    )
  }

  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (
      <div className="tab-pane fade" id="familiares">
        { this.renderConjuge() }
        <ChildrenInfo/>
      </div>
    )
  }


}

export default createContainer((props) => {

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

}, FamilyInfo);
