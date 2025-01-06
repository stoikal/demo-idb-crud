// TODO enable eslint rule
/* eslint-disable import/no-import-module-exports */
import './styles/normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

module.hot.accept();
