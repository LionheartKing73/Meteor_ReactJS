import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import './style.scss';

class PutOnAgenda extends Component {

  constructor(props) {
    super(props);
    this.state = { seeMore: false };
  }

  // Messages
  onClickMessagesLink(message) {

    const userId = Meteor.userId();

    Meteor.call('messages.setIsRead', message, (err1, res1) => {
      if(res1) {
        Meteor.call('messages.hide', message, (err2, res2) => {
          if(res2) {

            Meteor.call('activities.insertActivityAndHistory', userId, message.to, message.systemName, (err3, res3) => {
              if (err3)
                swal('Ops...', (err3.reason || {}).reason);
            });
          }
        });
      }
    });
  }

  render() {

    const { message } = this.props;

    return (

      <li key={message._id} className ="animated fadeInDown">
        <div id="callClient" className="message-item">
          <p>{message.body}</p>
        </div>
        <div className="message-link">
          <a href="#" onClick={() => this.onClickMessagesLink(message)}> Incluir na Agenda</a>
        </div>
      </li>
    );
  }
}

export default PutOnAgenda;
