import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import './style.scss';

class SeeMore extends Component {

  constructor(props) {
    super(props);
    this.state = { seeMore: false, message : this.props.message };
    this.getMessage = this.getMessage.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.message){
      this.setState({ message : nextProps.message })
    }  
  }
  
  onClickMessagesLink(message) {
    if (!this.state.seeMore) {
      this.setState({ seeMore: true });
      Meteor.call('messages.setIsRead', message);
    } else {
      this.setState({ seeMore: false });
    }
  }
  
  isSeeMore(){
    return (this.state.seeMore) ? "Fechar" : "Ver mais";
  }

  getMessage(message){
    return message.body.length > 84 && !this.state.seeMore ? `${message.body.substring(GLOBAL.partialMessageSize, 0)}...` : message.body;
  }
  
  render() {

    const { message } = this.state;

    return (
      <li key={message._id} className="animated fadeInDown">
        <div id="complete" className="message-item">
            <p>{this.getMessage(message)}</p>
        </div>
        <div className="message-link">
          <a href="#" onClick={() => this.onClickMessagesLink(message)}>{this.isSeeMore()}</a>
        </div>
      </li>
    );
  }
}

export default SeeMore;
