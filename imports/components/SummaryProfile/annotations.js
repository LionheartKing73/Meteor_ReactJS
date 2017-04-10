import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const options = {
  page: 1,  // which page you want to show as default

  sizePerPage: 5,  // which size per page you want to locate as default
  pageStartIndex: 1, // where to start counting the pages
  paginationSize: 5,  // the pagination bar size.
  prePage: 'Anterior', // Previous page button text
  nextPage: 'Próximo', // Next page button text
  firstPage: 'Primeiro', // First page button text
  lastPage: 'Último', // Last page button text
  paginationShowsTotal: false,
  noDataText: 'Não existem anotações!',
  hideSizePerPage: true,
};

class ModalAnnotations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  //----------------------------------------------------------------------------------------------------------
  // When changed status show/hide specific fields on screen
  //----------------------------------------------------------------------------------------------------------
  _handleChange(ev) {
    const { name, value } = ev.target;

    this.setState({
      [name]: value,
    });
  }

  /**
   * @memberOf ModalAnnotations
   * @summary Add new Annotation for current quotation
   * @param {event} event - Event which called function
   */
  _handleSubmitAnnot(event) {
    event.preventDefault();

    const annotation = this.state.annotation;

    Meteor.call('annotations.insert', this.props.customerId, Meteor.userId(), this.props.productName, annotation, (error, result) => {
      this.setState({ annotation: '' });
    });
  }


  render() {

    const annotation = this.state.annotation;

    return (

      <div className="pull-right">
        <button type="button"
								className="btn btn-classificar pull-right"
								data-toggle="modal"
								data-target="#modalAnotacoes"
								data-backdrop="false">
					Anotações
				</button>

        <div id="modalAnotacoes" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Anotações</h4>
              </div>
              <div className="modal-body">

                <BootstrapTable data={this.props.annotsList} pagination options={options} striped hover>
                  <TableHeaderColumn isKey dataField="dateFormatOk" width={'150px'}>Data </TableHeaderColumn>
                  <TableHeaderColumn dataField="phase" width={'200px'}>Fase </TableHeaderColumn>
                  <TableHeaderColumn dataField="description">Descrição </TableHeaderColumn>
                </BootstrapTable>

                <div className="form-group">
                  <label htmlFor="comment">Anotação:</label>
                  <textarea className="form-control" rows="3" name="annotation" value={annotation} onChange={ev => this._handleChange(ev)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-default btn-primary" onClick={this._handleSubmitAnnot.bind(this)}>Adicionar</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    );

  }

}

export default createContainer((props) => {

  const custId = props.customerId;
  const prodName = props.productName;

  const queryAnnots = { brokerId: Meteor.userId(), customerId: custId, productName: prodName };

  const annotsHandle = GlobalSubsManager('annotations.all');
  const annotsList = Annotations.find(queryAnnots).fetch().reverse();

  // Formats date in order to be displayed in table
  for (let i = 0; i < annotsList.length; i++) {
    const singleItem = annotsList[i];
    singleItem.dateFormatOk = moment(new Date(annotsList[i].date).toISOString().substring(0, 10)).format('DD/MM/YYYY');
  }

  return {
    annotsList,
    loading: !annotsHandle.ready(),
    user: Meteor.user(),
  };
}, ModalAnnotations);
