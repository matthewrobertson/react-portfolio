import { IHoldingDetails } from '../constants/types';

export function initializeHolding(ticker: string, sharePrice: number): IHoldingDetails {
    return {
        currentPercentage: 0,
        shareCount: 0,
        sharePrice,
        targetPercent: 0,
        ticker,
        totalValue: 0,
    };
}

export function recomputeHolding(
    holding: IHoldingDetails, 
    netWorth: number, 
    shareCount: number, 
): IHoldingDetails {
    const newHolding = Object.assign(holding);
    newHolding.shareCount = shareCount;
    newHolding.totalValue = newHolding.shareCount * newHolding.sharePrice;
    newHolding.currentPercentage = netWorth > 0 ? (newHolding.totalValue / netWorth) * 100 : 0.0;
    return newHolding;
}

export function computeNetWorth(
    holdings: IHoldingDetails[],
): number {
    let worth = 0;
    for (const holding of holdings) {
        worth += holding.totalValue;
    }
    return worth;
}