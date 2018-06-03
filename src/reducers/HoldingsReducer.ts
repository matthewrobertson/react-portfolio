import { 
    ActionType, 
    IAddHoldingAction, 
} from '../actions';
import { ADD_HOLDING } from '../constants/actions';
import { IHoldingDetails } from '../constants/types';
import { initializeHolding } from '../utils/HoldingHelpers';

export interface IHoldingsState {
    [ticker: string]: IHoldingDetails
};

export default function addStockReducer(
    state: IHoldingsState = {},
    action: ActionType,
): IHoldingsState {
    switch (action.type) {
        case ADD_HOLDING:
            const newState = Object.assign({}, state);
            const ticker = (action as IAddHoldingAction).ticker;
            const value = (action as IAddHoldingAction).value;
            newState[ticker] = initializeHolding(ticker, value);
            return newState;
    }
    return state;
};