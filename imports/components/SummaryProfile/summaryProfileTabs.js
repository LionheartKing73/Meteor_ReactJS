import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class SummaryProfileTabs extends Component {

  constructor(props) {
    super(props);
  }

  renderCustSummary() {
    const custDoc = this.props.customerDoc || {};
    const vehicle = this.props.goodsVehicles || {};

    return (

      <div role="tabpanel" className="tab-pane active" id="custSummary">
        <div id="bens" className="tab-pane">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="col-md-12">

                  <div className="col-md-12 group-info">
                    <div className="group-info-card info-pessoais info-pessoais--maxwidth">

                      {custDoc.maritalStatus ?
                        <div className="info-pessoais__infocard">
                          <img src="/icons/estadocivil.png" />
                          <span>Estado Civil:</span>
                          <p>{custDoc.maritalStatus}</p>
                        </div>
                        : ''}
                      {custDoc.birthday ?
                        <div className="info-pessoais__infocard">
                          <img src="/icons/idade.png" />
                          <span>Idade:</span>
                          <p>{Utils.getAge(custDoc.birthday)}</p>
                        </div>
                        : ''}
                      {custDoc.position ?
                        <div className="info-pessoais__infocard">
                          <img src="/icons/profissao.png" />
                          <span>Profissão:</span>
                          <p>{custDoc.position}</p>
                        </div>
                        : ''}
                      {custDoc.company ?
                        <div className="info-pessoais__infocard">
                          <img src="/icons/empresa.png" />
                          <span>Empresa:</span>
                          <p>{custDoc.company}</p>
                        </div>
                        : ''}
                      {custDoc.income ?
                        <div className="info-pessoais__infocard">
                          <img src="/icons/renda.png" />
                          <span>Renda:</span>
                          <p>{custDoc.income}</p>
                        </div>
                        : ''}
                      {custDoc.children ?
                        <div>
                          <div className="info-pessoais__infocard">
                            <img src="/icons/qtd-filhos.png" />
                            <span>Quantidade de filhos:</span>
                            <p>{custDoc.children.length}</p>
                          </div>
                          {(custDoc.children || []).map((child, k) =>
                            <div key={k} className="info-pessoais__infocard">
                              <img src="/icons/filhos.png" />
                              <span>Idade:</span>
                              <p>{child.age} anos</p>
                            </div>,
                          )}
                        </div>
                        : ''}
                      <div className="info-pessoais__infocard">
                        <img src="/icons/clienteporto.png" />
                        <span>Cliente Porto:</span>
                        <p>Sim</p>
                      </div>
                      <div className="info-pessoais__infocard">
                        <img src="/icons/cartao-porto.png" />
                        <span>Possui cartão Porto:</span>
                        <p>Não</p>
                      </div>

                    </div>
                  </div>

                  {vehicle ?
                    <div className="col-md-12 group-info">
                      <div className="group-info-card info-pessoais">
                        <div className="info-pessoais__infocard">
                          <img src="/icons/modelo-veiculo.png" />
                          <span>Veículo/Modelo:</span>
                          <p>{vehicle.vehicModel}</p>
                        </div>
                        <div className="info-pessoais__infocard">
                          <img src="/icons/ano-veiculo.png" />
                          <span>Ano:</span>
                          <p>2015</p>
                        </div>
                        <div className="info-pessoais__infocard">
                          <img src="/icons/km-veiculo.png" />
                          <span>Média de KM rodado:</span>
                          <p>até 500km</p>
                        </div>
                        <div className="info-pessoais__infocard">
                          <img src="/icons/fipe-veiculo.png" />
                          <span>FIPE:</span>
                          <p>R$42.000,00</p>
                        </div>
                        <div className="info-pessoais__infocard">
                          <img src="/icons/tipouso-veiculo.png" />
                          <span>Tipo de uso:</span>
                          <p>Passeio</p>
                        </div>
                        <div className="info-pessoais__infocard">
                          <img src="/icons/alarmemonitoramento/alarme_b.png" style={{ opacity: 0.5 }} />
                          <span>Possui seguro:</span>
                          <p>Não</p>
                        </div>

                      </div>
                    </div>
                    : ''}

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  renderArguments() {
  	const { prodArgsList } = this.props;
			return (
				<div role="tabpanel" className="tab-porqueVender tab-pane" id="arguments">
					<div className="displayFlex row">
						<div className="col-md-5">
							<img src="/img/img_carrofacil.png"/>
						</div>
						<div className="col-md-7 args">
							<ul>
								{(prodArgsList && prodArgsList.arguments) &&
								this.props.prodArgsList.arguments.map((doc, k) =>
									<div key={k}>
										<i className="fa fa-caret-right" aria-hidden="true"/>
										<li>{doc}</li>
									</div>,
								)}
							</ul>
						</div>
					</div>
				</div>
			);
  }

  renderHistory() {
    // console.log(this.props.custProdHistList);
    return (
      <div role="tabpanel" className="tab-pane" id="history">
        <div className="row">
          <div className="col-md-12">
            <div id="historico" className="tab-pane">
              <div className="div-historico">
                <div className="item-historico complete" id="historico-abordado">
                  <div className="item-historico-mark">
                    <a href="javascript:show_conecta()" />
                  </div>
                  <div className="item-historico-text">
                    <p>Conecta</p>
                  </div>
                </div>
                <div className="line-historico complete" />
                <div className="item-historico active show-calls" id="historico-emnegociacao">
                  <div className="item-historico-mark">
                    <a href="javascript:show_carrofacil()" />
                  </div>
                  <div className="item-historico-text">
                    <p>Carro fácil</p>
                  </div>
                </div>
              </div>

              <table className="table table-hover table-conecta hidden">
                <thead>
                <tr>
                  <th>Data</th>
                  <th>Fase</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="data">21/12/2016</td>

                  <td>Perdido</td>
                  <td>Fechou com congenere</td>
                </tr>
                <tr>
                  <td className="data">20/12/2016</td>

                  <td>Proposta</td>
                  <td>Não consegui contato</td>
                </tr>
                <tr>
                  <td className="data">06/12/2016</td>
                  <td>Proposta</td>
                  <td>Não consegui contato</td>
                </tr>
                <tr>
                  <td className="data">06/12/2016</td>
                  <td>Negociação</td>
                  <td>Cotação aprovada</td>
                </tr>
                <tr>
                  <td className="data">04/12/2016</td>
                  <td>Abordado</td>
                  <td>Cotação entregue</td>
                </tr>
                <tr>
                  <td className="data">04/12/2016</td>
                  <td>Abordado</td>
                  <td>Não consegui contato</td>
                </tr>
                <tr>
                  <td className="data">03/12/2016</td>
                  <td>Novo negócio</td>
                  <td>Cliente abordado</td>
                </tr>
                <tr>
                  <td className="data">01/12/2016</td>
                  <td>Novo negócio</td>
                  <td>Não consegui contato</td>
                </tr>
                </tbody>
              </table>

              {this.props.custProdHistList ?
                <table className="table table-hover table-carrofacil">
                  <thead>
                  <tr>
                    <th>Data</th>
                    <th>Fase</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.custProdHistList.history.map((doc, k) =>
                    <tr key={k}>
                      <td className="data">{moment(new Date(doc.date).toISOString().substring(0, 10)).format('DD/MM/YYYY')}</td>
                      <td>{doc.phase}</td>
                      <td>{doc.status}</td>
                    </tr>,
                  )}
                  </tbody>
                </table>
                : ''}
            </div>

          </div>
        </div>
      </div>
    );
  }

  renderNews() {
    return (
      <div role="tabpanel" className="tab-pane" id="news">
        <div id="noticias" className="tab-pane">
          <div className="row">
            <div className="col-md-12">
              <h2 className="noticias" />
              <div id="prCarousel" className="carousel slide carousel-padrao" data-interval="false" data-ride="carousel">
                <ol className="carousel-indicators">
                  {this.props.newsList.map((newDoc, index) =>
                    <li key={index} data-target="#prCarousel" data-slide-to={index} className={index == 0 ? 'active' : ''} />,
                  )}
                </ol>
                <div className="carousel-inner" role="listbox">
                  {this.props.newsList.map((newDoc, index) =>
                    <div key={newDoc._id} className={index == 0 ? 'item active' : 'item'}>
                      <div className="item-content">
                        <img src={newDoc.urlImage} />
                        <h3>{newDoc.title}</h3>
                        <p>{newDoc.body}</p>
                      </div>
                    </div>,
                  )}
                </div>
                <a className="left navegarNoticia carousel-control" href="#prCarousel" role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right navegarNoticia carousel-control" href="#prCarousel" role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <div style={{ padding: 0 }} className="tabs-perfilResumido loading" />
      );
    }

    return (
      <div className="tabs-perfilResumido">
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#custSummary" aria-controls="custSummary" role="tab" data-toggle="tab"><img src="/icons/info-resumida.png" /><p>Resumo do Cliente</p></a></li>
          <li role="presentation"><a href="#arguments" aria-controls="arguments" role="tab" data-toggle="tab"><img src="/icons/porque-vender.png" /><p>Por que vender ?</p></a></li>
          <li role="presentation"><a href="#history" aria-controls="history" role="tab" data-toggle="tab"><img src="/icons/historico.png" /><p>Histórico</p></a></li>
          <li role="presentation"><a href="#news" aria-controls="news" role="tab" data-toggle="tab"><img src="/icons/noticias.png" /><p>Notícias</p></a></li>
        </ul>
        <div className="tab-content">
          {this.renderCustSummary()}
          {this.renderArguments()}
          {this.renderHistory()}
          {this.renderNews()}
        </div>
      </div>
    );
  }

}

export default createContainer((props) => {

  const customerId = props.customerId;
  const productName = props.productName;

  // console.log(JSON.stringify(props, null, 2));

  //------------------------------------------------------------------------------------------------
  const customerHandle = GlobalSubsManager('customers.all');
  const customerDoc = Customers.findOne({ _id: customerId });

  // News -------------------------------------------------------------------------------------------
  const newsHandle = GlobalSubsManager('news.all');
  const newsList = News.find().fetch().reverse();

  //------------------------------------------------------------------------------------------------
  // Goods : House, Apts and Vehicles
  //------------------------------------------------------------------------------------------------
  // var arrGoods = ['Apartamento', 'Casa'];
  const goodsHandle = GlobalSubsManager('goodsVehicles.all');
  //
  // var queryGoodsH = {'brokerId': Meteor.userId(), 'customerId': customerId, 'type': { $in : arrGoods}};
  // const goodsHouseApts = GoodsVehicles.find(queryGoodsH).fetch().reverse();
  // const countGoodsHouseApts = GoodsVehicles.find(queryGoodsH).count();

  const queryGoodsV = { customerId, type: 'Veículo' };
  const goodsVehicles = GoodsVehicles.findOne(queryGoodsV);

  //------------------------------------------------------------------------------------------------
  // Acquired Products
  //------------------------------------------------------------------------------------------------
  const acquiredProductsHandle = GlobalSubsManager('acquiredProducts.all');

  // It could have more than one
  // var queryAlarm = {'brokerId': Meteor.userId(), 'customerId': customerId, 'productName': 'alarme-mais'};
  // const alarmProds = AcquiredProducts.find(queryAlarm).fetch().reverse();
  // const countAlarmProds = AcquiredProducts.find(queryAlarm).count();

  // It could have only one
  const queryCarroFacil = { brokerId: Meteor.userId(), customerId, productName: 'carro-facil' };
  const carroFacil = AcquiredProducts.findOne(queryCarroFacil);
  const countCarroFacil = AcquiredProducts.find(queryCarroFacil).count();

  // It could have only one
  // var queryConecta = {'brokerId': Meteor.userId(), 'customerId': customerId, 'productName': 'conecta'};
  // const conecta = AcquiredProducts.findOne(queryConecta);
  // const countConecta = AcquiredProducts.find(queryConecta).count();

  //------------------------------------------------------------------------------------------------
  // Customer x Product History
  //------------------------------------------------------------------------------------------------
  const custProdHistHandle = GlobalSubsManager('custProdHistory.all');
  const custProdHistList = CustProdHistory.findOne({ brokerId: Meteor.userId(), customerId, productName },
    { $sort: { 'history.date': -1 } });

  //------------------------------------------------------------------------------------------------
  // Product arguments
  //------------------------------------------------------------------------------------------------
  const prodArgsHandle = GlobalSubsManager('prodArguments.all');
  const prodArgsList = ProdArguments.findOne({ productName });

  return {
    newsList,
    customerDoc,
    goodsVehicles,
    // goodsHouseApts, countGoodsHouseApts, alarmProds, countAlarmProds, conecta, countConecta,
    carroFacil,
    countCarroFacil,
    custProdHistHandle,
    custProdHistList,
    prodArgsHandle,
    prodArgsList,

    loading: !newsHandle.ready() || !customerHandle.ready() || !goodsHandle.ready() ||
    !acquiredProductsHandle.ready() || !custProdHistHandle.ready() || !prodArgsHandle.ready(),

    user: Meteor.user(),
  };
}, SummaryProfileTabs);

