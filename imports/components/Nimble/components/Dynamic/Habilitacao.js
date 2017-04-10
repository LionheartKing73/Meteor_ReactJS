import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, goToForm, init } from '../../../../redux/modules/nimble';
const { Date } = Mongoloid.Components;

function customValidateDate() {
  const value = this.value;

  const firstCNH = this.field('firstCNH').value;
  const validity = this.field('validity').value;

  if(!firstCNH || !validity) return;

  const validityNumber =  moment(validity).format('YYYY');
  const firstCNHNumber =  moment(firstCNH).format('YYYY');

  if(firstCNHNumber < validityNumber) return;

  return 'invalid';
}


const HabilitacaoSchema = new SimpleSchema({
  cnh: {
    type: String,
    label: 'CNH',
    min: 3,
    max: 11,
  },
  validity: {
    type: String,
    label: 'Validade da CNH',
    custom: customValidateDate,
  },
  firstCNH: {
    type: String,
    label: 'Data da 1º Habilitação',
    custom: customValidateDate,
  },
});


class _Component extends Component {
  constructor(props) {
    super(props);

    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'habilitacao',
      schema: HabilitacaoSchema,
      opType: 'nimble',
    };

    this.dumbID = Random.id();

    Mongoloid(mongoloidOptions);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  validateDate(name, value){
    let self = this;

    //TODO: transferir logica para o Mongoloid.components
    this._getValidationErrors().then(res => {
      self.db.findOne({ _id: self._mongoloidStateKey }).then(data => {
        delete data._id;
        const $parent = $(`#${self.dumbID}`);
        try {
          self.schema.verify(data, { keys: [name] });
          $parent.removeClass('mongoloid__error');
          $parent.find('.mongol__error-message').remove();
        } catch (e) {
          $parent.addClass('mongoloid__error').find('.mongol__error-message').remove();
          $parent.append(`<label class="mongol__error-message">${e.reason}</label>`);
        }
      });
    });
  }

  render() {
    const { cnh, validity, firstCNH } = this.state;

    return (
      <div className="form-group carros">
        <div id={this.dumbID}>
          <label className="col-md-4">
            <span>CNH:</span>
            <input
              data-autocomplete-query="nimble.values.infosHabilitacao.cnh"
              style={{marginTop:5}} type="text" name="cnh" onChange={this._handleChange} value={cnh} />
          </label>

          <label className="col-md-4">
            <span>Validade da CNH:</span>
            <Date
              data-autocomplete-query="nimble.values.infosHabilitacao.validity"
              name="validity" value={validity} self={this} />
          </label>

          <label className="col-md-4">
            <span>Data da 1ª habilitação:</span>
            <Date
              data-autocomplete-query="nimble.values.infosHabilitacao.firstCNH"
              name="firstCNH" value={firstCNH} self={this} />
          </label>
        </div>

        <div className="col-md-12">
          <button type="button" className="btn btn-primary pull-right" onClick={this._handleSubmit}>
            Seguir
          </button>
        </div>
      </div>

    );
  }
}

export default connect(state => state.nimble, {
  next, init, goToForm,
})(_Component);
