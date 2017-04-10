import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

class ActivitiesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.renderActivitysHeader = this.renderActivitysHeader.bind(this);
  }

  /**
   * @memberOf ActivitiesList
   * @summary Get best lead from Machine Learning service
   * @param {event} event - Event which called function
   */
  onClickActivitysClickLead(event) {
    this.setState({ loading: true });

    Meteor.call('activities.findClickLeadAndInsert', Meteor.userId(), (err, res) => {
      this.setState({ loading: false });
      if (err) swal('Ops...', err.reason);
    });
  }

  onClickActivitysExpandActivitys(event) {
    document.getElementById('icon-expand').style.display = 'none';
    document.getElementById('icon-hide').style.display = 'block';
    document.getElementById('div-acoes').classList.add('div-acoes-expand');
  }

  onClickActivitysHideActivitys(event) {
    document.getElementById('icon-hide').style.display = 'none';
    document.getElementById('icon-expand').style.display = 'block';
    document.getElementById('div-acoes').classList.remove('div-acoes-expand');
  }

  helperActivitysGetTimeToExpireColorCSS(timeToExpire) {
    let timeToExpireColorCSSCode = '';
    if (timeToExpire == 'Atrasado') {
      timeToExpireColorCSSCode = 'tempo-acabando';
    } else if (new RegExp('[0-1][0-5](min)').test(timeToExpire)) {
      timeToExpireColorCSSCode = 'tempo-medio';
    }
    return (timeToExpireColorCSSCode);
  }

  //-------------------------------------------------------------------------------------------------
  // Render activities header (Label and button)
  //-------------------------------------------------------------------------------------------------
  renderActivitysHeader() {
    const { loading } = this.state;
    return (
      <div className="div-content-atividades-header">
        <h1>{GLOBAL.activities.lblHeaderActivities}</h1>
        <div className="pull-right">
          {
            (loading) ? (
              <button className="btn-clicklead btn btn-default">Carregando...</button>
              ) : (
                <button className="btn-clicklead btn btn-default" onClick={this.onClickActivitysClickLead.bind(this)}>{GLOBAL.activities.btnClickLead}</button>
              )
          }
        </div>
      </div>
    );
  }

  //-------------------------------------------------------------------------------------------------
  // Render activities table
  //-------------------------------------------------------------------------------------------------
  renderActivitysItens() {
    const { activitiesList } = this.props;

    if (activitiesList.length > 0)			{
      return (
        <div className="div-content-atividades-itens" id="div-acoes">
          <table className="table table-hover div-content-atividades-itens">
            <thead>
              <tr>
                <th>{GLOBAL.activities.lblColTitleProduct}</th>
                <th>{GLOBAL.activities.lblColTitleName}</th>
                <th>{GLOBAL.activities.lblColTitlePhase}</th>
                <th>{GLOBAL.activities.lblColTitleSource}</th>
                <th>{GLOBAL.activities.lblColTitleContactTime}</th>
              </tr>
            </thead>
            <tbody>
              {activitiesList.map(activity =>
                <tr key={activity._id} onClick={() => this.handleClick(activity)}>
                  <td className="foto-produto"><img
                    src={GLOBAL.images.mapProductImages[activity.productName]}
                    className="img-responsive"
                  /></td>
                  <td className="nome-cliente">{activity.customerName}</td>
                  <td className="status-item"><p>{activity.phase}</p></td>
                  <td className="origem-item"><p>{GLOBAL.mapCustOrigCode[activity.source]}</p></td>
                  <td className={`time-item ${this.helperActivitysGetTimeToExpireColorCSS(activity.timeToExpireMin)}`}>
                    <i className="fa fa-clock-o" aria-hidden="true" /> {activity.timeToExpireMin} min
                </td>
                  {/* <td className="status-item"><p>{activity.timeToExpire.toLocaleTimeString()}</p></td>*/}
                </tr>,
            )}
            </tbody>
          </table>
        </div>
      );
    }  	return (
      <div className="div-content-atividades-itens">
        <p>Acione o botão <b>Click Lead</b> para ter um novo contato em sua agenda.</p>
      </div>
    );
  }

  //-------------------------------------------------------------------------------------------------
  // Calls summary profile when user clicks on activity row
  //-------------------------------------------------------------------------------------------------
  handleClick(activity) {
    browserHistory.push(`/summary-profile/${activity.customerId}/${activity.productName}`);
    // window.document.location=`/summary-profile/${activity.customerId}/${activity.productName}`;
  }

  //-------------------------------------------------------------------------------------------------
  // Render activities list
  //-------------------------------------------------------------------------------------------------
  renderActivitysContent() {
    const isArrowActive = (this.props.activitiesList && this.props.activitiesList.length > 5);
    return (
      <div className="div-content-atividades">
        {this.renderActivitysHeader()}
        {this.renderActivitysItens()}
        {isArrowActive &&
        <a className="icon-expand" id="icon-expand" href="#" onClick={this.onClickActivitysExpandActivitys.bind(this)}>
          <i className="fa fa-angle-double-down" aria-hidden="true" />
        </a>}
        <a className="icon-expand" id="icon-hide" href="#" onClick={this.onClickActivitysHideActivitys.bind(this)}>
          <i className="fa fa-angle-double-up" aria-hidden="true" />
        </a>
      </div>
    );
  }

  //-------------------------------------------------------------------------------------------------
  // Render activities list
  //-------------------------------------------------------------------------------------------------
  render() {
    return (this.renderActivitysContent());
  }

}

export default createContainer((props) => {
  const activitiesHandle = GlobalSubsManager('activities.all');
  const activitiesList = Activities.find({ brokerId: Meteor.userId() }, { sort: { timeToExpire: 1 } }).fetch();

  return {
    activitiesList,
    user: Meteor.user(),
    loading: !activitiesHandle.ready(),
  };
}, ActivitiesList);
