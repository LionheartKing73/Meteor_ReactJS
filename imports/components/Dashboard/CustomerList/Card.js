import React, {Component, PropTypes} from 'react';
import GroupDropdown from '../GroupManager/GroupDropdown';

class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			selected: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selected: nextProps.selected
		})
	}

	_handleClickActions() {
		this.setState({
			selected: !this.state.selected
		})
	}

	_getProductIcon(type, key = 0) {
		switch(type) {
			case 'conecta':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Conecta"/>;
				break;
			case 'seguro-auto':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Seguro-Auto"/>;
				break;
			case 'carro-facil':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Carro Fácil"/>;
				break;
      case 'carroFacil':
        return <i key={key} className="fa fa-car" aria-hidden="true" title="Carro Fácil"/>;
        break;
			case 'alarme-mais':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Alarme-Mais"/>;
				break;
			case 'Apartamento':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Apartamento"/>;
				break;
			case 'casa':
				return <i key={key} className="fa fa-car" aria-hidden="true" title="Casa"/>;
				break;
			case 'Veículo':
				return <i key={key} data-toggle="tooltip" className="fa fa-car" aria-hidden="true" title="Veículo"/>;
				break;
			default:
				return <i key={key} data-toggle="tooltip" className="fa fa-car" aria-hidden="true" title="A Fácil"/>;
				break;
		}
	}

	_getSourceIcon(type, key = 0) {
		switch(type) {
			case 'face':
				return <i key={key} className="fa fa-facebook" aria-hidden="true" title="Facebook"/>;
				break;
			case 'linkedin':
				return <i key={key} className="fa fa-linkedin" aria-hidden="true" title="LinkedIn"/>;
				break;
			case 'cloud':
				return <i key={key} className="fa fa fa-cloud" aria-hidden="true" title="Cloud"/>;
				break;
			default:
				return <i key={key} className="fa fa fa-cloud" aria-hidden="true" title="Cloud"/>;
				break;
		}
	}
  
  _getCustomerType(data) {
    if(data.values) {
      if(data.values.ofertaFinal) {
        return 'Proposta';
      }
      return 'Cotação';
    }
    return false;
  };
	
	//TEMP
  getQuotationStatus(quotation) {
    //Em preenchimento / Em negociação / Concluido
    if(quotation.values) {
      if(quotation.values.ofertaFinal) {
        return 'Concluído';
      }
      else if(quotation.values.veiculoDesejado)
        return 'Em negociação';
      else
        return 'Em preenchimento';
    }
    return 'Em preenchimento';
  }
  
  //TEMP
  getProposalStatus(quotation) {
    //Em preenchimento / Em transmissão / Concluido
    if(quotation.values) {
      if(quotation.values.classificar) {
        return 'Em transmissão';
      }
    }
    return 'Em preenchimento';
  }
  
  //TEMP
  _getStatus(quotation) {
    const type = this._getCustomerType(quotation);
    if(type == 'Proposta') {
      return this.getProposalStatus(quotation);
    }
    return this.getQuotationStatus(quotation);
  }
	
	_sanitizeCustomer(data) {
	  let customer = (data.customer || data);
    const fullName =
      [
        (customer.name || ''),
        (customer.customerName || ''),
        (customer.surname || '')
      ].join(" ").trim().split(" ");
    const firstName = fullName.shift();
    const lastName = fullName.pop();
    
	  customer = {
	    ...customer,
      originId: (customer.originId || customer.source),
      fullName,
      firstName,
      lastName,
      simpleName: `${firstName} ${(lastName != undefined && lastName != firstName) ? lastName : ''}`,
      CPF: ((data.values || {}).dadosDoCliente || {}).CPF || false,
      type: this._getCustomerType(data),
      quoteNum: data.quoteNum || false,
      productName: data.productName || false,
      status: this._getStatus(data)
    };
	  return customer;
  }

	render() {
		const { groups } = this.props;
		const { selected, active } = this.state;
		const customer = this._sanitizeCustomer(this.props.customer);
		const avatarStyle = customer.avatar ? {backgroundImage: `url(${customer.avatar})`} : {};

		return (
			<div className="Card__container col-md-3"
					 key={customer._id}>
				<div className={`card ${(selected && 'selected')}`}>
					<div className="header-card">
						{groups &&
						<div className={`actions ${(active && 'active')}`}>
							<i className={`icon-actions fa fa-ellipsis-v ${(active && 'hidden')}`}
								 onClick={this._handleClickActions.bind(this)}/>
							{selected &&
							<GroupDropdown
								groups={groups}
								selectedCustomers={customer._id}>
							</GroupDropdown>}
							{selected && 
							<div className="overlay"
									 onClick={this._handleClickActions.bind(this)}/>}
						</div>
						}
            {customer.productName && <div className="icon-prod">{this._getProductIcon(customer.productName)}</div> }
						<div className="icon-base">
							{this._getSourceIcon(customer.originId)}
						</div>
						<div className="customer-avatar"
								 style={avatarStyle}
								 onClick={this.props.handleClick}/>
						<h2 onClick={this.props.handleClick}>
              {`${customer.simpleName}`}
							{customer.CPF &&
              <small style={{display:'block',marginTop:'5px'}}>{customer.CPF}</small>
              }
						</h2>
            {customer.quoteNum &&
            <div className="customer-additional">
              <small>{customer.type || 'ID'}: {customer.quoteNum}</small>
              <small>Status: {customer.status}</small>
            </div>
            }
					</div>
					<div className="info-card">
						<div className="col-md-12">
              {customer.acquiredProducts &&
              <div className="pull-left">
								<p>
									<span>Produtos: {customer.acquiredProducts.length || 0}</span>
								</p>
								<div className="icons-prod">
									{customer.acquiredProducts.map((p, k) => this._getProductIcon(p, k))}
								</div>
							</div>}

							{customer.potencial &&
							<div className="pull-right">
								<p>
									<span>Potencial: 0</span>
								</p>
								<div className="icons-prod">
									<i data-toggle="tooltip" title="" className="fa fa-credit-card-alt" aria-hidden="true"
										 data-original-title="Cartão"/>
									<i data-toggle="tooltip" title="" className="fa fa-car" aria-hidden="true"
										 data-original-title="Auto"/>
								</div>
							</div>
							}
							
              {customer.type &&
              <h3 className="text-center" style={{margin:0}}>{customer.type}</h3>
              }
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Card.defaultProps = {
	selected: false
};

Card.protoTypes = {
	customer: PropTypes.object.isRequired,	//Current Customer
	products: PropTypes.array,							//TEMP: acquiredProducts
	handleClick: PropTypes.func,						//Customer Click callback
	groups: PropTypes.array 								//TEMP: Dropdown groups
};

export default Card;
