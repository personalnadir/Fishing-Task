import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {phase1, phase2} from './images';
import {ensureKeysAreUnique, mapImagePathsToKeys} from './trials';
const lookUp1 = mapImagePathsToKeys(phase1);
const lookUp2 = mapImagePathsToKeys(phase2);

ensureKeysAreUnique(lookUp1, lookUp2);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
