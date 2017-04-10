import React, {Component, PropTypes} from 'react';
import ArvoreRelacionamento from './ArvoreRelacionamento';
import GroupDetails from './GroupDetails';
import MessagesList from '../Messages';
import './style.scss';

class GroupManager extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentPage: 'tree',
      currentGroup: false,
      groups: [],
      customers: [],
      loading: false
    };
    
    this._handleClickGroup = this._handleClickGroup.bind(this);
    this._handleClickBack = this._handleClickBack.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.groups || [],
      customers: nextProps.customers || []
    });
  }
  
  _handleClickGroup(group) {
    this.setState({
      currentPage: 'details',
      currentGroup: group
    });
  }
  
  _handleClickBack() {
    this.setState({
      currentPage: 'tree',
      currentGroup: false
    });
  }
  
  _renderContent() {
    const { groups, customers, currentPage, currentGroup } = this.state;
    const { facebookProfile } = this.props;
    
    if(this.state.loading || this.props.loading)
      return (
        <div className="div-content col-md-12 loading"></div>
      );
    
    switch (currentPage) {
      case 'tree':
        return (
          <ArvoreRelacionamento
            customers={customers}
            groups={groups}
            facebookProfile={facebookProfile}
            handleClick={this._handleClickGroup}>
          </ArvoreRelacionamento>
        );
        break;
      case 'details':
        return (
          <GroupDetails
            group={currentGroup}
            groups={groups}
            onBack={this._handleClickBack}
          />
        );
        break;
    }
  }
  
  render() {
    return (
      <div className="row">
        <div className="div-content col-md-10">
          {this._renderContent()}
        </div>
        <div className="div-mensagens col-md-2">
          <MessagesList/>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer((props) => {
  const userFb = (((Meteor.user() || {}).services || {}).facebook || {});
  const subUser = GlobalSubsManager('user.selfProfile');
  const subGroups = GlobalSubsManager('groups.threaded');
  const subCustomers = GlobalSubsManager('customers.all');
  
  //Groups relationship client-side
  const groups = Groups.find({}).fetch();
  const grouped = _.groupBy(groups, 'parentId');
  const groupsThreaded = _.map(grouped['null'], function (group, id) {
    return {
      ...group,
      childrens: (grouped[group._id] || [])
    };
  });
  
  return {
    ...props,
    user: Meteor.user() || {},
    groups: groupsThreaded,
    customers: Customers.find({ brokerId: userFb.id }).fetch(), //originId: {$in: ['face']}
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready() || !subGroups.ready() || !subCustomers.ready() || !groupsThreaded.length
  }
}, GroupManager);
