// import { values } from 'lodash-es';
import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/actions";
import HoldingsList from "../components/HoldingsList";
import { Currency, IHoldingDetails } from "../constants/types";
import { IStoreState } from "../store";

const initializeHolding = (
  ticker: string,
  sharePrice: number,
  shareCount: number,
  netWorth: number,
  currency: Currency,
  exchangeRate: number,
  targetPercent: number
): IHoldingDetails => {
  const totalValue = sharePrice * shareCount;
  const usdValue =
    currency === Currency.USD ? totalValue : totalValue / exchangeRate;
  const cadValue =
    currency === Currency.CAD ? totalValue : totalValue * exchangeRate;
  const currentPercentage = netWorth > 0 ? usdValue / netWorth : 0.0;
  const usdPrice =
    currency === Currency.USD ? sharePrice : sharePrice / exchangeRate;
  const shareDiff = Math.floor(
    (netWorth * targetPercent) / usdPrice / 100 - shareCount
  );
  return {
    cadValue,
    currency,
    currentPercentage,
    shareCount,
    shareDiff,
    sharePrice,
    targetPercent,
    ticker,
    usdValue,
  };
};

const initializeHoldings = (
  state: IStoreState,
  newWorth: number
): IHoldingDetails[] => {
  const stocks = Object.keys(state.holdings);
  return stocks.map(stock =>
    initializeHolding(
      stock,
      state.stockQuotes[stock].close,
      state.holdings[stock].count,
      newWorth,
      state.stockQuotes[stock].currency,
      state.exchangeRate.CAD,
      state.holdings[stock].target
    )
  );
};

const initializeCashHoldings = (
  state: IStoreState,
  netWorth: number
): IHoldingDetails[] => {
  const holdings = [];
  const usdHolding = state.cash[Currency.USD];
  const cadHolding = state.cash[Currency.CAD];
  if (usdHolding) {
    holdings.push(
      initializeHolding(
        Currency.USD,
        1.0,
        usdHolding.count,
        netWorth,
        Currency.USD,
        state.exchangeRate.CAD,
        usdHolding.target
      )
    );
  }
  if (cadHolding) {
    holdings.push(
      initializeHolding(
        Currency.CAD,
        1.0,
        cadHolding.count,
        netWorth,
        Currency.CAD,
        state.exchangeRate.CAD,
        cadHolding.target
      )
    );
  }
  return holdings;
};

const computeNetWorth = (state: IStoreState): { usd: number; cad: number } => {
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
  return { usd: totalUSD, cad: totalUSD * exchangeRate };
};

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeNetWorth(state);
  return {
    holdings: initializeCashHoldings(state, netWorth.usd).concat(
      initializeHoldings(state, netWorth.usd)
    ),
    netWorthCAD: netWorth.cad,
    netWorthUSD: netWorth.usd,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onShareCountChange: (ticker: string, count: number) =>
      dispatch(actions.updateShareCount(ticker, count)),
    onUpdateCurrency: (ticker: string, currency: Currency) =>
      dispatch(actions.updateStockCurrency(ticker, currency)),
    onUpdateTarget: (ticker: string, targetPercent: number) =>
      dispatch(actions.updateTargetPercent(ticker, targetPercent)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoldingsList);
