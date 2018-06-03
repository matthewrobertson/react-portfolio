export interface IStockQuote {
    ticker: string,
    open: number,
    close: number,
    volume: number,
};

export interface IHoldingDetails {
    currentPercentage: number,
    shareCount: number,
    sharePrice: number,
    targetPercent: number,
    ticker: string,
    totalValue: number,
};