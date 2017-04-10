import React, { Component } from 'react';
import { replace } from '../../../redux/modules/nimble';
import { connect } from 'react-redux';

class _Component extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currentStepID, replace } = this.props;

    const isCotacaoClassName = (currentStepID !== 'checkout' && currentStepID !== 'sugestao') ? 'active' : '';
    const isCheckoutClassName = (currentStepID === 'checkout') ? 'active' : '';
    const isSugestaoClassName = (currentStepID === 'sugestao') ? 'active' : '';

    return (

      <div className="steps-venda">
        <ul className="row">
          <li className={`${isCotacaoClassName} first-child col-md-4`}>
            <a onClick={() => replace('possuiVeiculo')}>
              <span>Cotação</span>
              {/* <i className="fa fa-check" aria-hidden="true" />*/}
            </a>
          </li>

          <li className={`${isCheckoutClassName} col-md-4`}>
            <a onClick={() => replace('checkout')}>
              <span>Produtos de checkout</span>
            </a>
          </li>

          <li className={`${isSugestaoClassName} last-child col-md-4`}>
            {/** FIXME: replace('checkout') **/}
            <a onClick={() => replace('checkout')}>
              <span>Sugestões</span>
            </a>
          </li>
        </ul>
      </div>

    );
  }
}

export default connect(state => state.nimble, { replace })(_Component);
