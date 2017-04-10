import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Carousel } from 'react-bootstrap';

class Gamefication extends Component {

  constructor(props) {
    super(props);
  }

   // Gamefication
  renderGameficationHeader() {
    return (
      <div className="div-content-categoria-header">
        <h1>{GLOBAL.gameficication.lblHeaderSuperProtector}</h1>
      </div>
    );
  }

  renderGameficationItens() {
    return (
      <div className="div-content-gamefication-itens">
        <p>{GLOBAL.gameficication.lblNextGoal}</p>
        <img src="/img/game.png" />
      </div>
    );
  }

  render() {
    return (
      <div className="row div-content-gamefication">
        <div className="col-md-7 div-content-categoria">
          { this.renderGameficationHeader() }
          { this.renderGameficationItens() }
        </div>
        <div className="col-md-5 div-content-categoria">
          <img src="/img/doctor.png" />
        </div>
      </div>
    );
  }

}

export default Gamefication;
