import App from './component'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import './base.css';
import React from 'react'; // eslint-disable-line no-unused-vars


// document.body.appendChild(component());
// var myApp = <div>Hello world<div/>;
// var elem = React.createElement(App);

render(<App />, document.getElementById('app'));
