import { Action } from "redux";
import { Currency, IStockQuote } from "../constants/types";
import { IAddStockState } from "../reducers/AddStockReducer";

export const ADD_STOCK_CHANGE = "ADD_STOCK_CHANGE";
export const ADD_HOLDING = "ADD_HOLDING";
export const ADD_CASH = "ADD_CASH";
export const FETCH_STOCK_QUOTE_START = "FETCH_STOCK_QUOTE_START";
export const FETCH_STOCK_QUOTE_SUCCESS = "FETCH_STOCK_QUOTE_SUCCESS";
export const FETCH_STOCK_QUOTE_ERROR = "FETCH_STOCK_QUOTE_ERROR";
export const UPDATE_STOCK_CURRENCY = "UPDATE_STOCK_CURRENCY";
export const UPDATE_SHARE_COUNT = "UPDATE_SHARE_COUNT";
export const FETCH_EXCHANGE_RATE_START = "FETCH_EXCHANGE_RATE_START";
export const FETCH_EXCHANGE_RATE_SUCCESS = "FETCH_EXCHANGE_RATE_SUCCESS";
export const FETCH_EXCHANGE_RATE_ERROR = "FETCH_EXCHANGE_RATE_ERROR";
export const UPDATE_HOLDING_PERCENT = "UPDATE_HOLDING_PERCENT";

/**
 * ADD_STOCK_CHANGE
 */
export interface IAddStockChangeAction extends Action {
  type: typeof ADD_STOCK_CHANGE;
  field: keyof IAddStockState;
  value: string;
}

export function addStockChange(
  field: keyof IAddStockState,
  value: string
): IAddStockChangeAction {
  return {
    field,
    type: ADD_STOCK_CHANGE,
    value,
  };
}

/**
 * ADD_HOLDING
 */

export function addHolding(ticker: string, value: number, quantity: number) {
  return {
    ticker,
    type: ADD_HOLDING as typeof ADD_HOLDING,
    value,
    quantity,
  };
}
export type IAddHoldingAction = ReturnType<typeof addHolding>;

export function addCash(currency: Currency, amount: number) {
  return {
    type: ADD_CASH as typeof ADD_CASH,
    currency,
    amount,
  };
}

export type IAddCashAction = ReturnType<typeof addCash>;

/**
 * FETCH_STOCK_***
 */
export interface IFetchStockQuoteStart extends Action {
  type: typeof FETCH_STOCK_QUOTE_START;
  ticker: string;
}

export function fetchStockQuoteStart(ticker: string): IFetchStockQuoteStart {
  return {
    ticker,
    type: FETCH_STOCK_QUOTE_START,
  };
}

export interface IFetchStockQuoteSuccess extends Action {
  type: typeof FETCH_STOCK_QUOTE_SUCCESS;
  ticker: string;
  quote: IStockQuote;
}

export function fetchStockQuoteSuccess(
  ticker: string,
  quote: IStockQuote
): IFetchStockQuoteSuccess {
  return {
    quote,
    ticker,
    type: FETCH_STOCK_QUOTE_SUCCESS,
  };
}

export interface IFetchStockQuoteError extends Action {
  error: string;
  type: typeof FETCH_STOCK_QUOTE_ERROR;
  ticker: string;
}

export function fetchStockQuoteError(
  ticker: string,
  error: string
): IFetchStockQuoteError {
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
  count: number;
  type: typeof UPDATE_SHARE_COUNT;
  ticker: string;
}

export function updateShareCount(
  ticker: string,
  count: number
): IUpdateShareCount {
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
  type: typeof FETCH_EXCHANGE_RATE_START;
}

export function fetchExchangeRateStart(): IFetchExchangeRateStart {
  return {
    type: FETCH_EXCHANGE_RATE_START,
  };
}

export interface IFetchExchangeRateSuccess extends Action {
  type: typeof FETCH_EXCHANGE_RATE_SUCCESS;
  rate: number;
}

export function fetchExchangeRateSuccess(
  rate: number
): IFetchExchangeRateSuccess {
  return {
    rate,
    type: FETCH_EXCHANGE_RATE_SUCCESS,
  };
}

export interface IFetchExchangeRateError extends Action {
  type: typeof FETCH_EXCHANGE_RATE_ERROR;
  rate: number;
}

export function fetchExchangeRateError(rate: number): IFetchExchangeRateError {
  return {
    rate,
    type: FETCH_EXCHANGE_RATE_ERROR,
  };
}

export interface IUpdateStockCurrencyAction extends Action {
  type: typeof UPDATE_STOCK_CURRENCY;
  ticker: string;
  currency: Currency;
}

export function updateStockCurrency(
  ticker: string,
  currency: Currency
): IUpdateStockCurrencyAction {
  return {
    currency,
    ticker,
    type: UPDATE_STOCK_CURRENCY,
  };
}

export interface IUpdateTargetPercent extends Action {
  type: typeof UPDATE_HOLDING_PERCENT;
  ticker: string;
  target: number;
}

export function updateTargetPercent(
  ticker: string,
  target: number
): IUpdateTargetPercent {
  return {
    target,
    ticker,
    type: UPDATE_HOLDING_PERCENT,
  };
}

// type IUpdateStockCurrencyAction = ReturnType<updateStockCurrency>;

export type ActionType =
  | IAddStockChangeAction
  | IAddHoldingAction
  | IAddCashAction
  | IFetchStockQuoteError
  | IFetchStockQuoteSuccess
  | IFetchStockQuoteStart
  | IUpdateShareCount
  | IFetchExchangeRateError
  | IFetchExchangeRateSuccess
  | IFetchExchangeRateStart
  | IUpdateStockCurrencyAction
  | IUpdateTargetPercent;
