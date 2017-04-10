import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ModalClassify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  //----------------------------------------------------------------------------------------------------------
  // When changed status show/hide specific fields on screen
  //----------------------------------------------------------------------------------------------------------
  _handleChange(ev) {
    const { name, value } = ev.target;

    this.setState({
      [name]: value,
    });

    if (name == 'slctStatus') {
      if (value != 'Cliente fechou com congênere') {
        $('div #noContact').removeClass('hidden');
        $('#fc').addClass('hidden');
      } else {
        $('#fc').removeClass('hidden');
        $('div #noContact').addClass('hidden');
      }
    }
  }

  /**
   * @memberOf ModalClassify
   * @summary When confirmed new status show/hide specific fields on screen
   * @param {event} event - Event which called function
   */
  handleSubmit(event) {
    event.preventDefault();

    // console.log('this.state: ' + JSON.stringify(this.state, null, 2));

    const { slctStatus, minutes } = this.state;

    const custId = this.props.customerId;
    const prodName = this.props.productName;
    const actualPhase = this.props.actualPhase;

    // Updates / inserts the doc into Activities collection
    Meteor.call('activities.insert', this.props.custDoc, Meteor.userId(), prodName, actualPhase, minutes);

    // Inserts / updates customer x product quotation history into collection
    Meteor.call('custProdHistory.insertUpd', custId, Meteor.userId(), prodName, '', slctStatus, (error, result) => {
      // console.log(`==== result: ${result}`);
    });
  }

  render() {
    const { loading } = this.props;
    const { slctStatus, minutes } = this.state;

    if (loading)			{
      return (
        <div style={{ padding: 0 }} className="loading" />
      );
    }

    return (
      <div className="pull-right">
        <button type="button"
								className="btn btn-classificar pull-right"
								data-toggle="modal"
								data-target="#modalClassificar"
								data-backdrop="false">
					Classificar
				</button>

        <div className="modal fade" id="modalClassificar" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Classificar</h4>
              </div>
              <div className="modal-body col-md-12">
                <div className="col-md-6 mg">
                  <p className="text-pad">Fase:</p>
                  <p className="text-pad">{this.props.actualPhase}</p>
                </div>
                <div className="col-md-6 mg">
                  <p className="text-pad">Status:</p>
                  <select name="slctStatus" value={slctStatus} onChange={ev => this._handleChange(ev)}>
                    <option value="">Selecione</option>
                    {(this.props.statusList || []).map(doc =>
                      <option key={doc} value={doc}>{doc}</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <div id="fc" className="hidden">
                    <div className="col-md-6">
                      <label className="mg">
                        <p className="text-pad">Congênere:</p>
                        <input type="text" name="congenere" />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="mg">
                        <p className="text-pad">Valor:</p>
                        <input type="text" name="valor" />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="mg">
                        <p className="text-pad">Data final da vigência:</p>
                        <input type="datetime-local" name="data" />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="mg">
                        <p className="text-pad">O quão perto você estava de fechar ?</p>
                        <input type="text" className="rating text-center" />
                      </label>
                    </div>
                  </div>
                  <div id="noContact" className="hidden">
                    <div className="col-md-6">
                      <label className="mg">
                        <p className="text-pad">Informe a quantidade de minutos para retorno:</p>
                        <select name="minutes" value={minutes} onChange={ev => this._handleChange(ev)}>
                          <option value="">Selecione</option>
                          {(GLOBAL.activities.expireMinutes || []).map((doc, key) =>
                            <option key={key} value={doc}>{doc}</option>
                          )}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button"
												className="btn btn-success"
												data-dismiss="modal"
												onClick={this.handleSubmit.bind(this)}>
									Salvar
								</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default createContainer((props) => {
  const custId = props.customerId;
  const prodName = props.productName;

  const custProdHistHandle = GlobalSubsManager('custProdHistory.all');
  const statusHandle = GlobalSubsManager('statusPhase.all');
  const customersHandle = GlobalSubsManager('customers.all');

  const custDoc = Customers.findOne({ _id: custId });

  const custProdHist = CustProdHistory.findOne({ customerId: custId, brokerId: Meteor.userId(), productName: prodName });

  let statusList;
  let actualPhase;

  if (statusHandle.ready() && typeof custProdHist !== 'undefined') {

    const statusListDoc = StatusPhase.findOne({ phase: custProdHist.actualPhase });
    // console.log('statusListDoc : ' + JSON.stringify(statusListDoc , null, 2));

    actualPhase = custProdHist.actualPhase;
    statusList = statusListDoc.status;

    // console.log('statusList : ' + JSON.stringify(statusList, null, 2));
  }

  return {
    statusList,
    actualPhase,
    custDoc,
    loading: !statusHandle.ready() || !custProdHistHandle.ready() || !customersHandle.ready(),
    user: Meteor.user(),
  };
}, ModalClassify);
