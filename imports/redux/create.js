import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/reducer';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';

export default function createStore(history, initialData) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const lista = [
    applyMiddleware(reduxRouterMiddleware, thunk),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  ];

  if (window.devToolsExtension) lista.push(window.devToolsExtension());
  // lista.push(DevTools.instrument());

  const finalCreateStore = compose(...lista)(_createStore);

  return finalCreateStore(reducer, initialData);
}
