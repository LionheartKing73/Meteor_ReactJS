import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ModalClassify from './classify';
import ModalAnnotations from './annotations';

class CustomerHeader extends Component {

  constructor(props) {
    super(props);
  }

  completeProfile() {
    const custDoc = {
      customerId: this.props.custDoc._id
      // productName: this.props.params.productName,
    };

    Session.set('customerDoc', custDoc);
    Router.push('/complete-profile');
  }

  render() {
    const { loading, custDoc = {}} = this.props;

    if (loading) {
      return (
        <div className="navbar-venda loading"/>
      );
    }

    return (
      <div className="navbar-venda">
        <div className="navbar-venda-lead">
          <img src="/img/lead.jpg"/>
          <div className="info-main">
            <span>Cliente</span>
            <p>{custDoc.name}</p>
          </div>
          <div>
            <p className="telefone">
              <span>Telefone:</span>
              <select className="form-control" id="sel1">
                <option>{custDoc.mobilePhone}</option>
                <option>{custDoc.homePhone}</option>
                <option>{custDoc.workPhone}</option>
              </select>
            </p>
            <p>
							<span style={{marginBottom:'12px'}}>Email:</span> {custDoc.homeEmail}
						</p>
          </div>
          <div className="div-btn-cotacao">
						{this.props.isNimble !== true &&
							<button
								type="button"
								onClick={() => this.completeProfile()}
								style={{color:'#fff', backgroundColor: '#004e70', fontWeight: 100}}
								className="btn btn-classificar pull-left btn-perfil-completo">
							Perfil completo
							</button>}
						{this.props.isNimble === true &&
							<ModalAnnotations customerId={this.props.custId} productName={this.props.prodName}/>}
						{this.props.isNimble === true &&
							<ModalClassify customerId={this.props.custId} productName={this.props.prodName}/>}
          </div>
        </div>

				{this.props.isNimble &&
				<div className="pull-right navbar-venda-produto">
					<i title="Auto" className="fa fa-car" aria-hidden="true"/>
					<div className="info-main">
						<span>Ofertando</span>
						<p>Carro fácil</p>
					</div>
				</div>
				}

      </div>
    );
  }

}

export default createContainer((props) => {
  const customersHandle = GlobalSubsManager('customers.all');

  // if (!props.customerId) return {};

  let custId, prodName;

  //-------------------------------------
  // Comes from Summary profile
  //-------------------------------------
  if (props.customerId) {
    custId = props.customerId;
    prodName = props.productName;
  } else {
    //-------------------------------------
    // Comes from Nimble
    //-------------------------------------
    const objCust = Session.get('currentQuotation') || {};
    custId = objCust.customerId;
    prodName = objCust.productName;
  }

  const custDoc = (custId) ? Customers.findOne({ _id: custId }) : {};

  return {

    custDoc, custId, prodName,
    loading: !customersHandle.ready(),
    user: Meteor.user(),

    profile: (Meteor.user() || {}).profile || {},
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},

  };
}, CustomerHeader);
