import React, { Component, PropTypes } from 'react';
import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this._handleLogin = this._handleLogin.bind(this);
  }

  componentDidMount() {
    if (this.props.user) this.props.router.push(GLOBAL.DASHBOARD_ROUTE);
  }

  shouldComponentUpdate(props) {
    if (props.user) this.props.router.push(GLOBAL.DASHBOARD_ROUTE);
    return true;
  }

  _handleLogin() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['user_friends', 'public_profile', 'email'],
    }, (err, res) => {
      if (err) {
        swal('', err.reason, 'error');
      }
    });
  }

  render() {
    return (
      // Guilherme Ponce que fez
      <div className="logincontainer">
        <div className="logincontainer__logos">
          <img src="/img/3marcas.png" />
        </div>
        <div className="logincontainer__content">
          <h1>Seja um protetor da família</h1>
          <div className="logincontainer__content__facebook">
            <p>Acesso com:</p>
            <a
              className="btn btn-default"
              onClick={this._handleLogin}
            >facebook</a>
          </div>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer(() => {
  const subUser = GlobalSubsManager('user.selfProfile');

  return {
    loading: !subUser.ready(),
    user: Meteor.user(),
  };
}, Login);
