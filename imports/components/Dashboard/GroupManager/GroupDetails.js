import React, {Component, PropTypes} from 'react';
import CustomerList from '../CustomerList';

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listStyle: 'card',
      keyword: '',
      editable: this.props.editable,
      currentPage: 1
    };
    
    this._pageHandler = this._pageHandler.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this._pageHandler);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this._pageHandler);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      editable: nextProps.editable
    })
  }
  
  _handleClickList(style) {
    this.setState({listStyle: style})
  }
  
  _handleChangeKeyword(ev) {
    const keyword = ev.target.value;
    setTimeout(() => this.setState({keyword: keyword}), 500)
  }
  
  _pageHandler() {
    if (document.body.scrollTop + window.innerHeight + 1 >= document.body.scrollHeight) {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
    }
  }
  
  render() {
    const { listStyle, keyword, editable, currentPage } = this.state;
    const { group, groups, customers } = this.props;
    
    if(this.state.loading || this.props.loading)
      return (
        <div className="div-content col-md-12 loading"></div>
      );
    
    return (
      <div className="GroupDetails__container col-md-12">
        <div className="header">
          <h2>
            <i className="fa fa-angle-left" onClick={this.props.onBack.bind(this)}/>
            {group.name}
          </h2>
          <span className="badge-qtd">
						<span><p>{customers.length}</p> contatos nessa lista</span>
					</span>
          <div className="buttons-filter">
            <button
              className={`btn btn-default ${(listStyle == 'table' && 'active')}`}
              onClick={this._handleClickList.bind(this, 'table')}>
              <i className="fa fa-list" aria-hidden="true"/>
            </button>
            <button
              className={`btn btn-default ${(listStyle == 'card' && 'active')}`}
              onClick={this._handleClickList.bind(this, 'card')}>
              <i className="fa fa-th-large" aria-hidden="true"/>
            </button>
            <i className="fa fa-search pull-right" aria-hidden="true" style={{fontSize:'20px', marginRight:'55px'}}/>
            <input
              onChange={this._handleChangeKeyword.bind(this)}
              type="text"
              name="search"
              className="pull-right"/>
          </div>
        </div>
        <CustomerList
          customers={customers}
          listStyle={listStyle}
          currentPage={currentPage}
          keyword={keyword}
          editable={editable}
          showActionBar
          groups={groups}
        />
      </div>
    )
  }
}

GroupDetails.protoTypes = {
  editable: PropTypes.bool,								//OLD: Show editable groups
  group: PropTypes.object.isRequired,			//CurrentGroup selected
  onBack: PropTypes.func.isRequired 			//Handle back to ArvoreRelacionamento
};

export default GLOBAL.createContainer((props) => {
  const userFb = (((Meteor.user() || {}).services || {}).facebook || {});
  const subUser = GlobalSubsManager('user.selfProfile');
  const subCustomers = GlobalSubsManager('customers.all');
  
  let query = {};
  
  //Default Group / Parent Group / SubGroup Query
  if(props.group.isDefault) {
    query = {
      groupId: { $exists: false } //Não classificados
    }
  }
  else {
    if(!props.group.parentId) { //Master Groups need their childrens
      const childrenCostumer = props.group.childrens.map((g) => g._id);
      query = {
        groupId: {$in: childrenCostumer}
      };
    }
    else { //Simple children groups
      query = {
        groupId: props.group._id
      }
    }
  }
  
  query = {
    ...query,
    brokerId: userFb.id,
    //originId: {$in: ['face']}
  };
  
  return {
    ...props,
    customers: Customers.find(query, {sort: {name: 1}}).fetch(),
    customersProduct: AcquiredProducts.find(query, {sort: {name: 1}}).fetch(),
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready() || !subCustomers.ready()
  }
}, GroupDetails);
