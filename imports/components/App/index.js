import React, { Component } from 'react';
import './flexboxgrid.scss';
import './general.scss';
import { Provider, connect } from 'react-redux';
import { handleUser, SET_USER } from '../../redux/modules/user';

class _App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.handleUser({
        type: SET_USER,
        user: nextProps.user
      });
    }
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const App = GLOBAL.createContainer((props) => {
  const subSelfUserProfile = GlobalSubsManager('user.selfProfile');
  const user = Meteor.users.findOne(Meteor.userId());
  const loadingUserProfile = !subSelfUserProfile.ready();

  global.Router = props.router;

  return { loadingUserProfile, user };
}, _App);

const ConnectedApp = connect(state => ({}), { handleUser })(App);

Meteor.setTimeout(function () {
  // Reset subscriptions cache on route change
  Router.listen(function(){
    global.__subsChache = {};
  });
}, 2000);


export default (store) => props => (
  <Provider store={store} key="provider">
    <ConnectedApp {...props} />
  </Provider>
);
