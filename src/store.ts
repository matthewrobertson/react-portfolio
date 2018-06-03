import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import addStockReducer, {IAddStockState} from './reducers/AddStockReducer';
import exchangeRateReducer, { IExchangeRateState } from './reducers/ExchangeRateReducer';
import holdingsReducer, { IHoldingsState } from './reducers/HoldingsReducer';
import stockQuotesReducer, { IStockQuoteState } from './reducers/StockQuotesReducer';
import { loadState, persistState } from './utils/localStorage';

export interface IStoreState {
    addStock: IAddStockState,
    holdings: IHoldingsState,
    stockQuotes: IStockQuoteState,
    exchangeRate: IExchangeRateState
};

const reducer = combineReducers({
  addStock: addStockReducer,
  exchangeRate: exchangeRateReducer,
  holdings: holdingsReducer,
  stockQuotes: stockQuotesReducer,
});

const storedState = loadState();

const store = storedState
  ? createStore<IStoreState, any, any, any>(reducer, storedState, applyMiddleware(logger)) 
  : createStore<IStoreState, any, any, any>(reducer, applyMiddleware(logger));

store.subscribe(() => {
  persistState(store.getState());
});

export default store;

