import { 
    ActionType, 
    IFetchExchangeRateError,
    IFetchExchangeRateStart,
    IFetchExchangeRateSuccess,
} from '../actions';
import { 
    FETCH_EXCHANGE_RATE_ERROR, 
    FETCH_EXCHANGE_RATE_START,
    FETCH_EXCHANGE_RATE_SUCCESS,
} from '../constants/actions';

export interface IExchangeRateState {
    isLoading: boolean,
    CAD: number,
};

export default function exhangeRateReducer(
    state: IExchangeRateState = {isLoading: false, CAD: 1.25},
    action: ActionType,
): IExchangeRateState {
    switch (action.type) {
        case FETCH_EXCHANGE_RATE_START:
            return start(state, action as IFetchExchangeRateStart);
        case FETCH_EXCHANGE_RATE_SUCCESS:
            return onComplete(state, action as IFetchExchangeRateSuccess);
        case FETCH_EXCHANGE_RATE_ERROR:
            return onComplete(state, action as IFetchExchangeRateError);
    }
    return state;
};

function start(
    state: IExchangeRateState,
    action: IFetchExchangeRateStart,
): IExchangeRateState {
    const newState = Object.assign({}, state);
    newState.isLoading = true;
    return newState;
}

function onComplete(
    state: IExchangeRateState,
    action: IFetchExchangeRateSuccess | IFetchExchangeRateError,
): IExchangeRateState {
    return {
        CAD: action.rate,
        isLoading: false,
    };
}