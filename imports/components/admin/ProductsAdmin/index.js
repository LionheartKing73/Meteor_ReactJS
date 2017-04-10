import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ProductsAdmin extends Component {

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
      opType: 'insert',
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
      endDate: '',
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
    const _startDate = new Date(product.startDate).toISOString().substring(0, 10);
    const _endDate = new Date(product.endDate).toISOString().substring(0, 10);

    const _prod = {

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

      update: true,
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
      <div className="form-group">
        <input name="id" value={state.id} type="hidden" className="form-control" />
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblName}</span>
          <input type="text" name="name" value={state.name} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblSystName}</span>
          <input type="text" name="systemName" value={state.systemName} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblDesc}</span>
          <input type="text" name="description" value={state.description} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblBenef}</span>
          <input type="text" name="benefits" value={state.benefits} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblServices}</span>
          <input type="text" name="services" value={state.services} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblActualGoal}</span>
          <input type="number" name="actualGoal" value={state.actualGoal} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblMonthlyGoal}</span>
          <input type="number" name="monthlyGoal" value={state.monthlyGoal} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblStartDate}</span>
          <input type="date" name="startDate" value={state.startDate} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <label className="col-md-12">
          <span>{GLOBAL.prodAdmin.lblEndDate}</span>
          <input type="date" name="endDate" value={state.endDate} className="form-control" onBlur={this._handleBlur} onChange={this._handleChange} />
        </label>
        <span><br />&nbsp;</span>
      </div>
    );
  }

  //------------------------------------------------------------------------------------------
  // Render table (header) with all records in database
  //------------------------------------------------------------------------------------------
  renderTable() {
    return (
      <table className="table">
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
    return this.props.productsList.map((product) => {
      const { systemName, name, description, benefits, services, actualGoal, monthlyGoal, startDate, endDate } = product;

      const _startDate = moment(new Date(product.startDate).toISOString().substring(0, 10)).format('DD/MM/YYYY');
      const _endDate = moment(new Date(product.endDate).toISOString().substring(0, 10)).format('DD/MM/YYYY');

      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{systemName}</td>
          <td>{description}</td>
          <td>{actualGoal}</td>
          <td>{monthlyGoal}</td>
          <td>{_startDate}</td>
          <td>{_endDate}</td>
          <td><button className="btn btn-edit" onClick={() => this.onStartEdit(product)}>{GLOBAL.prodAdmin.btnEditRow}</button></td>
          <td><button className="btn btn-danger" onClick={() => this.onRemove(product)}>{GLOBAL.prodAdmin.btnRemoveRow}</button></td>
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
      <div id="div-main">
        <div className="row">
          <div className="div-content col-md-10">
            <div className="div-content-produtodetail">
              {this.renderFields()}
              { this.state.update ?
                <span>
                  <button className="btn btn-primary" onClick={() => this.onConfirmEdit()}>{GLOBAL.prodAdmin.btnUpdate}</button>
                  <button className="btn btn-primary" onClick={() => this.onCancelEdit()}>{GLOBAL.prodAdmin.btnCancel}</button>
                </span>
                :
                <button className="btn btn-primary" onClick={() => this._handleSubmit()}>{GLOBAL.prodAdmin.btnSubmit}</button>
              }
              <span><br />&nbsp;</span>
              {this.renderTable()}
            </div>
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
    user: Meteor.user(),
  };
}, ProductsAdmin);
