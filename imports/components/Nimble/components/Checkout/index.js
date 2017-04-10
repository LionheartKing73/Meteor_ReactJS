import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';

class Checkout extends Component {
  render() {
    return (
      <div className="container-fluid checkoutProdutos">
        <div className="col-md-12 checkoutProdutos__header">
          <h1>Complete o perfil do seu cliente, preencha mais informações sobre ele</h1>
        </div>
        <div className="col-md-12 checkoutProdutos__content">
          <div className="checkoutProdutos__content__produto">
            <h2>Alarme Mais</h2>
            <img src="/icons/alarmemonitoramento/alarme_b.png" />
            <p>Oferta especial</p>
          </div>
          <div className="checkoutProdutos__content__argumentacoes">
            <h2>Argumentações</h2>
            <ul>
              <li>Comissão: Você recebe 15% de comissão sobre o valor do equipamento, ou seja, pelo menos R$ 288 de comissão assim que o cliente pagar a primeira parcela!</li>
              <li>Oportunidade de Cross-Sell: Você pode oferecer o cartão de crédito Porto Seguro para o cliente pagar o Alarme Mais e, com isso, aumentar sua comissão em R$ 60,00 na venda e R$50,00 na ativação do cartão!</li>
              <li>Você se tornará um consultor de segurança para seus clientes! Aproveite a oportunidade para vender os outros produtos da companhia e aumentar sua comissão!</li>
              <li>Quando o cliente utiliza o produto, lembra diariamente de você, o consultor de segurança familiar! Com clientes fidelizados, você tem a oportunidade de ofertar outros produtos.</li>
            </ul>
          </div>
          <div className="checkoutProdutos__content__acoes">
            <div className="checkoutProdutos__content__acoes__buttons displayFlex">
              <a href="#"><i className="fa fa-share-alt" aria-hidden="true" /></a>
              <a href="#"><i className="fa fa-envelope" aria-hidden="true" /></a>
            </div>
            <button className="btn btn-main">Iniciar cotação</button>
            <button className="btn" data-toggle="modal" data-target="#modalClassificar">Classificar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Checkout);
