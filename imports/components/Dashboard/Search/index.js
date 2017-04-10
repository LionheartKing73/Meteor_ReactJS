import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CustomerList from '../CustomerList';
import MessagesList from '../../Dashboard/Messages';
import { browserHistory } from 'react-router';
import Select from 'react-select';
import './style.scss';

const typeOptions = [
  { label: 'CPF', value: 'CPF' },
  { label: 'Nome', value: 'name' },
  { label: 'Número da Cotação', value: 'quoteNum' },
  { label: 'Número da Proposta', value: 'propNum' },
];

const periodOptions = [
  { label: '7 dias', value: 7 },
  { label: '15 dias', value: 15 },
  { label: '30 dias', value: 30 },
  { label: 'Nenhum', value: 0 }
];

const productOptions = [
  { label: 'Seguro Auto', value: 'seguro-auto' },
  { label: 'Alarme Mais', value: 'alarme-mais' },
  { label: 'Carro Fácil', value: 'carroFacil' },
  { label: 'Conecta', value: 'conecta' },
  { label: 'Nenhum', value: 'empty' }
];

const contractTypeOptions = [
  { label: 'Apólice', value: 'apolice' },
  { label: 'Cotação', value: 'cotacao' },
  { label: 'Proposta', value: 'proposta' },
  { label: 'Contrato', value: 'contrato' },
  { label: 'Nenhum', value: 'empty' }
];

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStyle: 'card',
      editable: this.props.editable,
      currentPage: 1,
      keyword: this.props.keyword
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
  
  //@return quotation/proposal
  getContractType(quotation) {
    if(quotation.values) {
      if(quotation.values.ofertaFinal) {
        return 'proposal';
      }
    }
    return 'quotation';
  }
  
  getQuotationStatus(quotation) {
    //Em preenchimento / Em negociação / Concluido
    if(quotation.values) {
      if(quotation.values.ofertaFinal) {
        return 'concluido';
      }
      else if(quotation.values.veiculoDesejado)
        return 'negociacao';
      else
        return 'preenchimento';
    }
    return 'preenchimento';
  }
  
  getProposalStatus(quotation) {
    //Em preenchimento / Em transmissão / Concluido
    if(quotation.values) {
      if(quotation.values.classificar) {
        return 'transmissao';
      }
    }
    return 'preenchimento';
  }

  _handleChangeKeyword(ev) {
    const keyword = ev.target.value;
    setTimeout(() => {Session.set('SEARCH.keyword', keyword)}, 500);
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
    const { listStyle, currentPage } = this.state;
    const {
      loading,
      type,
      quotations,
      period,
      keyword,
      product
    } = this.props;
    
    //quotations

    if(loading)
      return (
        <div className="div-content col-md-12 loading"></div>
      );

    return (
      <div className="row">
        <div className="div-content col-md-10">
          <div className="Search__container">
          <div className="header">
            <h2>
              <span>Busca</span>
            </h2>
            <span className="badge-qtd">
              <span><p>{(quotations || {}).length}</p>contatos nessa lista</span>
            </span>
            <div className="buttons-filter">

              <Select
                name="product"
                options={productOptions}
                value={product}
                className="product"
                placeholder="Produto"
                noResultsText="Produto"
                clearable={false}
                onChange={({ label, value }) => {
                  Session.set('SEARCH.productName', value)
                }}
              />
            </div>
          </div>
          <CustomerList
            customers={quotations}
            listStyle={listStyle}
            currentPage={currentPage}
            handleClick={this._handleClick}
            showActionBar
          >
            <div>
              <Select
                name="type"
                className="pull-right"
                options={typeOptions}
                value={type}
                placeholder="Tipo"
                noResultsText="Tipo"
                onChange={({ label, value }) => {
                  Session.set('SEARCH.type', value)
                }}
              />
            </div>
            <div>
              <i className="search-btn fa fa-search pull-right"
                 aria-hidden="true"
              />
              <input
                onChange={this._handleChangeKeyword.bind(this)}
                defaultValue={keyword}
                type="text"
                name="search"
                className="search-type pull-right"/>
            </div>
          </CustomerList>
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
	const brokerId = Meteor.userId(); //FIXME: FacebookId
  const subCustomers = GlobalSubsManager('customers.all');
  const subQuotations = GlobalSubsManager('quotations.all');
  const keyword = Session.get('SEARCH.keyword') || '';
	const type = Session.get('SEARCH.type') || 'CPF';
  const period = Session.get('SEARCH.period') || 0;
  const product = Session.get('SEARCH.productName') || 'carroFacil';

  let queryFilter = {brokerId: brokerId},
      queryQuotations = {
        'values.ofertaFinal': {$exists: true}
      },
      queryProposals = {
        'values.ofertaFinal': {$exists: false}
      };
  
  if(keyword) {
  	switch(type) {
		  case 'CPF':
        queryFilter = {
				  ...queryFilter,
		      'values.dadosDoCliente.CPF': new RegExp(`.*?${keyword}.*?`, 'mig'),
			  };
			  break;
		  case 'name':
        queryFilter = {
          ...queryFilter,
          $or: [
            {'values.dadosDoCliente.name': new RegExp(`.*?${keyword}.*?`, 'mig')},
            {'customerName': new RegExp(`.*?${keyword}.*?`, 'mig')},
          ]
			  };
        break;
      case 'quoteNum':
        queryFilter = {
          ...queryFilter,
          quoteNum: parseInt(keyword)
        };
        break;
      case 'propNum':
        queryFilter = {
          ...queryFilter,
          quoteNum: parseInt(keyword)
        };
        break;
	  }
  }

  if(product && product != 'empty') {
    queryFilter = {
      ...queryFilter,
      productName: product
    }
  }
  
  //Quotations Query
  queryQuotations = {
    ...queryQuotations,
    ...queryFilter
  };
  
  //Proposals Query
  queryProposals = {
    ...queryProposals,
    ...queryFilter
  };
  
  const query = {$or: [queryQuotations, queryProposals]}

  return {
  	...props,
	  customers: Customers.find().fetch(),
    quotations: Quotations.find(query).fetch(),
    loading: !subCustomers.ready() || !subQuotations.ready(),
    user: Meteor.user(),

    //Query Params
    keyword,
    type,
    period,
    product,
  }
}, Search);
