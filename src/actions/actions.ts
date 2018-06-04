import { Action } from 'redux';
import { 
    Currency,
    IStockQuote,
 } from '../constants/types';

 export const ADD_STOCK_CHANGE = 'ADD_STOCK_CHANGE';
 export const ADD_HOLDING = 'ADD_HOLDING';
 export const FETCH_STOCK_QUOTE_START = 'FETCH_STOCK_QUOTE_START';
 export const FETCH_STOCK_QUOTE_SUCCESS = 'FETCH_STOCK_QUOTE_SUCCESS';
 export const FETCH_STOCK_QUOTE_ERROR = 'FETCH_STOCK_QUOTE_ERROR';
 export const UPDATE_STOCK_CURRENCY = 'UPDATE_STOCK_CURRENCY';
 export const UPDATE_SHARE_COUNT = 'UPDATE_SHARE_COUNT';
 export const FETCH_EXCHANGE_RATE_START = 'FETCH_EXCHANGE_RATE_START';
 export const FETCH_EXCHANGE_RATE_SUCCESS = 'FETCH_EXCHANGE_RATE_SUCCESS';
 export const FETCH_EXCHANGE_RATE_ERROR = 'FETCH_EXCHANGE_RATE_ERROR';

/**
 * ADD_STOCK_CHANGE
 */
export interface IAddStockChangeAction extends Action {
    type: typeof ADD_STOCK_CHANGE,
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


export function addHolding(ticker: string, value: number) {
    return { 
        ticker,
        type: ADD_HOLDING as typeof ADD_HOLDING,
        value,
    };
};
export type IAddHoldingAction = ReturnType<typeof addHolding>;

/**
 * FETCH_STOCK_***
 */
export interface IFetchStockQuoteStart extends Action {
    type: typeof FETCH_STOCK_QUOTE_START,
    ticker: string,
};

export function fetchStockQuoteStart(ticker: string): IFetchStockQuoteStart {
    return {
        ticker,
        type: FETCH_STOCK_QUOTE_START,
    };
}

export interface IFetchStockQuoteSuccess extends Action {
    type: typeof FETCH_STOCK_QUOTE_SUCCESS,
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

export interface IFetchStockQuoteError extends Action {
    error: string,
    type: typeof FETCH_STOCK_QUOTE_ERROR,
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
export interface IUpdateShareCount extends Action {
    count: number,
    type: typeof UPDATE_SHARE_COUNT,
    ticker: string,
};

export function updateShareCount(ticker: string, count: number): IUpdateShareCount {
    return {
        count,
        ticker,
        type: UPDATE_SHARE_COUNT,
    };
}

/**
 * Fetch exchange rate
 */


export interface IFetchExchangeRateStart extends Action {
    type: typeof FETCH_EXCHANGE_RATE_START,
}

export function fetchExchangeRateStart(): IFetchExchangeRateStart {
    return {
        type: FETCH_EXCHANGE_RATE_START,
    };
}

export interface IFetchExchangeRateSuccess extends Action {
    type: typeof FETCH_EXCHANGE_RATE_SUCCESS,
    rate: number,
}

export function fetchExchangeRateSuccess(rate: number): IFetchExchangeRateSuccess {
    return {
        rate,
        type: FETCH_EXCHANGE_RATE_SUCCESS,
    };
}

export interface IFetchExchangeRateError extends Action {
    type: typeof FETCH_EXCHANGE_RATE_ERROR,
    rate: number,
}

export function fetchExchangeRateError(rate: number): IFetchExchangeRateError {
    return {
        rate,
        type: FETCH_EXCHANGE_RATE_ERROR,
    };
}

export interface IUpdateStockCurrencyAction extends Action {
    type: typeof UPDATE_STOCK_CURRENCY,
    ticker: string,
    currency: Currency,
}

export function updateStockCurrency(ticker: string, currency: Currency): IUpdateStockCurrencyAction {
    return {
        currency,
        ticker,
        type: UPDATE_STOCK_CURRENCY,
    };
}

// type IUpdateStockCurrencyAction = ReturnType<updateStockCurrency>;

export type ActionType = 
    IAddStockChangeAction | 
    IAddHoldingAction | 
    IFetchStockQuoteError | 
    IFetchStockQuoteSuccess | 
    IFetchStockQuoteStart |
    IUpdateShareCount |
    IFetchExchangeRateError |
    IFetchExchangeRateSuccess |
    IFetchExchangeRateStart |
    IUpdateStockCurrencyAction;