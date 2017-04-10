import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import './style.scss';

class SeeProfile extends Component {
  constructor(props) {
    super(props);
  }

  onClickMessagesLink(message) {
    Meteor.call('messages.setIsRead', message);
    const customer = { customerId: message.to };
    Session.set('customerDoc', customer);
    Router.push('/complete-profile');
  }

  render() {
    const { message } = this.props;

    return (
      <li key={message.id} className="animated fadeInDown">
        <div id="seeProfile" className="message-item">
          <p>{message.body}</p>
        </div>
        <div className="message-link">
          <a href="#" onClick={() => this.onClickMessagesLink(message)}>Ver perfil</a>
        </div>
      </li>
    )
  }

}

export default SeeProfile;
