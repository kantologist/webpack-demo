import App from './component'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import './base.css';
import { install } from 'offline-plugin/runtime';
import React from 'react'; // eslint-disable-line no-unused-vars


// document.body.appendChild(component());
// var myApp = <div>Hello world<div/>;
// var elem = React.createElement(App);

render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV === 'production'){
  install();
}
