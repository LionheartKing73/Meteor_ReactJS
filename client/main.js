import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import getAppWithRouter from '../imports/router';
import createStore from '../imports/redux/create';
import { syncHistoryWithStore } from 'react-router-redux';

/**
 * Redux initialData (Meteor hot reload)
 */
const LS_KEY = 'redux_ls_key';

const lsData = localStorage.getItem(LS_KEY);
if (lsData) {
  try {
    const data = JSON.parse(lsData);
    window.__data = data;
  } catch (e) {
    console.warn(e);
  }
}

const store = localStorage.getItem('preserve-redux')
  ? createStore(browserHistory, window.__data)
  : createStore(browserHistory);
global.STORE = store;

let preventReload = true; //

Reload._onMigrate((retry) => {
  if (preventReload) {
    preventReload = false;
    localStorage.setItem(LS_KEY, JSON.stringify(store.getState()));
    _.delay(retry, 1000);
    return [false];
  }
  return [true];
});

window.resetRedux = () => {
  Meteor.call('dev.resetArgumentacoes', () => {
    localStorage.removeItem(LS_KEY);
    location.reload();
  })
};


function getGoogleFonts() {
  global.WebFontConfig = {
    google: { families: ['Open Sans:400,600,700,800'] },
  };
  (function () {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol == 'https:' ? 'https' : 'http'
      }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }());
}

const history = syncHistoryWithStore(browserHistory, store);

Meteor.startup(() => {
  getGoogleFonts();
  render(getAppWithRouter(history, store), document.getElementById('root'));
});
