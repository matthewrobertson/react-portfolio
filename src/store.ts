import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import addStockReducer, { IAddStockState } from "./reducers/AddStockReducer";
import exchangeRateReducer, {
  IExchangeRateState,
} from "./reducers/ExchangeRateReducer";
import holdingsReducer, { IHoldingsState } from "./reducers/HoldingsReducer";
import stockQuotesReducer, {
  IStockQuoteState,
} from "./reducers/StockQuotesReducer";
import { loadState, persistState } from "./utils/localStorage";
import cashHoldingReducer, { ICashHoldingsState } from "./reducers/CashReducer";
import rebalanceCashReducer, {
  IRebalanceCashState,
} from "./reducers/RebalanceCashReducer";

export interface IStoreState {
  addStock: IAddStockState;
  holdings: IHoldingsState;
  stockQuotes: IStockQuoteState;
  exchangeRate: IExchangeRateState;
  cash: ICashHoldingsState;
  rebalanceCash: IRebalanceCashState;
}

const reducer = combineReducers({
  addStock: addStockReducer,
  exchangeRate: exchangeRateReducer,
  holdings: holdingsReducer,
  stockQuotes: stockQuotesReducer,
  cash: cashHoldingReducer,
  rebalanceCash: rebalanceCashReducer,
});

const storedState = loadState();

const store = storedState
  ? createStore<IStoreState, any, any, any>(
      reducer,
      storedState,
      applyMiddleware(logger)
    )
  : createStore<IStoreState, any, any, any>(reducer, applyMiddleware(logger));

store.subscribe(() => {
  persistState(store.getState());
});

export default store;
