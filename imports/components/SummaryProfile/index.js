import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import CustomerHeader from './customerHeader';
import SummaryProfileTabs from './summaryProfileTabs';
import ModalClassify from './classify';
import ModalAnnotations from './annotations';
import Argumentacoes from '../Nimble/components/Argumentacoes';

class SummaryProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startQuot() {
    const custDoc = {
      customerId: this.props.params.customerId,
      productName: this.props.params.productName,
    };

    Session.set('currentQuotation', custDoc);
    Router.push(`/nimble/${custDoc.productName}/${custDoc.customerId}`);
  }

  productFooter() {
    return (
      <div className="header-produto">
        <div>
          <button type="button" className="btn">
            <i data-toggle="tooltip" title="Auto" className="fa fa-car" aria-hidden="true" />
            <div>
              <span>Produto</span>
              <h1>Carro fácil</h1>
            </div>
          </button>
        </div>
        <ModalAnnotations customerId={this.props.params.customerId} productName={this.props.params.productName}/>
        <ModalClassify customerId={this.props.params.customerId} productName={this.props.params.productName}/>
        <a className="btn btn-classificar pull-right" id="ini" onClick={() => this.startQuot()}>Iniciar Cotação</a>
      </div>
    );
  }

  render() {
    const { loading } = this.props;

    if(loading)
      return (
        <div className="loading"></div>
      );
    else {
      return (
        <div className="row">
          <div className="div-content  col-md-10">
            <CustomerHeader customerId={this.props.params.customerId} productName={this.props.params.productName}/>
            <SummaryProfileTabs customerId={this.props.params.customerId} productName={this.props.params.productName}/>
            { this.productFooter() }
          </div>
          <Argumentacoes />
        </div>
      );
    }
  }
}

export default connect(state => state.nimble)(SummaryProfile);
