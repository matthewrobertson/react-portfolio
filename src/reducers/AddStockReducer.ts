import { 
    ActionType, 
    ADD_HOLDING,
    ADD_STOCK_CHANGE, 
    IAddStockChangeAction,
} from '../actions/actions';

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
        case ADD_HOLDING:
            return defaultState;
    }
    return state;
};