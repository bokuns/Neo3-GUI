import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoresProvider } from './store';
import 'mobx-react/batchingForReactDom';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <StoresProvider>
      <Router>
        <App />
      </Router>
    </StoresProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
