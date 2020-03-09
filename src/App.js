import React from 'react';
import './App.css';
import Global from './Global';

import { Provider } from 'react-redux'
import store from './redux/store'

import Feedback from './Feedback';

function App(props) {
  return (
    <Provider store={store}>
      <div className="App">
        <Global />
      </div>
    </Provider>
  );
}

export default App;
