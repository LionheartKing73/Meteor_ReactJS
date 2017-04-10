import React, {Component, PropTypes} from 'react';
import GroupDropdown from '../GroupManager/GroupDropdown';

class Table extends Component {
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
		// 	{m.acquiredProducts.map((m, k2) => (
		// 		<i data-toggle="tooltip"
		// 			 title={m} className={GLOBAL.images.mapProductIcons[m]}
		// 			 key={`${k}_${k2}` /*GLOBAL.images.mapProductIcons[m]*/}
		// 			 aria-hidden="true"/>
		// 	))}
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
			default:
				return '';
				break;
		}
	}

	render() {
		const { customer, groups } = this.props;
		const { selected, active } = this.state;
		const fullName = [(customer.name || ''), (customer.customerName || ''), (customer.surname || '')].join(" ");

		return (
			<tr
				className={`${(selected && 'selected')}`}
				key={customer._id}>
				<td onClick={this.props.handleClick}>
					{fullName}
				</td>
				<td>
					{groups &&
					<div className={`actions ${(active && 'active')}`}>
						<i className={`icon-actions fa fa-ellipsis-v ${(active && 'hidden')}`}
							 onClick={this._handleClickActions.bind(this)}/>
						{selected &&
						<GroupDropdown
							customerId={[customer._id]}
							groups={groups}
							selectedCustomers={customer._id}>
						</GroupDropdown>}
						{selected &&
						<div className="overlay"
								 onClick={this._handleClickActions.bind(this)}/>}
					</div>
					}
				</td>
				<td>{customer.originId || customer.source}</td>
				<td className="produtos">
					{customer.acquiredProducts && customer.acquiredProducts.map((p, k) => this._getProductIcon(p, k))}
				</td>
			</tr>
		)
	}
}

Table.protoTypes = {
	customer: PropTypes.object.isRequired,	//Current Customer
	handleClick: PropTypes.func,					//Customer Click callback
	groups: PropTypes.array 							//TEMP: Dropdown groups
};

export default Table;
