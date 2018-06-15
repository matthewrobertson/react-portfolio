import { Currency } from "../constants/types";
import { IStoreState } from "../store";

export const computeTotalEquity = (state: IStoreState): number => {
  let totalUSD = 0;
  const exchangeRate = state.exchangeRate.CAD;
  const stocks = Object.keys(state.holdings);
  for (const stock of stocks) {
    const quote = state.stockQuotes[stock];
    const val = state.holdings[stock].count * quote.close;
    if (quote.currency === Currency.USD) {
      totalUSD += val;
    } else {
      totalUSD += val / exchangeRate;
    }
  }
  return totalUSD;
};

export const computeTotalCash = (state: IStoreState): number => {
  let totalUSD = 0;
  const usdHolding = state.cash[Currency.USD];
  const cadHolding = state.cash[Currency.CAD];
  const exchangeRate = state.exchangeRate.CAD;
  if (usdHolding) {
    totalUSD += usdHolding.count;
  }
  if (cadHolding) {
    totalUSD += cadHolding.count / exchangeRate;
  }
  return totalUSD;
};

export const computeNetWorth = (state: IStoreState): number => {
  return computeTotalCash(state) + computeTotalEquity(state);
};
