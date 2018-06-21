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

export const computeRebalanceCash = (state: IStoreState): number => {
  return sumCash(
    state.rebalanceCash.CAD,
    state.rebalanceCash.USD,
    state.exchangeRate.CAD
  );
};

export const computeTotalCash = (state: IStoreState): number => {
  return sumCash(
    state.cash[Currency.CAD] ? state.cash[Currency.CAD].count : 0,
    state.cash[Currency.USD] ? state.cash[Currency.USD].count : 0,
    state.exchangeRate.CAD
  );
};

const sumCash = (
  cad: number | null,
  usd: number | null,
  exchangeRate: number
): number => {
  let totalUSD = 0;
  if (usd) {
    totalUSD += usd;
  }
  if (cad) {
    totalUSD += cad / exchangeRate;
  }
  return totalUSD;
};

export const computeNetWorth = (state: IStoreState): number => {
  return computeTotalCash(state) + computeTotalEquity(state);
};
