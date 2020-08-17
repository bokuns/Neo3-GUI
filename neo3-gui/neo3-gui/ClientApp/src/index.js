import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import './i18n';
import * as serviceWorker from './serviceWorker';
import { StoresProvider } from './store';
import { ViewportProvider } from './helpers/viewPort';
import 'mobx-react/batchingForReactDom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <StoresProvider>
      <Router>
        <ViewportProvider>
          <App />
        </ViewportProvider>
      </Router>
    </StoresProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
