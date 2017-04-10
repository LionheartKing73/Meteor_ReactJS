import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next } from '../../../redux/modules/nimble';
const { Date, Select } = Mongoloid.Components;


const ValidationSchema = new SimpleSchema({});

class VamosEmFrente extends Component {
  constructor(props) {
    super(props);

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: '',
      schema: ValidationSchema,
      opType: 'update'
    };

    Mongoloid(mongoloidOptions);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleEnd(ev){

  }

  render() {
    return (
      <div id="seguir4" className="col-sm-2">
        <button id="tileSeguir4" className="tile green" onClick={this._handleEnd}>
          <div className="icons">
            <img src="icones/usuario/checked.png" className="img-card" />

            <span className="span-t span-b">
              Vamos em frente ?
            </span>
          </div>
        </button>
      </div>
    );
  }
}

export default connect(state => state.nimble, { next })(VamosEmFrente);
