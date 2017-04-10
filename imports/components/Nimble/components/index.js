import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Steps from './Steps';
import HeaderSteps from './Header';
import CustomerHeader from '../../../components/SummaryProfile/customerHeader';
import StepForms from './StepForms';
import Argumentacoes from './Argumentacoes';
import components from './Dynamic';

import _Alert from 'react-s-alert';
import './s-alert.scss';
global.Alert = _Alert;


class Nimble extends PureComponent {
  render() {
    const { currentStepID, steps, loadingDataFromServer } = this.props;
    const atualStep = steps.find(s => s.id == currentStepID) || {};
    const FullScreenComp = components[atualStep && atualStep.fullScreen && atualStep.component];
    const className = classnames({ loading: loadingDataFromServer }, "fill-all nimble-wrapper");

    return (
      <div className={className}>

        <div className="nimble__fixed-topbar">
          <CustomerHeader isNimble />
          <HeaderSteps />
        </div>

        <div className="content-venda">
          <div className="row">
            <div
              className={(atualStep.hideSteps) ? 'col-md-12 full-nimble-bg' : 'col-md-10'}>
              <div className="div-content-atividades">

                {(atualStep.hideSteps) ? null : <Steps /> }

                {(FullScreenComp) ? <FullScreenComp /> : <StepForms />}

                <Alert stack={{ limit: 3 }}/>
              </div>
            </div>

            {(atualStep.hideArguments) ? null : <Argumentacoes />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.nimble, {})(Nimble);

