import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import './style.scss';
import SeeMore from './seeMore';
import ClientCall from './clientCall';
import PutOnAgenda from './putOnAgenda';
import SeeProfile from './seeProfile';

class MessagesList extends Component {

  constructor(props) {
    super(props);
  }
  
  renderMessageObject(message) {

    switch (message.type) {
      case 'clientcall':
        return <ClientCall message={message} />;
      case 'putonagenda':
        return <PutOnAgenda message={message} />;
      case 'seeprofile':
        return <SeeProfile message={message} />;
      case 'seemore':
        return <SeeMore message={message} />;
    }
  }

  renderMessagesHeader() {
    return (
      <div className="div-mensagens-header">
        <div className="div-mensagens-header-envelope">
          <i className="fa fa-envelope" aria-hidden="true" />
          <div className="quantidade-mensagens">{this.props.notReadCounter}</div>
        </div>
      </div>
    );
  }

  renderMessagesItens() {

    var rows = [];

    this.props.messagesList.map((message) => {
      rows.push(this.renderMessageObject(message));
    });

    return (
      <div className="MessagesList__container div-mensagens-itens">
        <ul>
          {rows}
        </ul>
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
      <div className="div-mensagens-content">
        { this.renderMessagesHeader() }
        { this.renderMessagesItens() }
      </div>
    );
  }

}

export default createContainer(() => {

  const messagesHandle = GlobalSubsManager('messages.all');

  const messagesList = Messages.find({hidden: false}).fetch().reverse();

  const notReadCounter = messagesList.filter(message => (message.category == 'message' && message.readAt == null && message.hidden == false)).length;

  return {
    messagesList,
    notReadCounter,
    loading: !messagesHandle.ready(),
    user: Meteor.user(),
  };
}, MessagesList);
