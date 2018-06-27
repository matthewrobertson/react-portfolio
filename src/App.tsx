import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { refreshAllHoldings } from "./fetchers/StockFetcher";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import store, { IStoreState } from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import BalancesContainer from "./containers/BalancesContainer";
import RebalanceContainer from "./containers/RebalanceContainer";
import Positions from "./components/Positions";
import AddStockModal from "./components/AddStockModal";

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public componentDidMount() {
    const dispatch = store.dispatch.bind(store);
    const state = store.getState() as IStoreState;
    refreshAllHoldings(dispatch, state);
  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
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
                  <Positions />
                </PivotItem>
                <PivotItem headerText="Rebalance">
                  <RebalanceContainer />
                </PivotItem>
              </Pivot>
              <Route path="/add_holding" component={AddStockModal} />
              <Route
                path="/edit_holding/:edit_ticker"
                component={AddStockModal}
              />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
