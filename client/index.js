import React, { ReactDOM } from 'infra/renderer';
import { Provider, store } from 'infra/storage';

if (process.env.BROWSER) {
  require('presentations/styles/index.scss');
}

function renderApp () {
  const App = require('./app').default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('body'),
  );
}

renderApp();

if (module.hot) module.hot.accept();
