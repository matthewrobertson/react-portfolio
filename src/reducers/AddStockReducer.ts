import { 
    ActionType, 
    ADD_STOCK, 
    ADD_STOCK_CHANGE,
    addHolding,
    IAddStockChangeAction,
} from '../actions';
import store from '../store';

export interface IAddStockState {
    ticker: string,
    isValid: boolean,
};

const defaultState: IAddStockState = {
    isValid: true,
    ticker: '',
};

export default function addStockReducer(
    state: IAddStockState = defaultState,
    action: ActionType,
): IAddStockState {
    switch (action.type) {
        case ADD_STOCK_CHANGE:
            return {
                isValid: true,
                ticker: (action as IAddStockChangeAction).ticker,
            };
        case ADD_STOCK:
            // TODO: fetch the stock info from the API
            setTimeout(() => {
                store.dispatch(addHolding(state.ticker));
            }, 100);
            return defaultState;
    }
    return state;
};