import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class AdminProduto extends Component {

  //------------------------------------------------------------------------------------------
  // Component constructor
  //------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = {};

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form',
      method: 'products.insert',
      schema: Schemas.Products,
      opType: 'insert'
    };

    Mongoloid(mongoloidOptions);
  }

  //------------------------------------------------------------------------------------------
  // prepareData
  //------------------------------------------------------------------------------------------
  prepareData(data) {
    return data;
  }

  //------------------------------------------------------------------------------------------
  // Clear state form and its visual components (fields)
  //------------------------------------------------------------------------------------------
  clearStateForm() {

    this.setState({

      id: '',
      systemName: '',
      name: '',
      description: '',
      benefits: '',
      services: '',
      actualGoal: '',
      monthlyGoal: '',
      startDate: '',
      endDate: ''
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
  onConfirmEdit(event) {

    if (this.state.update) {
      Meteor.call('products.update', this.state);

      this.clearStateForm();
      this.setState({ update: false });
    }
  }

  //------------------------------------------------------------------------------------------
  // Removes a record listed the grid
  //------------------------------------------------------------------------------------------
  onRemove(product) {
    Meteor.call('products.remove', product);
  }

  //------------------------------------------------------------------------------------------
  // Starts editing fields on the form
  //------------------------------------------------------------------------------------------
  onStartEdit(product) {
    var _startDate = new Date(product.startDate).toISOString().substring(0, 10);
    var _endDate = new Date(product.endDate).toISOString().substring(0, 10);

    var _prod = {

      id: product._id,
      systemName: product.systemName,
      name: product.name,
      description: product.description,
      benefits: product.benefits,
      services: product.services,
      actualGoal: product.actualGoal,
      monthlyGoal: product.monthlyGoal,
      startDate: _startDate,
      endDate: _endDate,

      update: true
    };

    this.db.update({}, _prod);
    this.setState(_prod);
  }

  //------------------------------------------------------------------------------------------
  // Render fields on the form in order to be registered or edited
  //------------------------------------------------------------------------------------------
  renderFields() {

    const state = this.state;

    return (
      <div>
        <input name="id" value={state["id"]} type="hidden"
               className="form-control"/>

        <div className="row">
          <div className="admin-campo-medio-produto">
            <label>
              <label className="admin-label">{GLOBAL.prodAdmin.lblName}</label>
              <input type="text"
                     className="admin-input"
                     name="name"
                     value={state["name"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
          <div className="admin-campo-medio-produto">
            <label>
              <label
                className="admin-label">{GLOBAL.prodAdmin.lblSystName}</label>
              <input type="text"
                     className="admin-input"
                     name="systemName"
                     value={state["systemName"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
          <div className="admin-campo-pequeno">
            <label>
              <label
                className="admin-label">{GLOBAL.prodAdmin.lblMonthlyGoal}</label>
              <input type="text"
                     className="admin-input"
                     name="monthlyGoal"
                     value={state["monthlyGoal"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
          <div className="admin-campo-pequeno">
            <label>
              <label
                className="admin-label">{GLOBAL.prodAdmin.lblStartDate}</label>
              <input type="date"
                     className="admin-input"
                     name="startDate"
                     value={state["startDate"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
          <div className="admin-campo-pequeno">
            <label>
              <label
                className="admin-label">{GLOBAL.prodAdmin.lblEndDate}</label>
              <input type="date"
                     className="admin-input"
                     name="endDate"
                     value={state["endDate"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="admin-campo-medio-produto textarea-fix">
            <label>
              <label className="admin-label">{GLOBAL.prodAdmin.lblDesc}</label>
              {/*<input type="text"*/}
              {/*className="admin-input"*/}
              {/*name="description"*/}
              {/*value={state["description"]}*/}
              {/*onBlur={this._handleBlur}*/}
              {/*onChange={this._handleChange}/>*/}
              <textarea rows="3"
                        type="text"
                        className="admin-textarea"
                        name="description"
                        value={state["description"]}
                        onBlur={this._handleBlur}
                        onChange={this._handleChange}/>
            </label>
          </div>
          <div className="admin-campo-medio-produto">
            <label>
              <label className="admin-label">Serviços</label>
              <input type="text"
                     className="admin-input"
                     name="services"
                     value={state["services"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
              <button className="btn pull-right admin-botao-adicionar">
                Adicionar
              </button>
            </label>
          </div>
          <div className="admin-campo-medio-produto">
            <label>
              <label className="admin-label">Benefícios</label>
              <input type="text"
                     className="admin-input"
                     name="benefits"
                     value={state["benefits"]}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}/>
              <button className="btn pull-right admin-botao-adicionar">
                Adicionar
              </button>
            </label>
          </div>
        </div>

        {/*<input name="id" value={state["id"]} type="hidden" className="form-control" />*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblName}</span>*/}
        {/*<input type="text" name="name" value={state["name"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblSystName}</span>*/}
        {/*<input type="text" name="systemName" value={state["systemName"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblDesc}</span>*/}
        {/*<input type="text" name="description" value={state["description"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblBenef}</span>*/}
        {/*<input type="text" name="benefits" value={state["benefits"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblServices}</span>*/}
        {/*<input type="text" name="services" value={state["services"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblActualGoal}</span>*/}
        {/*<input type="number" name="actualGoal" value={state["actualGoal"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblMonthlyGoal}</span>*/}
        {/*<input type="number" name="monthlyGoal" value={state["monthlyGoal"]} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblStartDate}</span>*/}
        {/*<input type="date" name="startDate" value={state["startDate"]}*/}
        {/*className="form-control" onBlur={this._handleBlur}*/}
        {/*onChange={this._handleChange}/>*/}
        {/*</label>*/}
        {/*<label className="col-md-12">*/}
        {/*<span>{GLOBAL.prodAdmin.lblEndDate}</span>*/}
        {/*<input type="date" name="endDate" value={state["endDate"]}*/}
        {/*className="form-control" onBlur={this._handleBlur}*/}
        {/*onChange={this._handleChange}/>*/}
        {/*</label>*/}
        {/*<div className="admin-campo-grande">*/}
        {/*<label>*/}
        {/*<label*/}
        {/*className="admin-label">{GLOBAL.prodAdmin.lblServices}</label>*/}
        {/*<input type="text"*/}
        {/*className="admin-input"*/}
        {/*name="services"*/}
        {/*value={state["services"]}*/}
        {/*onBlur={this._handleBlur}*/}
        {/*onChange={this._handleChange}/>*/}
        {/*</label>*/}
        {/*</div>*/}
        {/*<div className="admin-campo-grande">*/}
        {/*<label>*/}
        {/*<label*/}
        {/*className="admin-label">{GLOBAL.prodAdmin.lblActualGoal}</label>*/}
        {/*<input type="text"*/}
        {/*className="admin-input"*/}
        {/*name="actualGoal"*/}
        {/*value={state["actualGoal"]}*/}
        {/*onBlur={this._handleBlur}*/}
        {/*onChange={this._handleChange}/>*/}
        {/*</label>*/}
        {/*</div>*/}

        { this.state.update ?
          <span>
                  <button className="admin-botao-produto-confirm btn pull-right"
                          onClick={() => this.onConfirmEdit()}>{GLOBAL.prodAdmin.btnUpdate}</button>
                  <button className="admin-botao-produto-cancel btn pull-right"
                          onClick={() => this.onCancelEdit()}>{GLOBAL.prodAdmin.btnCancel}</button>
                </span>
          :
          <button className="admin-botao-produto btn pull-right"
                  onClick={() => this._handleSubmit()}>{GLOBAL.prodAdmin.btnSubmit}</button>
        }
      </div>
    );
  }

  //------------------------------------------------------------------------------------------
  // Render table (header) with all records in database
  //------------------------------------------------------------------------------------------
  renderTable() {
    return (
      <table className="admin-tabela table">
        <thead>
        <th>{GLOBAL.prodAdmin.lblName}</th>
        <th>{GLOBAL.prodAdmin.lblSystName}</th>
        <th>{GLOBAL.prodAdmin.lblDesc}</th>
        <th>{GLOBAL.prodAdmin.lblActualGoal}</th>
        <th>{GLOBAL.prodAdmin.lblMonthlyGoal}</th>
        <th>{GLOBAL.prodAdmin.lblStartDate}</th>
        <th>{GLOBAL.prodAdmin.lblEndDate}</th>
        </thead>
        <tbody>
        {this.renderRows()}
        </tbody>
      </table>
    );
  }

  //------------------------------------------------------------------------------------------
  // Render table (values) with all records in database
  //------------------------------------------------------------------------------------------
  renderRows() {
    return this.props.productsList.map(product => {

      const { systemName, name, description, benefits, services, actualGoal, monthlyGoal, startDate, endDate } = product;

      var _startDate = moment(new Date(product.startDate).toISOString().substring(0, 10)).format('DD/MM/YYYY');
      var _endDate = moment(new Date(product.endDate).toISOString().substring(0, 10)).format('DD/MM/YYYY');

      return (
        <tr key={name}>
          <td className="tabela-produto-1">{name}</td>
          <td className="tabela-produto-2">{systemName}</td>
          <td className="tabela-produto-3">{description}</td>
          <td className="tabela-produto-4">{actualGoal}</td>
          <td className="tabela-produto-5">{monthlyGoal}</td>
          <td className="tabela-produto-6">{_startDate}</td>
          <td className="tabela-produto-7">{_endDate}</td>
          <td className="tabela-produto-8">
            <button className="tabela-editar fa fa-pencil-square-o"
                    onClick={() => this.onStartEdit(product)}/>
            <button
              className="tabela-apagar fa fa-trash onClick={() => this.onRemove(product)}"/>
            {/*<button className="botao-tabela btn-edit"*/}
            {/*onClick={() => this.onStartEdit(product)}>E*/}
            {/*</button>*/}
            {/*<button className="botao-tabela btn-danger"*/}
            {/*onClick={() => this.onRemove(product)}>R*/}
            {/*</button>*/}
          </td>
        </tr>
      );
    });
  }

  //------------------------------------------------------------------------------------------
  // Render form fields and table with all records in database
  //------------------------------------------------------------------------------------------
  render() {

    const state = this.state;
    return (
      <div className="admin-cadastro-corretor">
        <h1 className="cadastro-titulo">Cadastro produto</h1>

        {this.renderFields()}

        <div className="row">
          <div className="div-content-produtodetail">

            {/*{ this.state.update ?*/}
            {/*<span>*/}
            {/*<button className="btn btn-primary"*/}
            {/*onClick={() => this.onConfirmEdit()}>{GLOBAL.prodAdmin.btnUpdate}</button>*/}
            {/*<button className="btn btn-primary"*/}
            {/*onClick={() => this.onCancelEdit()}>{GLOBAL.prodAdmin.btnCancel}</button>*/}
            {/*</span>*/}
            {/*:*/}
            {/*<button className="btn btn-primary"*/}
            {/*onClick={() => this._handleSubmit()}>{GLOBAL.prodAdmin.btnSubmit}</button>*/}
            {/*}*/}

            {this.renderTable()}

          </div>
        </div>
      </div>
    );
  }
}

//------------------------------------------------------------------------------------------
// Render form fields and table with all records in database
//------------------------------------------------------------------------------------------
export default createContainer((props) => {

  const productsHandle = GlobalSubsManager('products.all');
  const productsList = Products.find({}).fetch().reverse();

  return {
    productsList,
    loading: !productsHandle.ready(),
    user: Meteor.user()
  }
}, AdminProduto);
