export interface IStockQuote {
    ticker: string,
    open: number,
    close: number,
    volume: number,
    currency: Currency,
};

export interface IHoldingDetails {
    currency: Currency,
    currentPercentage: number,
    shareCount: number,
    sharePrice: number,
    targetPercent: number,
    ticker: string,
    usdValue: number,
    cadValue: number,
    shareDiff: number,
};

export enum Currency {
    CAD = "CAD",
    USD = "USD",
};