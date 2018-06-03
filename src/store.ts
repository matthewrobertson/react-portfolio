import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import addStockReducer, {IAddStockState} from './reducers/AddStockReducer';
import exchangeRateReducer, { IExchangeRateState } from './reducers/ExchangeRateReducer';
import holdingsReducer, { IHoldingsState } from './reducers/HoldingsReducer';
import stockQuotesReducer, { IStockQuoteState } from './reducers/StockQuotesReducer';

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

export default createStore<IStoreState, any, any, any>(reducer, applyMiddleware(logger));