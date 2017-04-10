import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, Router } from 'react-router';
import './style.scss';

class DashboardSideBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	route: this.props.route,
    };
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.route)  		{ this.setState({ route: nextProps.route }); }
  }

  // Dashboard sidebar
  onClickDashboardSidebarExpandProfile(event) {
     // TODO: USE THE JQUERY WITH CSS
     // $("#div-perfil-expandido .div-info-expandido").classList.addClass('show-delay');
    document.getElementById('div-perfil-expandido').style.width = '13%';
    document.getElementById('div-main').style.width = '79%';
    document.getElementById('div-menu-profile-back').style.display = 'block';
    document.getElementById('div-menu-profile').style.display = 'none';
  }

  onClickDashboardSidebarHideProfile(event) {
     // TODO: USE THE JQUERY WITH CSS
     // $("#div-perfil-expandido .div-info-expandido").removeClass('show-delay');
     // $("#div-perfil-expandido .div-perfil-expandido").css('opacity', '0');
    document.getElementById('div-perfil-expandido').style.width = '0%';
    document.getElementById('div-main').style.width = '92%';
    document.getElementById('div-menu-profile-back').style.display = 'none';
    document.getElementById('div-menu-profile').style.display = 'block';
  }

  onClickDashboardSidebarGamefication(event) {
     // TODO
  }

  renderDashboardSidebarExpanded() {
    return (
      <div id="div-perfil-expandido">
        <div className="div-menu-fixed">
          <div className="div-expandido-photo" style={{ background: `url(${this.props.profile.pictureUrl})` }} />
          <div className="div-info-expandido">
            <h2 className="info-nome">{this.props.profile.name}</h2>
            <a href="#"><i className="fa fa-pencil-square" aria-hidden="true" /></a>
            <ul>
              <li>Ranking: {this.props.profile.ranking}
                <div className="line-separar" />
              </li>
              <li>Portolecas: {this.props.profile.portolecas}</li>
            </ul>
            <img src="/img/Star.png" />
            <img src="/img/Star.png" />
            <img src="/img/Star.png" />
          </div>
        </div>
      </div>
    );
  }

  renderDashboardSidebarWithdrawn() {
  	const { route } = this.state;
    return (
      <div id="div-menu">
        <div className="div-menu-fixed">
          <div id="div-menu-profile" style={{ background: `url(${this.props.profile.pictureUrl})` }}>
            <a href="#" onClick={this.onClickDashboardSidebarExpandProfile.bind(this)} />
          </div>
          <div id="div-menu-profile-back">
            <a href="#" onClick={this.onClickDashboardSidebarHideProfile.bind(this)}>
              <i className="fa fa-angle-left" aria-hidden="true" />
            </a>
          </div>
          <div className="div-info">
            <img src="/img/Protetor-icon.png" />
            <p className="div-info-number">{this.props.profile.portolecas}</p>
            <div className="line-separar" />
            <p className="div-info-categoria">Portolecas</p>
          </div>
          <ul className="itens-menu">
            <li className={`${route == '/dashboard' && 'active'}`}>
              <Link to={'/dashboard'}>
                <img src="/icons/dashboard.png" />
              </Link>
            </li>
            <li className={`${route == '/groups' && 'active'}`}>
              <Link to={'/groups'}>
                <img src="/icons/gestao_contato.png" />
              </Link>
            </li>
            <li>
              <a href="#" onClick={this.onClickDashboardSidebarGamefication.bind(this)}>
                <img src="/icons/gamefication.png" />
              </a>
            </li>
          </ul>
          <div className="div-menu-fixed__logout">
            <button
              className="div-menu-fixed__logout__button"
              onClick={this.props.onLogout}
            >
              <img src="/img/logout.png" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="div-sidebar" className="DashboardSideBar__container">
        { this.renderDashboardSidebarWithdrawn() }
        { this.renderDashboardSidebarExpanded() }
      </div>
    );
  }

}

export default createContainer((props) => {
  const subUser = GlobalSubsManager('user.selfProfile');
  const facebookProfile = (((Meteor.user() || {}).services || {}).facebook) || {};
  const userPicUrl = `https://graph.facebook.com/${facebookProfile.id}/picture?type=large`;
  return {
    profile: {
      _id: facebookProfile.id,
      name: facebookProfile.name,
      pictureUrl: userPicUrl,
      ranking: 15,
      portolecas: 50,
    },
    loading: !subUser.ready(),
  };
}, DashboardSideBar);
