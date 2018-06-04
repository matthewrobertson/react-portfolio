import { 
    ActionType, 
    FETCH_STOCK_QUOTE_SUCCESS,
    IFetchStockQuoteSuccess, 
    IUpdateStockCurrencyAction, 
    UPDATE_STOCK_CURRENCY,
} from '../actions/actions';
import { IStockQuote } from '../constants/types';


export interface IStockQuoteState {
    [ticker: string]: IStockQuote
};

export default function stockQuotesReducer(
    state: IStockQuoteState = {},
    action: ActionType,
): IStockQuoteState {
    switch (action.type) {
        case FETCH_STOCK_QUOTE_SUCCESS:
            return fetchStock(state, action as IFetchStockQuoteSuccess);
        case UPDATE_STOCK_CURRENCY:
            return updateCurrency(state, action as IUpdateStockCurrencyAction);
    }
    return state;
};

const fetchStock = (
    state: IStockQuoteState, 
    action: IFetchStockQuoteSuccess,
): IStockQuoteState => {
    const newState = Object.assign({}, state);
    newState[action.ticker] = action.quote;
    return newState;
}

const updateCurrency = (
    state: IStockQuoteState, 
    action: IUpdateStockCurrencyAction,
): IStockQuoteState => {
    const newState = Object.assign({}, state);
    newState[action.ticker].currency = action.currency;
    return newState;
}
