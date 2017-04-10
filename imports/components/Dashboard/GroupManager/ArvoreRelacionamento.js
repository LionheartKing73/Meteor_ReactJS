import React, { Component, PropTypes } from 'react';
import GroupCircle from './GroupCircle';

class ArvoreRelacionamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: this.props.groups,
      customers: this.props.customers,
    };

    this._handleClickGroup = this._handleClickGroup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groups) {
      this.setState({ groups: nextProps.groups });
    }
    if (nextProps.customers) {
      this.setState({ customers: nextProps.customers });
    }
  }

  _handleClickGroup(group) {
    this.props.handleClick(group);
  }

  render() {
    const { groups, customers } = this.state;
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
    const _rotate = key => (360 / groups.length) * key;
    const _subgroupRotate = key => ((360 / groups.length) * -1) + ((360 / groups.length) * key);
    const _getTotalCostumers = (group) => {
      if (group.isDefault) {
      	return customers.filter(c => !c.groupId).length;
      } // Costumers without groupId

      let total = customers.filter(c => (c.groupId && c.groupId == group._id)).length;
      if (group.childrens && group.childrens.length) {
        group.childrens.map(g => total += customers.filter(c => (c.groupId && c.groupId == g._id)).length);
      }
      return total;
    };

    return (
      <div className="ArvoreRelacionamento__container col-md-12">
        <div className="header">
          <h2>
						Árvore de Relacionamento
					</h2>
        </div>

        <div className="teia">
          <div className="img-arv" style={{ backgroundImage: `url(${userPic})` }} />
          {groups && groups.map(
						(group, key) =>
							<GroupCircle
								key={key}
								group={group}
								rotate={_rotate(key)}
								chave={key}
								labelRotate={_rotate(key * -1)}
								total={_getTotalCostumers(group)}
								handleClick={this._handleClickGroup}>
									{group.childrens && group.childrens.map(
										(subgroup, key2) =>
											<GroupCircle
												key={key2}
												group={subgroup}
												rotate={(_subgroupRotate(key2))}
												chave={key2}
												labelRotate={(_rotate(key) + _subgroupRotate(key2)) * -1}
												total={_getTotalCostumers(subgroup)}
												handleClick={this._handleClickGroup}
											/>
									)}
  						</GroupCircle>
					)}
        </div>
        {this.props.children}
      </div>
    );
  }
}

ArvoreRelacionamento.protoTypes = {
  groups: PropTypes.array.isRequired,
};

export default ArvoreRelacionamento;
