import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import AddStockForm from "./containers/AddStockContainer";
// import Holdings from "./containers/HoldingsContainer";
import { fetchExchangeRate } from "./fetchers/StockFetcher";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import store from "./store";

import logo from "./logo.svg";
import BalancesContainer from "./containers/BalancesContainer";
import CashContainer from "./containers/CashContainer";
import EquitiesContainer from "./containers/EquitiesContainer";
import RebalanceContainer from "./containers/RebalanceContainer";
import HoldingsContainer from "./containers/HoldingsContainer";

class App extends React.Component {
  public componentDidMount() {
    fetchExchangeRate(store.dispatch.bind(store));
  }

  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-ContentWrapper">
            <Pivot>
              <PivotItem headerText="Balances">
                <BalancesContainer />
              </PivotItem>
              <PivotItem headerText="Positions">
                <h2 className="ms-font-xxl">Equities</h2>
                <EquitiesContainer />
                <h2 className="ms-font-xxl">Cash</h2>
                <CashContainer />
                <AddStockForm />
              </PivotItem>
              <PivotItem headerText="Rebalance">
                <RebalanceContainer />
                <HoldingsContainer />
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
