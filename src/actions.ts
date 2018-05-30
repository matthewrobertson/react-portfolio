/**
 * ADD_STOCK
 */
export const ADD_STOCK: string = 'ADD_STOCK';
export type ADD_STOCK = typeof ADD_STOCK;

export interface IAddStockAction {
    type: ADD_STOCK,
};

export function addStock(): IAddStockAction {
    return { type: ADD_STOCK };
};

/**
 * ADD_STOCK_CHANGE
 */
export const ADD_STOCK_CHANGE: string = 'ADD_STOCK_CHANGE';
export type ADD_STOCK_CHANGE = typeof ADD_STOCK_CHANGE;

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
export const ADD_HOLDING: string = 'ADD_HOLDING';
export type ADD_HOLDING = typeof ADD_HOLDING;

export interface IAddHoldingAction {
    type: ADD_HOLDING,
    ticker: string,
};

export function addHolding(ticker: string): IAddHoldingAction {
    return { 
        ticker,
        type: ADD_HOLDING,
    };
};

export type ActionType = IAddStockAction | IAddStockChangeAction | IAddHoldingAction;