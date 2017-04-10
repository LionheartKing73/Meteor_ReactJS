import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

GLOBAL.ADMIN_ROUTE_PATH = '/admin';
GLOBAL.ADMIN_CORRETOR_PATH = '/admin/corretor';
GLOBAL.ADMIN_PRODUTO_PATH = '/admin/produto';
GLOBAL.ADMIN_MIDIASOCIAL_PATH = '/admin/midia-social';

GLOBAL.ADMIN_CORRETORNEW_PATH = '/admin/corretornew';

GLOBAL.DASHBOARD_ROUTE = '/dashboard';
GLOBAL.CADASTRO_ROUTE_PATH = '/register/:form';
GLOBAL.HOME_ROUTE_PATH = '/';
GLOBAL.LOGIN_ROUTE_PATH = '/login';
GLOBAL.FB_LOGIN = '/fb_login';
GLOBAL.QUOTATION_LIST_ROUTE_PATH = '/quotation-list/:productName';
GLOBAL.NIMBLE = '/nimble/:productName/:customerId';
GLOBAL.ACTIVITIES_LIST_ROUTE_PATH = '/activities-list';
GLOBAL.COMMUNICATIONS_LIST_ROUTE_PATH = '/communications';
GLOBAL.COMMUNICATIONS_ADMIN_ROUTE_PATH = '/communications-admin';
GLOBAL.MESSAGES_LIST_ROUTE_PATH = '/messages';
GLOBAL.PRODUCTS_PANEL_ROUTE_PATH = '/product-panel';
// GLOBAL.PRODUCTS_ADMIN_ROUTE_PATH = '/products-admin';
GLOBAL.SUMMARY_PROFILE_ROUTE_PATH = '/summary-profile/:customerId/:productName';
GLOBAL.SUMMARY_GRUPOS_ROUTE_PATH = '/groups'; //Arvore de Relacionamento
GLOBAL.COMPLETE_PROFILE_ROUTE_PATH = '/complete-profile';
GLOBAL.SEARCH_PATH = '/search';

import UploadFacebookFriends from '../components/UploadFacebookFriends';
import getAppWithStore from '../components/App';
import Login from '../components/Login';
import QuotationList from '../components/Dashboard/QuotationList';
import Nimble from '../components/Nimble';
import NimbleCheckout from '../components/Nimble/components/Checkout';
import ActivitiesList from '../components/Dashboard/Activities';
import CommunicationsList from '../components/Dashboard/Communications';
import CommunicationsPost from '../components/Dashboard/Communications/post.js';
import MessagesList from '../components/Dashboard/Messages';
import ProductsPanel from '../components/Dashboard/ProductsPanel';
import DashBoard from '../components/Dashboard';
import Register from '../components/Register';

import AdminTela from '../components/admin';
import AdminCorretor from '../components/admin/cadastros/corretor';
import AdminProduto from '../components/admin/cadastros/produto';
import AdminMidiaSocial from '../components/admin/cadastros/midiasocial';
import AdminCorretorNew from '../components/admin/cadastros/corretor-new';

import AdminDashBoard from '../components/admin/Dashboard';
// import ProductsAdmin from '../components/admin/ProductsAdmin';
import SummaryProfile from '../components/SummaryProfile';
import CompleteProfile from '../components/CompleteProfile';
import GroupManager from '../components/Dashboard/GroupManager'; //Grupos e costumers

import Search from '../components/Dashboard/Search';


const NotFound = () => <h1>404</h1>;


/**
 * Redireciona usuario nao permitido
 * @param roles
 * @param replace
 * @param cb
 * @param interval
 * @returns {*}
 */
const enterOrRedirectLogin = (roles = [], replace, cb, interval) => {
  if (Meteor.loggingIn()) return console.log(1);

  const user = Meteor.user();

  clearInterval(interval);

  if (!user && !Meteor.loggingIn()) {
    replace(GLOBAL.LOGIN_ROUTE_PATH);
    console.log(2);
    return cb();
  }

  // if (user && !Roles.userIsInRole(user._id, roles)) {
  // Meteor.logout();
  // 	//Meteor.call('users.validate', user._id);
  // replace('/login');
  // console.log('erro: sem role');
  // //swal('', 'Usuário não autorizado.', 'error');
  // return cb();
  // }

  // Se corretor nao fez login com facebook
  if (user.services && !user.services.facebook) {
    replace(GLOBAL.LOGIN_ROUTE_PATH);
    console.log(3);
    return cb();
  }

  // Se o corretor nao completou o cadastro
  if (!user.registrationIsComplete) {
    replace(GLOBAL.CADASTRO_ROUTE_PATH);
    console.log(4);
    return cb();
  }
  console.log(5);
  cb();
};


/**
 * Tenta login por token de registro enviado ao e-mail do corretor
 * @param props
 */
const tryLoginByTokenURL = (props, replace, cb) => {
  try {
    const token = props.location.query.first_token;
    if (token) {
      const { email, password } = JSON.parse(decodeURIComponent(atob(token.replace('-_-', '='))));
      console.log({ email, password });
      Meteor.loginWithPassword(email, password);
      replace(GLOBAL.LOGIN_ROUTE_PATH);
      console.log(5);
      return cb();
    }
  } catch (e) {
    console.log(e);
  }

  cb();
};


/**
 * Verifica se o usuario está logado e pode entrar na rota atual.
 * @param roles: Roles que o usuario precisa ter para não ser
 * redirecionado para tela de login
 */
const verifyUser = (roles = []) => (props, replace, cb) => {
  // if (props.location.pathname == GLOBAL.LOGIN_ROUTE_PATH) return cb();
  let interval;
  interval = setInterval(() => {
    enterOrRedirectLogin(roles, replace, cb, interval);
  }, 500);
};


function handleHome(props, replace, cb) {
  if (props.location.pathname == '/') {
    replace(GLOBAL.DASHBOARD_ROUTE);
  }
  cb();
}

function _handleOnLogout() {
  Meteor.logout(() => window.location('/'));
}

export default (history, store) => {
  return (
    <Router history={history}>
      <Route path="/"
             component={getAppWithStore(store)}
             onEnter={handleHome}>
        <Route path="upload-friends" component={UploadFacebookFriends} />
        <Route path={GLOBAL.ADMIN_ROUTE_PATH} component={AdminDashBoard}>
          <Route path={GLOBAL.ADMIN_CORRETOR_PATH} component={AdminCorretor}/>
          <Route path={GLOBAL.ADMIN_PRODUTO_PATH} component={AdminProduto}/>
          <Route path={GLOBAL.ADMIN_MIDIASOCIAL_PATH}
                 component={AdminMidiaSocial}/>
          <Route path={GLOBAL.ADMIN_CORRETORNEW_PATH}
                 component={AdminCorretorNew}/>
        </Route>
        {/*<Route path="/admin" component={AdminDashBoard} />*/}
        <Route path="/logout" onEnter={_handleOnLogout}/>
        <Route path={GLOBAL.LOGIN_ROUTE_PATH} component={Login}/>
        <Route path={GLOBAL.CADASTRO_ROUTE_PATH} component={Register}
               onEnter={tryLoginByTokenURL}/>
        <Route path={GLOBAL.DASHBOARD_ROUTE}
               component={DashBoard}
               onEnter={verifyUser(['admin', 'broker'])}>
          {/*<IndexRoute component={DashBoard} />*/}
          <Route path={GLOBAL.QUOTATION_LIST_ROUTE_PATH}
                 component={QuotationList}/>
          <Route path={GLOBAL.ACTIVITIES_LIST_ROUTE_PATH}
                 component={ActivitiesList}/>
          <Route path={GLOBAL.COMMUNICATIONS_LIST_ROUTE_PATH}
                 component={CommunicationsList}/>
          <Route path={GLOBAL.COMMUNICATIONS_ADMIN_ROUTE_PATH}
                 component={CommunicationsPost}/>
          <Route path={GLOBAL.MESSAGES_LIST_ROUTE_PATH}
                 component={MessagesList}/>
          <Route path={GLOBAL.PRODUCTS_PANEL_ROUTE_PATH}
                 component={ProductsPanel}/>
          {/*<Route path={GLOBAL.PRODUCTS_ADMIN_ROUTE_PATH} component={ProductsAdmin}/>*/}
          <Route path={GLOBAL.SUMMARY_PROFILE_ROUTE_PATH}
                 component={SummaryProfile}/>
          <Route path={GLOBAL.COMPLETE_PROFILE_ROUTE_PATH}
                 component={CompleteProfile}/>
          <Route path={GLOBAL.SUMMARY_GRUPOS_ROUTE_PATH}
                 component={GroupManager}/>
          <Route path={GLOBAL.SEARCH_PATH} component={Search} />
          <Route path="*" component={NotFound}/>
        </Route>

        <Route path={GLOBAL.NIMBLE} component={Nimble}/>
        <Route path={'/nimble/checkout'} component={NimbleCheckout}/>

        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  )
};
