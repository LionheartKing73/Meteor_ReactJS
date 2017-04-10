import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages, loading, user } = this.props;

    if (loading) return <h1>Carregando...</h1>;

    return (
      <div className="login-container">
        <div className="login-wrapper">

          <div className="div-login">
            <div className="div-login-perfil">
              <div className="login-content-perfil">

                <p>Olá {user.profile.name} - {' '}
                  <button onClick={() => Meteor.logout()}>Sair</button>
                  {' '}
                  <button
                    onClick={() => Meteor.call('flagUserRegistrationAsIncomplete')}
                  >
                    flagUserRegistrationAsIncomplete
                  </button>
                </p>

                <h1>{messages.length} mensagens</h1>
                <ul>
                  {messages.map((message, k) => (
                    <li key={k}>
                      <h2>({k}) {message.title}</h2>
                      <p>{message.body}</p>
                      <hr />
                      <br />
                    </li>
                    ))}
                </ul>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const subMessages = GlobalSubsManager('messages.all');
  const messages = Messages.find().fetch().reverse();

  return {
    messages,
    loading: !subMessages.ready(),
    user: Meteor.user(),
  };
}, Home);
