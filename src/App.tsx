import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import AddStockForm from "./containers/AddStockContainer";
// import Holdings from "./containers/HoldingsContainer";
import { fetchExchangeRate, refreshAllHoldings } from "./fetchers/StockFetcher";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import store, { IStoreState } from "./store";
import { Modal } from "office-ui-fabric-react/lib/Modal";

import logo from "./logo.svg";
import BalancesContainer from "./containers/BalancesContainer";
import CashContainer from "./containers/CashContainer";
import EquitiesContainer from "./containers/EquitiesContainer";
import RebalanceContainer from "./containers/RebalanceContainer";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

class App extends React.Component<{}, { showModal: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  public componentDidMount() {
    const dispatch = store.dispatch.bind(store);
    fetchExchangeRate(dispatch);
    const state = store.getState() as IStoreState;
    refreshAllHoldings(dispatch, Object.keys(state.holdings));
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
                <h2 className="ms-font-xl">
                  Equities
                  <DefaultButton
                    iconProps={{ iconName: "Add" }}
                    title="Add Equity"
                    ariaLabel="Add Equity"
                    onClick={this.showModal}
                    style={{ float: "right" }}
                  >
                    Add
                  </DefaultButton>
                </h2>

                <EquitiesContainer />
                <h2 className="ms-font-xl">Cash</h2>
                <CashContainer />
              </PivotItem>
              <PivotItem headerText="Rebalance">
                <RebalanceContainer />
              </PivotItem>
            </Pivot>
            <Modal
              isOpen={this.state.showModal}
              onDismiss={this.closeModal}
              containerClassName="ms-modalExample-container"
            >
              <AddStockForm />
            </Modal>
          </div>
        </div>
      </Provider>
    );
  }

  private showModal = (): void => {
    this.setState({ showModal: true });
  };

  private closeModal = (): void => {
    this.setState({ showModal: false });
  };
}

export default App;
