import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class VehicleInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = { update: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form',
      method: 'custVehicles.insert',
      schema: Schemas.CustVehicles,
      opType: 'insert'
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
      customerId: '',

      model: '',
      year: '',
      typeOfUse: '',
      insured: '',
      kmMedia: '',
      carSeat: '',
      mainVehicle: ''
    });

    // this.db.remove({});
  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    this.clearStateForm();
    this.setState({ update: false, insert: false, idEditing: '' });

    if (this.props.vehicles.length == 0) {
      $('#possui-automovel').val('nao');
    }
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    if (this.state.update) {
      Meteor.call('custVehicles.update', this.state);

      this.clearStateForm();
      this.setState({ update: false, idEditing: '' });
    }
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editVehicle(vehicle){

    const _vehicle = {

      id: vehicle._id,
      customerId: vehicle.customerId,

      model: vehicle.model,
      year: vehicle.year,
      typeOfUse: vehicle.typeOfUse,
      insured: vehicle.insured,
      kmMedia: vehicle.kmMedia,
      carSeat: vehicle.carSeat,
      mainVehicle: vehicle.mainVehicle
    };

    this.db.update({}, _vehicle);

    this.setState(_vehicle);
    this.setState({ update: true, idEditing : _vehicle.id });
  }

  //------------------------------------------------------------------------------------------
  // Remove vehicle from collection
  //------------------------------------------------------------------------------------------
  removeVehicle(vehicle){

    Meteor.call('custVehicles.remove', vehicle);

    this.clearStateForm();
    this.setState({ update: false, insert: false });
  }

  //------------------------------------------------------------------------------------------
  // Initialize data first time is edited
  //------------------------------------------------------------------------------------------
  initializeVehicle(){

    const _vehicle = {

      id: Random.id(),
      customerId: this.props.custDoc._id,

      model: '',
      year: '',
      typeOfUse: '',
      insured: '',
      kmMedia: '',
      carSeat: '',
      mainVehicle: ''
    };

    this.db.update({}, _vehicle);
    this.setState(_vehicle);
  }

  //------------------------------------------------------------------------------------------
  // Verifies if there is data to be filled
  //------------------------------------------------------------------------------------------
  possuiAutomovel(ev){

    const { value } = ev.target;

    if (value == 'sim') {

      this.initializeVehicle();

      if (this.props.vehicles.length == 0) {
        this.setState({ insert: true });
      }
      else {
        this.setState({ update: true });
      }
    } else {
      this.setState({ update: false, insert: false });
    }
  }

  //------------------------------------------------------------------------------------------
  // Add a new document
  //------------------------------------------------------------------------------------------
  addVehicle(){
    this.initializeVehicle();
    this.setState({ insert: true });
  }

  //------------------------------------------------------------------------------------------
  // Render select (combo) to inform if customer has vehicles
  //------------------------------------------------------------------------------------------
  renderPossuiAutomovel(){

    if (this.props.vehicles.length != 0) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--firstquestion contenedor-formulario--firstquestion--automovel">
        <div className="formulario">
          <div className="formgroup-info">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="label">Possui automóvel:</span>
                  <select onChange={ev => this.possuiAutomovel(ev)} id="possui-automovel" name="possui-automovel" className="small">
                    <option value="nao" selected>Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //------------------------------------------------------------------------------------------
  // Render button to add a new vehicle
  //------------------------------------------------------------------------------------------
  renderBtnAddAutomovel(){

    if (this.state.update || this.state.insert || this.props.vehicles.length == 0) return null;

    return (
      <div className="row buttons-div ">
        <button className="btn pull-right" onClick={() => this.addVehicle()}><i className="fa fa-plus" aria-hidden="true"></i> Adicionar automóvel</button>
      </div>
    )
  }

  //------------------------------------------------------------------------------------------
  // Render form that allows to edit or add a new vehicle
  //------------------------------------------------------------------------------------------
  renderFormAddEditAutomovel(){

    const state = this.state;

    if (!state.update && !state.insert) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--automovel ">
        <div className="formulario">
          <div className="formgroup-info formgroup-info--subgrupo formgroup-info--editavel">
            <div className="icon-subgrupo">
              <img src="/icons/carro.png"/>
            </div>
            <div className="row">
              <input name="id" value={state.id} type="hidden" className="form-control" />
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Modelo do carro:</label>
                  <input type="text" name="model" value={state.model} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Ano:</label>
                  <input type="text" name="year" value={state.year} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Tipo de uso:</label>
                  <select name="typeOfUse" className="small" value={state.typeOfUse} onChange={ev => this._handleChange(ev)}>
                    <option value="" selected></option>
                    <option value="Passeio">Passeio</option>
                    <option value="Trabalho">Trabalho</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Segurado:</label>
                  <select name="insured" className="small" value={state.insured} onChange={ev => this._handleChange(ev)}>
                    <option value="" selected></option>
                    <option value="Sim" selected>Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Média de KM:</label>
                  <input type="text" name="kmMedia" value={state.kmMedia} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Cadeira veicular:</label>
                  <input type="text" name="carSeat" value={state.carSeat} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" >Veiculo Principal:</label>
                  <input type="text" name="mainVehicle" value={state.mainVehicle} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              { this.state.update ?
                <button className="btn pull-right btn-padrao" onClick={() => this.onConfirmEdit()}>Salvar</button>
                :
                <button className="btn pull-right btn-padrao" onClick={() => this._handleSubmit()}>Cadastrar</button>
              }
              <button className="btn pull-right btn-padrao btn-secundario" onClick={() => this.onCancelEdit()}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //------------------------------------------------------------------------------------------
  // Render form that allows to view vehicles data
  //------------------------------------------------------------------------------------------
  renderViewAutomovel(){

    const { vehicles } = this.props;
    const state = this.state;

    if (!vehicles) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--automovel ">

        {(vehicles || []).map((vehicle, k) =>

          <div key={k} className="formulario">

            { (state.idEditing != vehicle._id) ? (

                <div className="formgroup-info formgroup-info--subgrupo">
                  <div className="icon-subgrupo">
                    <img src="/icons/carro.png"/>
                  </div>
                  { (!state.update && !state.insert) ? (
                      <div>
                        <button className="fa fa-pencil btn btn-editar" onClick={() => this.editVehicle(vehicle)}></button>
                        <button className="fa fa-trash btn btn-excluir" onClick={() => this.removeVehicle(vehicle)}></button>
                      </div>
                    ) : null}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Modelo do carro:</span>
                        <p>{vehicle.model}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Ano:</span>
                        <p>{vehicle.year}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Tipo de uso:</span>
                        <p>{vehicle.typeOfUse}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Segurado:</span>
                        <p>{vehicle.insured}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
          </div>
        )}
      </div>

    )
  }

  //---------------------------------------------------------------------------------------------
  // Render vehicles information tab
  //---------------------------------------------------------------------------------------------
  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (
      <div className="tab-pane fade" id="automoveis">
        { this.renderPossuiAutomovel() }
        { this.renderBtnAddAutomovel() }
        { this.renderFormAddEditAutomovel() }
        { this.renderViewAutomovel() }
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

  const vehiclesHandle = GlobalSubsManager('custVehicles.all');
  const vehicles = CustVehicles.find({ customerId: custId }).fetch().reverse();

  return {
    custDoc, vehicles,
    loading: !customersHandle.ready() || !vehiclesHandle.ready(),
    user: Meteor.user(),
  };

}, VehicleInfo);
