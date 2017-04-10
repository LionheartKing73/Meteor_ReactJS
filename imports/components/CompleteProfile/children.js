import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// const swal = require('sweetalert2');

class ChildrenInfo extends React.Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = { update: false };

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form',
      method: 'custChildren.insert',
      schema: Schemas.CustChildren,
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
      name: '',
      age: '',
      educAnnualCost: '',
      hasHealthInsur: '',
      nameHealthInsur: '',
      hasSocialSecur: '',
      nameSocialSecur: ''
    });

    // this.db.remove({});
  }

  //------------------------------------------------------------------------------------------
  // Cancel editing fields on the form
  //------------------------------------------------------------------------------------------
  onCancelEdit() {

    this.clearStateForm();
    this.setState({ update: false, insert: false, idEditing: '' });

    if (this.props.children.length == 0) {
      $('#possui-filhos').val('nao');
    }
  }

  //------------------------------------------------------------------------------------------
  // Confirm editing fields on the form
  //------------------------------------------------------------------------------------------
  onConfirmEdit() {

    if (this.state.update) {
      Meteor.call('custChildren.update', this.state);

      this.clearStateForm();
      this.setState({ update: false, idEditing: '' });
    }
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  editChild(child){

    const _child = {

      id: child._id,
      customerId: child.customerId,
      name: child.name,
      age: child.age,
      educAnnualCost: child.educAnnualCost,
      hasHealthInsur: child.hasHealthInsur,
      nameHealthInsur: child.nameHealthInsur,
      hasSocialSecur: child.hasSocialSecur,
      nameSocialSecur: child.nameSocialSecur
    };

    this.db.update({}, _child);

    this.setState(_child);
    this.setState({ update: true, idEditing : _child.id });
  }

  //------------------------------------------------------------------------------------------
  // Remove child from collection
  //------------------------------------------------------------------------------------------
  removeChild(child){

    const self = this;

    swal(GLOBAL.swalConfirmOptions, function() {

      Meteor.call('custChildren.remove', child);

      self.clearStateForm();
      self.setState({ update: false, insert: false });
    })

  }

  //------------------------------------------------------------------------------------------
  // Initialize data first time is edited
  //------------------------------------------------------------------------------------------
  initializeChild(){

    const _child = {

      id: Random.id(),
      customerId: this.props.custDoc._id,
      name: '',
      age: '',
      educAnnualCost: '',
      hasHealthInsur: '',
      nameHealthInsur: '',
      hasSocialSecur: '',
      nameSocialSecur: ''
    };

    this.db.update({}, _child);
    this.setState(_child);
  }

  //------------------------------------------------------------------------------------------
  // Verifies if there is data to be filled
  //------------------------------------------------------------------------------------------
  possuiFilhos(ev){

    const { value } = ev.target;

    if (value == 'sim') {

      this.initializeChild();

      if (this.props.children.length == 0) {
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
  addChild(){
    this.initializeChild();
    this.setState({ insert: true });
  }

  //------------------------------------------------------------------------------------------
  // Render select (combo) to inform if customer has children
  //------------------------------------------------------------------------------------------
  renderPossuiFilhos(){

    if (this.props.children.length != 0) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--firstquestion contenedor-formulario--firstquestion--filho1">
        <div className="formulario">
          <div className="formgroup-info">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="label">Possui filhos:</span>
                  <select onChange={ev => this.possuiFilhos(ev)} id="possui-filhos" name="possui-filhos" className="small">
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
  // Render button to add a new child
  //------------------------------------------------------------------------------------------
  renderBtnAddChild(){

    if (this.state.update || this.state.insert || this.props.children.length == 0) return null;

    return (
      <div className="row buttons-div ">
        <button className="btn pull-right" onClick={() => this.addChild()}><i className="fa fa-plus" aria-hidden="true"></i> Adicionar filho</button>
      </div>
    )
  }

  //------------------------------------------------------------------------------------------
  // Render form that allows to edit or add a new child
  //------------------------------------------------------------------------------------------
  renderFormAddEditChild(){

    const state = this.state;

    if (!state.update && !state.insert) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--familiares__filho1 ">
        <div className="formulario">
          <div className="formgroup-info formgroup-info--subgrupo formgroup-info--editavel">
            <div className="icon-subgrupo">
              <img src="/icons/filho-azul.png"/>
            </div>
            <div className="row">
              <input name="id" value={state.id} type="hidden" className="form-control" />
              <div className="col-md-5">
                <div className="input-group">
                  <label className="label" for="filho1">Nome:</label>
                  <input type="text" name="name" value={state.name} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" for="filho1-idade">Idade:</label>
                  <input type="text" name="age" value={state.age} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <label className="label" for="filho1-custoed">Custo anual com educação:</label>
                  <input type="text" name="educAnnualCost" value={state.educAnnualCost} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <div className="input-group">
                  <label className="label" for="filho1-previdencia">Possui previdência:</label>

                  <select name="hasSocialSecur" className="small" value={state.hasSocialSecur} onChange={ev => this._handleChange(ev)}>
                    <option value="" selected></option>
                    <option value="Sim" selected>Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                { (state.hasSocialSecur == 'Sim') ? (
                    <div className="input-group">
                      <label className="label" for="filho1-instituicao">Qual instituição:</label>
                      <input type="text" name="nameSocialSecur" value={state.nameSocialSecur} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  ) : null}
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <div className="input-group">
                    <label className="label" for="filho1-saude">Possui seguro saúde:</label>
                    <select name="hasHealthInsur" className="small" value={state.hasHealthInsur} onChange={ev => this._handleChange(ev)}>
                      <option value="" selected></option>
                      <option value="Sim" selected>Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                { (state.hasHealthInsur == 'Sim') ? (
                    <div className="input-group">
                      <label className="label" for="filho1-saude">Qual seguro saúde:</label>
                      <input type="text" name="nameHealthInsur" value={state.nameHealthInsur} className="large" onBlur={this._handleBlur} onChange={this._handleChange} />
                    </div>
                  ) : null}
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
  // Render form that allows to view children data
  //------------------------------------------------------------------------------------------
  renderViewChild(){

    const { children } = this.props;
    const state = this.state;

    if (!children) return null;

    return (
      <div className="contenedor-formulario contenedor-formulario--view contenedor-formulario--view--familiares__filho1 ">

        {(children || []).map((child, k) =>

          <div key={k} className="formulario">

            { (state.idEditing != child._id) ? (

                <div className="formgroup-info formgroup-info--subgrupo">
                  <div className="icon-subgrupo">
                    <img src="/icons/filho-azul.png"/>
                  </div>
                  { (!state.update && !state.insert) ? (
                      <div>
                        <button className="fa fa-pencil btn btn-editar" onClick={() => this.editChild(child)}></button>
                        <button className="fa fa-trash btn btn-excluir" onClick={() => this.removeChild(child)}></button>
                      </div>
                    ) : null}
                  <div className="row">
                    <div className="col-md-5">
                      <div className="input-group">
                        <span className="label">Nome:</span>
                        <p>{child.name}</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Idade:</span>
                        <p>{child.age}</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <span className="label">Custo anual com educação:</span>
                        <p>{child.educAnnualCost}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="input-group">
                        <span className="label">Possui previdência:</span>
                        <p>{child.hasSocialSecur}</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      { (child.hasSocialSecur == 'Sim') ? (
                          <div className="input-group">
                            <span className="label">Qual instituição:</span>
                            <p>{child.nameSocialSecur}</p>
                          </div>
                        ) : null}
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <div className="input-group">
                          <span className="label">Possui seguro saúde:</span>
                          <p>{child.hasHealthInsur}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      { (child.hasHealthInsur == 'Sim') ? (
                          <div className="input-group">
                            <span className="label">Qual seguro saúde:</span>
                            <p>{child.nameHealthInsur}</p>
                          </div>
                        ) : null}
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
  // Render Children information tab
  //---------------------------------------------------------------------------------------------
  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (
      <div>
        { this.renderPossuiFilhos() }
        { this.renderBtnAddChild() }
        { this.renderFormAddEditChild() }
        { this.renderViewChild() }
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

  const childrenHandle = GlobalSubsManager('custChildren.all');
  const children = CustChildren.find({ customerId: custId }).fetch().reverse();

  return {
    custDoc, children,
    loading: !customersHandle.ready() || !childrenHandle.ready(),
    user: Meteor.user(),
  };

}, ChildrenInfo);
