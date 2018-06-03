import { 
    ActionType, 
    IAddHoldingAction,
    IUpdateShareCount, 
} from '../actions';
import { ADD_HOLDING, UPDATE_SHARE_COUNT } from '../constants/actions';
import { IHoldingDetails } from '../constants/types';
import { initializeHolding, recomputeHolding } from '../utils/HoldingHelpers';

export interface IHoldingsState {
    [ticker: string]: IHoldingDetails
};

export default function addStockReducer(
    state: IHoldingsState = {},
    action: ActionType,
): IHoldingsState {
    switch (action.type) {
        case ADD_HOLDING:
            return addHolding(state, action as IAddHoldingAction);
        case UPDATE_SHARE_COUNT:
            return udpateShareCount(state, action as IUpdateShareCount);
    }
    return state;
};

function addHolding(
    state: IHoldingsState,
    action: IAddHoldingAction
): IHoldingsState {
    const newState = Object.assign({}, state);
    const { ticker, value } = action;
    newState[ticker] = initializeHolding(ticker, value);
    return newState;
}

function udpateShareCount(
    state: IHoldingsState,
    action: IUpdateShareCount,
): IHoldingsState {
    const newState = Object.assign({}, state);
    const { ticker, count } = action;
    newState[ticker] = recomputeHolding(newState[ticker], 100, count);
    return newState;
}