import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const { Select } = Mongoloid.Components;

class ProfessionalInfo extends React.Component {

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
      profession: '',
      company: '',
      position: '',
      salaryRange: '',
      workZipcode: '',
      workAddress: '',
      workComplement: '',
      workNeighbhood: '',
      workCity: '',
      workState: '',
      workEmail: '',
      workPhone: '',
      income: ''
    });

    this.db.remove({});
  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    $('.contenedor-formulario--view--profissionais').removeClass('hidden');
    $('.contenedor-formulario--profissionais').addClass('hidden');

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    $('.contenedor-formulario--view--profissionais').removeClass('hidden');
    $('.contenedor-formulario--profissionais').addClass('hidden');

    Meteor.call('customers.updateProfessional', this.state);

    this.clearStateForm();
    this.setState({ update: false });
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editarProfissionais(customer){

    $('.contenedor-formulario--view--profissionais').addClass('hidden');
    $('.contenedor-formulario--profissionais').removeClass('hidden');

    console.log(customer);

    const _cust = {

      id: customer._id,

      profession: customer.profession,
      company: customer.company,
      position: customer.position,
      salaryRange: customer.salaryRange,
      workZipcode: customer.workZipcode,
      workAddress: customer.workAddress,
      workComplement: customer.workComplement,
      workNeighbhood: customer.workNeighbhood,
      workCity: customer.workCity,
      workState: customer.workState,
      workEmail: customer.workEmail,
      workPhone: customer.workPhone,
      income: customer.income
    };

    this.db.update({}, _cust);
    this.setState(_cust);
  }

  handleChangeCEP(event) {
    const cepValue = event.target.value;
    if (Regex.CEP.test(cepValue) == true) {
      cep(cepValue).then((address) => {
        if (address.cep) {
          this._setMongoloidValue({"uf": address.state}, event.target);
          this._setMongoloidValue({"cidade": address.city}, event.target);
          this._setMongoloidValue({"logradouro": address.street}, event.target);
          this._setMongoloidValue({"bairro": address.neighborhood}, event.target);
        }
      });
    }
    this._handleChange(event, "cep");
  }

  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    const state = this.state;
    var { custDoc } = this.props;

    return (

      <div className="tab-pane fade" id="profissionais">

        <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--profissionais">
          <div className="formulario">
            <div className="formgroup-info">
              <button className="fa fa-pencil btn btn-editar" onClick={() => this.editarProfissionais(custDoc)}></button>

              <div className="row">
                <div className="col-md-3">
                  { (custDoc.profession) ? (
                      <div className="input-group">
                        <span className="label">Profissão:</span>
                        <p>{custDoc.profession}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.company) ? (
                      <div className="input-group">
                        <span className="label">Empresa atual:</span>
                        <p>{custDoc.company}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.position) ? (
                      <div className="input-group">
                        <span className="label">Cargo:</span>
                        <p>{custDoc.position}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.salaryRange) ? (
                      <div className="input-group">
                        <span className="label">Faixa salarial:</span>
                        <p>{custDoc.salaryRange}</p>
                      </div>
                    ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  { (custDoc.workZipcode) ? (
                      <div className="input-group">
                        <span className="label">CEP:</span>
                        <p>{custDoc.workZipcode}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.workAddress) ? (
                      <div className="input-group">
                        <span className="label">Endereço comercial:</span>
                        <p>{custDoc.workAddress}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.workComplement) ? (
                      <div className="input-group">
                        <span className="label">Complemento:</span>
                        <p>{custDoc.workComplement}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.workNeighbhood) ? (
                      <div className="input-group">
                        <span className="label">Bairro:</span>
                        <p>{custDoc.workNeighbhood}</p>
                      </div>
                    ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  { (custDoc.workCity) ? (
                      <div className="input-group">
                        <span className="label">Cidade:</span>
                        <p>{custDoc.workCity}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.workState) ? (
                      <div className="input-group">
                        <span className="label">Estado:</span>
                        <p>{custDoc.workState}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-6">
                  { (custDoc.workEmail) ? (
                      <div className="input-group">
                        <span className="label">Email:</span>
                        <p>{custDoc.workEmail}</p>
                      </div>
                    ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  { (custDoc.workPhone) ? (
                      <div className="input-group">
                        <span className="label">Telefone comercial:</span>
                        <p>{custDoc.workPhone}</p>
                      </div>
                    ) : null}
                </div>
                <div className="col-md-3">
                  { (custDoc.income) ? (
                      <div className="input-group">
                        <span className="label">Renda mensal:</span>
                        <p>{custDoc.income}</p>
                      </div>
                    ) : null}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="contenedor-formulario contenedor-formulario--profissionais hidden">
          <div className="formulario">
            <div className="formgroup-info formgroup-info--editavel">
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="prof">Profissão:</label>
                    <input type="text" name="profession" value={state.profession} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="apl">Empresa atual:</label>
                    <input type="text" name="company" value={state.company} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="apl">Cargo:</label>
                    <input type="text" name="position" value={state.position} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="faixasalarial">Faixa salarial:</label>
                    <select name="salaryRange" className="small" value={state.salaryRange} onChange={ev => this._handleChange(ev)}>
                      <option value="" selected></option>
                      <option>R$1.000,00 á R$ 2.000,00</option>
                      <option>R$4.000,00 á R$5.500,00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="cepempresa">CEP:</label>
                    <input type="text" name="workZipcode" value={state.workZipcode} className="large" onChange={this.handleChangeCEP} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="end">Endereço comercial:</label>
                    <input type="text" name="workAddress" value={state.workAddress} className="end small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="comple">Complemento:</label>
                    <input type="text" name="workComplement" value={state.workComplement} className="comple small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="comple">Bairro:</label>
                    <input type="text" name="workNeighbhood" value={state.workNeighbhood} className="bairro small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="cidade">Cidade:</label>
                    <input type="text" name="workCity" value={state.workCity} className="cidade small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="estado">Estado:</label>
                    <Select name="workState" self={this} className="small" value={state.workState} onChange={ev => this._handleChange(ev)} options={GLOBAL.UFs} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <label className="label" for="emailempresa">Email:</label>
                    <input type="text" name="workEmail" value={state.workEmail} className="pais small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="tel">Telefone comercial:</label>
                    <input type="text" name="workPhone" value={state.workPhone} className="tel small" onBlur={this._handleBlur} onChange={this._handleChange} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <label className="label" for="tel">Renda mensal:</label>
                    <input type="text" name="income" value={state.income} className="tel small" onBlur={this._handleBlur} onChange={this._handleChange} />
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

}, ProfessionalInfo);
