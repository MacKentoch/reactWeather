'use strict';

import 'babel-polyfill';
import React                from 'react';
import ReactDOM             from 'react-dom';
import injectTpEventPlugin  from 'react-tap-event-plugin';
import { Routes }           from './routes/Routes.jsx';

import 'animate.css';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style/customBootstrap/style.css';
import './style/index.style.scss';

const ELEMENT_TO_BOOTSTRAP  = 'root';
const BootstrapedElement    = document.getElementById(ELEMENT_TO_BOOTSTRAP);

injectTpEventPlugin();

ReactDOM.render(<Routes />, BootstrapedElement);
