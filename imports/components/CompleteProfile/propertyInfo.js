import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const { Select } = Mongoloid.Components;

// import Select from 'react-select';
// import 'react-select/dist/react-select.css';

class PropertyInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = { update: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'PersonalInfo',
      method: 'custProperties.insert',
      schema: Schemas.CustProperties,
      opType: 'insert'
    };

    Mongoloid(mongoloidOptions);
  }

  getField(field) {
    const state = this.state;
    const address = (this.props.user.profile || {}).address || {};
    const lastField = _.last(field.split('.'));
    return (state[field]) ? state[field] : address[field] || address[lastField] || state[lastField];
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

      hasAlarm: '',
      hasInsur: '',
      nameInsur: '',
      type: '',

      profile: '',
      zipCode: '',
      address: '',

      complement: '',
      neighbhood: '',
      city: '',
      uf: '',

      inCondominium: '',
      value: '',
      footage: '',
      hasEmployees: '',

      hasPets: '',
      homeOffice: '',
      validity: '',
      hasOldPeople: '',

      hasConsortium: ''
    });

  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    this.clearStateForm();
    this.setState({ update: false, insert: false, idEditing: '' });

    if (this.props.properties.length == 0) {
      $('#possui-imovel').val('nao');
    }
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    if (this.state.update) {
      Meteor.call('custProperties.update', this.state);

      this.clearStateForm();
      this.setState({ update: false, idEditing: '' });
    }
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editProperty(property){

    console.error(JSON.stringify(property, null, 2));

    const _property = {

      id: property._id,
      customerId: property.customerId,

      hasAlarm: property.hasAlarm,
      hasInsur: property.hasInsur,
      nameInsur: property.nameInsur,
      type: property.type,

      profile: property.profile,
      zipCode: property.zipCode,
      address: property.address,

      complement: property.complement,
      neighbhood: property.neighbhood,
      city: property.city,
      uf: property.uf,

      inCondominium: property.inCondominium,
      value: property.value,
      footage: property.footage,
      hasEmployees: property.hasEmployees,

      hasPets: property.hasPets,
      homeOffice: property.homeOffice,
      validity: property.validity,
      hasOldPeople: property.hasOldPeople,

      hasConsortium: property.hasConsortium
    };

    this.db.update({}, _property);

    this.setState(_property);
    this.setState({ update: true, idEditing : _property.id });
  }

  //------------------------------------------------------------------------------------------
  // Remove property from collection
  //------------------------------------------------------------------------------------------
  removeProperty(property){

    Meteor.call('custProperties.remove', property);

    this.clearStateForm();
    this.setState({ update: false, insert: false });
  }

  //------------------------------------------------------------------------------------------
  // Initialize data first time is edited
  //------------------------------------------------------------------------------------------
  initializeProperty(){

    const _property = {

      id: Random.id(),
      customerId: this.props.custDoc._id,

      hasAlarm: '',
      hasInsur: '',
      nameInsur: '',
      type: '',

      profile: '',
      zipCode: '',
      address: '',

      complement: '',
      neighbhood: '',
      city: '',
      uf: '',

      inCondominium: '',
      value: '',
      footage: '',
      hasEmployees: '',

      hasPets: '',
      homeOffice: '',
      validity: '',
      hasOldPeople: '',

      hasConsortium: ''
    };

    this.db.update({}, _property);
    this.setState(_property);
  }

  //------------------------------------------------------------------------------------------
  // Verifies if there is data to be filled
  //------------------------------------------------------------------------------------------
  possuiImovel(ev){

    const { value } = ev.target;

    if (value == 'sim') {

      this.initializeProperty();

      if (this.props.properties.length == 0) {
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
  addProperty(){
    this.initializeProperty();
    this.setState({ insert: true });
  }

  //------------------------------------------------------------------------------------------
  // Render select (combo) to inform if customer has properties
  //------------------------------------------------------------------------------------------
  renderPossuiImoveis(){

    if (this.props.properties.length != 0) return null;

    return (

      <div className="contenedor-formulario contenedor-formulario--firstquestion contenedor-formulario--firstquestion--imovel">
        <div className="formulario">
          <div className="formgroup-info">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="label" for="possui-imovel">Possui imóvel:</span>
                  <select onChange={ev => this.possuiImovel(ev)} id="possui-imovel" name="possui-imovel" className="small">
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
  // Render button to add a new property
  //------------------------------------------------------------------------------------------
  renderBtnAddProperty(){

    if (this.state.update || this.state.insert || this.props.properties.length == 0) return null;

    return (

      <div className="row buttons-div ">
        <button className="btn pull-right" onClick={() => this.addProperty()}><i className="fa fa-plus" aria-hidden="true"></i> Adicionar imóvel</button>
      </div>
    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 1 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_1(){

    const state = this.state;

    return (

      <div className="row">

        <input name="id" value={state.id} type="hidden" className="form-control" />
        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="cj">Possui alarme:</label>
            <select name="hasAlarm" className="small" value={state.hasAlarm} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="dt-nasc">Possui seguro:</label>
            <select name="hasInsur" className="small" value={state.hasInsur} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Qual instituição:</label>
            <input type="text" name="nameInsur" value={state.nameInsur} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Tipo da residência:</label>
            <select name="type" className="small" value={state.type} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Casa" selected>Casa</option>
              <option value="Apartamento">Apartamento</option>
            </select>
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 2 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_2(){

    const state = this.state;

    return (

      <div className="row">

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Perfil:</label>
            <select name="profile" className="small" value={state.profile} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Proprietário" selected>Proprietário</option>
              <option value="Locatário">Locatário</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">CEP:</label>
            <input type="text" name="zipCode" value={state.zipCode} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Endereço:</label>
            <input type="text" name="address" value={state.address} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 3 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_3(){

    const state = this.state;

    return (

      <div className="row">

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Complemento:</label>
            <input type="text" name="complement" value={state.complement} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Bairro:</label>
            <input type="text" name="neighbhood" value={state.neighbhood} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Cidade:</label>
            <input type="text" name="city" value={state.city} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Estado:</label>
            <select name="uf" className="small" value={state.uf} onChange={ev => this._handleChange(ev)}>
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AM">AM</option>
              <option value="AP">AP</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MG">MG</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="PR">PR</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SE">SE</option>
              <option value="SP">SP</option>
              <option value="TO">TO</option>
            </select>

            {/*<Select name="uf" self={this} className="small" value={state.uf} onChange={ev => this._handleChange(ev)} options={GLOBAL.UFs} />*/}
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 4 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_4(){

    const state = this.state;

    return (

      <div className="row">

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Mora em condominio:</label>
            <select name="inCondominium" className="small" value={state.inCondominium} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Valor estimado:</label>
            <input type="text" name="value" value={state.value} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">M <sup>2</sup>:</label>
            <input type="text" name="footage" value={state.footage} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Possui empregados:</label>
            <select name="hasEmployees" className="small" value={state.hasEmployees} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 5 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_5(){

    const state = this.state;

    return (

      <div className="row">

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Animais Domésticos:</label>
            <select name="hasPets" className="small" value={state.hasPets} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Home Office:</label>
            <select name="homeOffice" className="small" value={state.homeOffice} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Vigência:</label>
            <input type="date" name="validity" value={state.validity} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Possui pessoas idosas:</label>
            <select name="hasOldPeople" className="small" value={state.hasOldPeople} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render Row 6 from form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditRow_6(){

    const state = this.state;

    return (

      <div className="row">

        <div className="col-md-3">
          <div className="input-group">
            <label className="label" for="sexo-conjugue">Possui consorcio:</label>
            <select name="hasConsortium" className="small" value={state.hasConsortium} onChange={ev => this._handleChange(ev)}>
              <option value="" selected></option>
              <option value="Sim" selected>Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

      </div>

    )
  }

  //------------------------------------------------------------------------------------------
  // Render form that allows to edit or add a new property
  //------------------------------------------------------------------------------------------
  renderFormAddEditProperty(){

    const state = this.state;

    if (!state.update && !state.insert) return null;

    return (

      <div className="contenedor-formulario contenedor-formulario--familiares__imovel">
        <div className="formulario">
          <div className="formgroup-info formgroup-info--subgrupo formgroup-info--editavel">
            <div className="icon-subgrupo">
              <img src="/icons/casa.png"/>
            </div>

            { this.renderFormAddEditRow_1() }
            { this.renderFormAddEditRow_2() }
            { this.renderFormAddEditRow_3() }
            { this.renderFormAddEditRow_4() }
            { this.renderFormAddEditRow_5() }
            { this.renderFormAddEditRow_6() }

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
  // Render form that allows to view properties data
  //------------------------------------------------------------------------------------------
  renderViewProperty(){

    const { properties } = this.props;
    const state = this.state;

    if (!properties) return null;

    return (

      <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--familiares__imovel2">

        {(properties || []).map((property, k) =>

          <div key={k} className="formulario">

            { (state.idEditing != property._id) ? (

                <div className="formgroup-info formgroup-info--subgrupo">
                  <div className="icon-subgrupo">
                    <img src="/icons/casa.png"/>
                  </div>
                  { (!state.update && !state.insert) ? (
                      <div>
                        <button className="fa fa-pencil btn btn-editar" onClick={() => this.editProperty(property)}></button>
                        <button className="fa fa-trash btn btn-excluir" onClick={() => this.removeProperty(property)}></button>
                      </div>
                    ) : null}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Possui Alarme:</span>
                        <p>{property.hasAlarm}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Possui seguro:</span>
                        <p>{property.hasInsur}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Qual instituição:</span>
                        <p>{property.nameInsur}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Tipo da residência:</span>
                        <p>{property.type}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Perfil:</span>
                        <p>{property.profile}</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">CEP:</span>
                        <p>{property.zipCode}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="label">Endereço:</span>
                        <p>{property.address}</p>
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
  // Render Properties information tab
  //---------------------------------------------------------------------------------------------
  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (
      <div className="tab-pane fade" id="imoveis">
        { this.renderPossuiImoveis() }
        { this.renderBtnAddProperty() }
        { this.renderFormAddEditProperty() }
        { this.renderViewProperty() }
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

  const propertiesHandle = GlobalSubsManager('custProperties.all');
  const properties = CustProperties.find({ customerId: custId }).fetch().reverse();

  console.error(JSON.stringify(properties, null, 2));

  return {
    custDoc, properties,
    loading: !customersHandle.ready() || !propertiesHandle.ready(),
    user: Meteor.user(),
  };

}, PropertyInfo);
