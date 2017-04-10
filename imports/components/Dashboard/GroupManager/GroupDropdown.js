import React, {Component, PropTypes} from 'react';

class GroupDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groups: props.groups,
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			groups: nextProps.groups
		})
	}

	_removeGroup(group) {
		if(group) {
			Meteor.call('groups.delete', group._id, (err, res) => {
				if (res) {
					return swal('', "Grupo " + group.name + " removido. Contatos movidos para 'Não classificados'.", 'info');
				}
			})
		}
	}

	_createGroup(parentId) {
		const name = prompt('Nome do novo subgrupo:');
		const userId = Meteor.userId();

		if(name) {
			Meteor.call('groups.create', parentId, userId, name, (err, res) => {
				if(res)
					this._addCustomerToGroup(res);
			});
		}
		else {
			return swal('', "O nome não pode ser vazio.", 'error');
		}
	}

	_addCustomerToGroup(groupId) {
		const { selectedCustomers } = this.props;

		if(selectedCustomers) {
			const customers = Array.isArray(selectedCustomers) ? selectedCustomers : [selectedCustomers];
			console.log('addToGroup:', groupId, 'Customers:', customers);

			Meteor.call('groups.moveCustomers', customers, groupId, (err, res) => {
				if(!err && res) {
					swal('', customers.length + " contato(s) movido(s).", 'success');
				}
			})
		}
	}

	render() {
		const { groups, loading } = this.state;
		const { alignClass } = this.props;

		if(!groups || loading)
			return (
				<div className="GroupDropdown__container dropdown"></div>
			);

		return (
			<div className="GroupDropdown__container dropdown">
				{this.props.children}
				<ul className={`dropdown-menu ${alignClass}`} style={{display:'block'}}>
					{groups.map((group, key) => {
						if(group.editable)
							return (
								<li key={key} className="dropdown-submenu">
									<a className="dropdown-toggle">
										<i className="fa fa-caret-left"/>
										{group.name}
									</a>
									<ul className={`dropdown-menu ${(loading && 'loading')}`}>
										{group.childrens && group.childrens.map((subgroup, key2) =>
											<li key={key2}>
												<a onClick={this._addCustomerToGroup.bind(this, subgroup._id)}>
													{subgroup.name}
												</a>
												<i className="fa fa-remove"
													 onClick={this._removeGroup.bind(this, subgroup)}/>
											</li>
										)}
										{group.childrens.length < 3 &&
										<li onClick={this._createGroup.bind(this, group._id)}>
											<a style={{color:'#28b473'}}>Novo Grupo <i className="fa fa-plus"/></a>
										</li>
										}
									</ul>
								</li>
							)
					})}
				</ul>
			</div>
		)
	}
}

GroupDropdown.protoTypes = {
	groups: PropTypes.array.isRequired,							//Threaded Groups from broker
	selectedCustomers: PropTypes.array.isRequired, 	//Optional. Default: selectedCustomers
	alignClass: PropTypes.string, 									//top / bottom, right / left
};

export default GroupDropdown;
