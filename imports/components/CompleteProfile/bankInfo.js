import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class BankInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = { update: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'BankInfo',
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

      bank: '',
      agency: '',
      account: ''
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

    Meteor.call('customers.updateBankInfo', this.state);

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editBankInfo(customer){

    var _bankInfo;

    if (customer.bankInfo) {
      _bankInfo = {
        customerId: customer._id,
        bank: customer.bankInfo.bank,
        agency: customer.bankInfo.agency,
        account: customer.bankInfo.account
      };
    }
    else {
      _bankInfo = {
        customerId: customer._id,
        bank: '',
        agency: '',
        account: ''
      };
    }

    this.db.update({}, _bankInfo);

    this.setState(_bankInfo);
    this.setState({ update: true });
  }

  //------------------------------------------------------------------------------------------
  // Remove bankInfo fields from collection
  //------------------------------------------------------------------------------------------
  removeBankInfo(customer){

    Meteor.call('customers.removeBankInfo', customer);

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Render component
  //------------------------------------------------------------------------------------------
  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    const state = this.state;
    var { custDoc } = this.props;

    return (

      <div className="tab-pane fade" id="bancarias">

        {!this.state.update ?
          <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--familiares__conjuge ">
            <div className="formulario">
              <div className="formgroup-info">
                <button className="fa fa-pencil btn btn-editar" onClick={() => this.editBankInfo(custDoc)}></button>
                <button className="fa fa-trash btn btn-excluir" onClick={() => this.removeBankInfo(custDoc)}></button>
                <div className="row">
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Banco:</span>
                      { (custDoc.bankInfo) ? (
                          <p>{custDoc.bankInfo.bank}</p>
                        ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Agência:</span>
                      { (custDoc.bankInfo) ? (
                          <p>{custDoc.bankInfo.agency}</p>
                        ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="label">Conta:</span>
                      { (custDoc.bankInfo) ? (
                          <p>{custDoc.bankInfo.account}</p>
                        ) : null}
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
                      <label className="label" >Banco:</label>
                      <input type="text" name="bank" value={state.bank} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <label className="label" >Agência:</label>
                      <input type="text" name="agency" value={state.agency} className="small" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group">
                      <label className="label" >Conta:</label>
                      <input type="text" name="account" value={state.account} className="small" onBlur={this._handleBlur} onChange={this._handleChange} />
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

}, BankInfo);
