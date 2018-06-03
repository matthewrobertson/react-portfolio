import { 
    ADD_HOLDING,
    ADD_STOCK_CHANGE,
    FETCH_EXCHANGE_RATE_ERROR,
    FETCH_EXCHANGE_RATE_START,
    FETCH_EXCHANGE_RATE_SUCCESS,
    FETCH_STOCK_QUOTE_ERROR,
    FETCH_STOCK_QUOTE_START,
    FETCH_STOCK_QUOTE_SUCCESS,
    UPDATE_SHARE_COUNT,
    UPDATE_STOCK_CURRENCY,
} from './constants/actions'
import { 
    Currency,
    IStockQuote,
 } from './constants/types'

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

/**
 * Fetch exchange rate
 */


export interface IFetchExchangeRateStart {
    type: string,
}

export function fetchExchangeRateStart(): IFetchExchangeRateStart {
    return {
        type: FETCH_EXCHANGE_RATE_START,
    };
}

export interface IFetchExchangeRateSuccess {
    type: FETCH_EXCHANGE_RATE_SUCCESS,
    rate: number,
}

export function fetchExchangeRateSuccess(rate: number): IFetchExchangeRateSuccess {
    return {
        rate,
        type: FETCH_EXCHANGE_RATE_SUCCESS,
    };
}

export interface IFetchExchangeRateError {
    type: FETCH_EXCHANGE_RATE_SUCCESS,
    rate: number,
}

export function fetchExchangeRateError(rate: number): IFetchExchangeRateError {
    return {
        rate,
        type: FETCH_EXCHANGE_RATE_ERROR,
    };
}

export interface IUpdateStockCurrencyAction {
    type: UPDATE_STOCK_CURRENCY,
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