import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import MessagesList from '../Messages';
import CustomerList from '../CustomerList';
import './style.scss';

class QuotationList extends Component {

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

  //----------------------------------------------------------------------------------------------------
  // Calls summary profile when user clicks on any row
  //----------------------------------------------------------------------------------------------------
  _handleClick(quot) {
		browserHistory.push(`/summary-profile/${quot.customerId}/${quot.productName}`);
  }

	render() {
		const { listStyle, keyword, currentPage } = this.state;
		const { loading, quotationList } = this.props;

		if(loading)
			return (
				<div className="div-content col-md-12 loading"></div>
			);

		// <tr>
		// 	<th>{GLOBAL.quotations.lblColTitleName}</th>
		// 	<th>{GLOBAL.quotations.lblColTitleSource}</th>
		// 	<th>{GLOBAL.quotations.lblColTitleAquiredProds}</th>
		// </tr>

		// <td className="produtos">
		// 	{m.acquiredProducts.map((m, k2) => (
		// 		<i data-toggle="tooltip"
		// 			 title={m} className={GLOBAL.images.mapProductIcons[m]}
		// 			 key={`${k}_${k2}` /*GLOBAL.images.mapProductIcons[m]*/}
		// 			 aria-hidden="true"/>
		// 	))}
		// </td>

		return (
			<div className="row">
				<div className="div-content col-md-10">
					<div className="QuotationList__container">
					<div className="header">
						<h2>
							<i className="fa fa-angle-left" />
							<span>{GLOBAL.quotations.lblHeaderProduct}</span> {GLOBAL.mapProdNames[this.props.params.productName]}
						</h2>
						<span className="badge-qtd">
							<span><p>{quotationList.length}</p> contatos nessa lista</span>
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
						customers={quotationList}
						listStyle={listStyle}
						currentPage={currentPage}
						keyword={keyword}
						handleClick={this._handleClick}
					/>
					</div>
				</div>
				<div className="div-mensagens col-md-2">
					<MessagesList/>
				</div>
			</div>
		)
  }
}

export default createContainer((props) => {

  const quotationHandle = GlobalSubsManager('quotations.all');

  // Show only Quotations on initial phase
  const quotationList = Quotations.find({
    "brokerId": Meteor.userId(),
    "productName": props.params.productName,
    "phase": GLOBAL.initPhaseQuot
  }).fetch().reverse();

  if(Meteor.isClient) {

    var alreadyListed = Session.get('alreadyListed');

    if (!alreadyListed) {
      Meteor.call('customers.findTopAndInsert', Meteor.userId(), props.params.productName);
      Session.set('alreadyListed', true);
    }
  }

  return {
    quotationList,
    loading: !quotationHandle.ready(),
    user: Meteor.user()
  }
}, QuotationList);
