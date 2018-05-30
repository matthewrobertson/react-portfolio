import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import addStockReducer, {IAddStockState} from './reducers/AddStockReducer';
import holdingsReducer from './reducers/HoldingsReducer';

export interface IStoreState {
    addStock: IAddStockState,
    holdings: string[],
};

const reducer = combineReducers({
  addStock: addStockReducer,
  holdings: holdingsReducer,
});

export default createStore<IStoreState, any, any, any>(reducer, applyMiddleware(logger));