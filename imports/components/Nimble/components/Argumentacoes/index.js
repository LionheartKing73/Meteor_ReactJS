import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  handleGood,
  handleBad,
  handleSubmitVoto,
  setArgumentosPath
} from '../../../../redux/modules/nimble';
const Rate = require('rc-rate');
import './style.scss';

class Argumento extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this._onChangeStar = this._onChangeStar.bind(this);
    this._handleGood = this._handleGood.bind(this);
    this._handleBad = this._handleBad.bind(this);
    this._handleSubmitVoto = this._handleSubmitVoto.bind(this);
  }

  _onChangeStar(nota) {
    this.setState({ nota });
  }

  _handleGood() {
    this.setState({ feedback: 'good' });
  }

  _handleBad(step, state, argumento, handleSubmitVoto) {
    handleSubmitVoto(step, { ...state, feedback: 'bad', argumento });
    this.setState({ hide: true, feedback: 'bad'});
  }

  _handleSubmitVoto(step, state, argumento, handleSubmitVoto) {
    if (state.nota === undefined && state.feedback == "good") {
      swal('Erro de sistema', 'Você precisa classificar, usando as estrelas.', 'error');
    } else {
      handleSubmitVoto(step, { ...state, argumento });
      this.setState({ hide: true });
    }

  }

  render() {
    const { handleSubmitVoto, step, argumento, className = '' } = this.props.parent;
    const { feedback, hide } = this.state;

    if (feedback == 'bad' || hide) return null;
    return (
      <li className={className}>
        <div className="mensagem-item">
          <p>
            {argumento.text}
            <br />
          </p>
        </div>

        <div className="classify">
          <div className="btn-sl">
            <button
              className="btn-class-arg good toggle-button"
              title="Sim"
              onClick={this._handleGood}
            />

            <button
              className="btn-class-arg bad toggle-button click-btn-un"
              onClick={() => this._handleBad(step, this.state, argumento, handleSubmitVoto)}
            />
          </div>

          <div className="content-cl-x">
            <div className="div-subclass">

              { (feedback == 'good') ? (
                <div>
                  <Rate name="slctStatus" count={4}
                        onChange={this._onChangeStar}/>
                  <button className="btn-ok click-btn" title="Classificar"
                          onClick={() => this._handleSubmitVoto(step, this.state, argumento, handleSubmitVoto)}>
                    ok
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

class ArgumentsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    // this._renderArgumeto = this._renderArgumeto.bind(this);
  }

  render() {
    const { currentStepID, argumentos = [], handleGood, handleBad, handleSubmitVoto, steps } = this.props;
    const step = steps.find(s => s.id == currentStepID);

    const sortedArgumentMessages = argumentos;
    // const sortedArgumentMessages = _.sortBy(argumentos, 'key');

    return (
      <div className="col-md-2 argumentacoes argumentacoes-wrapper">
        <div className="div-argumentacoes">
          <div className="div-argumentos-content-qt">
            <div className="div-argumentos-itens">
              <ul className="lista">
                {
                  sortedArgumentMessages.map((argumento, key) => (
                    <Argumento
                      key={argumento._id}
                      parent={{
                        handleGood,
                        handleBad,
                        handleSubmitVoto,
                        step,
                        argumento,
                        className: 'animated fadeInLeft',
                      }}
                    />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ContainedComponent = GLOBAL.createContainer((props) => {
  return {}
}, ArgumentsList);

export default connect(state => state.nimble, {
  handleGood,
  handleBad,
  handleSubmitVoto,
  setArgumentosPath,
})(ContainedComponent);
