import { 
    ActionType, 
    IFetchStockQuoteSuccess, 
} from '../actions';
import { FETCH_STOCK_QUOTE_SUCCESS } from '../constants/actions';
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
            const tAction = action as IFetchStockQuoteSuccess;
            const newState = Object.assign({}, state);
            newState[tAction.ticker] = tAction.quote;
            return newState;
    }
    return state;
};
