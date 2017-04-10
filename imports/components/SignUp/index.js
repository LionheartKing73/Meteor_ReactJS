import React, { Component } from 'react';

class _SignUp extends Component {
  constructor(props) {
    super(props);
    this._fakeFlagProfileAsComplete = this._fakeFlagProfileAsComplete.bind(this);
  }

  _fakeFlagProfileAsComplete() {
    Meteor.call('flagUserRegistrationAsComplete', Meteor.userId(), (err, res) => {
      if (!err) this.props.router.replace('/');
    });
  }

  render() {
    return (
      <h1>Completar Cadastro <br />
        <small>
          Seu cadastro está incompleto.
          Por favor, preencha os campos indicados.
        </small>

        <hr />
        <button onClick={this._fakeFlagProfileAsComplete}>
          Simular preenchimento de cadastro</button>
      </h1>
    );
  }
}

export default GLOBAL.createContainer(props => ({
  ...props,
}), _SignUp);

