import { 
    ADD_HOLDING,
    ADD_STOCK,
    ADD_STOCK_CHANGE,
    FETCH_STOCK_QUOTE_ERROR,
    FETCH_STOCK_QUOTE_START,
    FETCH_STOCK_QUOTE_SUCCESS,
    UPDATE_SHARE_COUNT,
} from './constants/actions'
import { IStockQuote } from './constants/types'

/**
 *  TODO this is unused
 */
export interface IAddStockAction {
    type: ADD_STOCK,
    ticker: string,
    value: number,
};

export function addStock(ticker: string, value: number): IAddStockAction {
    return { 
        ticker,
        type: ADD_STOCK,
        value,
     };
};

/**
 * ADD_STOCK_CHANGE
 */
export interface IAddStockChangeAction {
    type: ADD_STOCK_CHANGE,
    ticker: string,
};

export function addStockChange(ticker: string): IAddStockChangeAction {
    return { 
        ticker,
        type: ADD_STOCK_CHANGE,
    };
};

/**
 * ADD_HOLDING
 */
export interface IAddHoldingAction {
    type: ADD_HOLDING,
    ticker: string,
    value: number,
};

export function addHolding(ticker: string, value: number): IAddHoldingAction {
    return { 
        ticker,
        type: ADD_HOLDING,
        value,
    };
};

/**
 * FETCH_STOCK_***
 */
export interface IFetchStockQuoteStart {
    type: FETCH_STOCK_QUOTE_START,
    ticker: string,
};

export function fetchStockQuoteStart(ticker: string): IFetchStockQuoteStart {
    return {
        ticker,
        type: FETCH_STOCK_QUOTE_START,
    };
}

export interface IFetchStockQuoteSuccess {
    type: FETCH_STOCK_QUOTE_SUCCESS,
    ticker: string,
    quote: IStockQuote,
};

export function fetchStockQuoteSuccess(ticker: string, quote: IStockQuote): IFetchStockQuoteSuccess {
    return {
        quote,
        ticker,
        type: FETCH_STOCK_QUOTE_SUCCESS,
    };
}

export interface IFetchStockQuoteError {
    error: string,
    type: FETCH_STOCK_QUOTE_ERROR,
    ticker: string,
};

export function fetchStockQuoteError(ticker: string, error: string): IFetchStockQuoteError {
    return {
        error,
        ticker,
        type: FETCH_STOCK_QUOTE_ERROR,
    };
}

/**
 * UPDATE_SHARE_COUNT
 */
export interface IUpdateShareCount {
    count: number,
    type: UPDATE_SHARE_COUNT,
    ticker: string,
};

export function updateShareCount(ticker: string, count: number): IUpdateShareCount {
    return {
        count,
        ticker,
        type: UPDATE_SHARE_COUNT,
    };
}

export type ActionType = 
    IAddStockAction | 
    IAddStockChangeAction | 
    IAddHoldingAction | 
    IFetchStockQuoteError | 
    IFetchStockQuoteSuccess | 
    IFetchStockQuoteStart |
    IUpdateShareCount;