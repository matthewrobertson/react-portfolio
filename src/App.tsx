import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AddStockForm from './containers/AddStockContainer';
import Holdings from './containers/HoldingsContainer';
import store from './store';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <div>
            <AddStockForm />
            <Holdings />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
