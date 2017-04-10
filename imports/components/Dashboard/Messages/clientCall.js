import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import './style.scss';

class ClientCall extends Component {
  constructor(props) {
    super(props);
  }

  onClickMessagesLink(message) {
    Meteor.call('messages.setIsRead', message, (err, res) => {
		  if(res)
			   browserHistory.push(`/summary-profile/${message.to}/${message.systemName}`);
	    });
   }

  render() {
    const { message } = this.props;

    return (
      <li key={message._id} className="animated fadeInDown">
        <div id="callClient" className="message-item">
          <p>{message.body}</p>
        </div>
        <div className="message-link">
          <a href="#" onClick={() => this.onClickMessagesLink(message)}> Ligue Agora</a>
        </div>
      </li>
    )
  }
}

export default ClientCall;
