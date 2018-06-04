import { 
    ActionType, 
    ADD_HOLDING,
    IAddHoldingAction, 
    IUpdateShareCount,
    UPDATE_SHARE_COUNT,
} from '../actions/actions';

export interface IHoldingsState {
    [ticker: string]: number
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
    const { ticker } = action;
    newState[ticker] = 0;
    return newState;
}

function udpateShareCount(
    state: IHoldingsState,
    action: IUpdateShareCount,
): IHoldingsState {
    const newState = Object.assign({}, state);
    const { ticker, count } = action;
    newState[ticker] = count;
    return newState;
}