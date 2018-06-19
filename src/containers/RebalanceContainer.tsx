import { connect } from "react-redux";
import RebalanceList, { IRebalanceListItem } from "../components/RebalanceList";
import { Currency } from "../constants/types";
import { IStoreState } from "../store";
import { computeTotalEquity } from "../services/SummationService";

const initializeHolding = (
  stock: string,
  price: number,
  shareCount: number,
  netWorth: number,
  currency: Currency,
  exchangeRate: number,
  targetPercent: number,
  buySell: number
): IRebalanceListItem => {
  const totalValue = price * shareCount;
  const positionValue =
    currency === Currency.USD ? totalValue : totalValue / exchangeRate;
  const percentPort = netWorth > 0 ? positionValue / netWorth : 0.0;

  return {
    stock,
    shareCount,
    positionValue,
    percentPort,
    targetPercent,
    buySell,
  };
};

const initializeHoldings = (
  state: IStoreState,
  newWorth: number
): IRebalanceListItem[] => {
  const stocks = Object.keys(state.holdings);
  return stocks.map(stock =>
    initializeHolding(
      stock,
      state.stockQuotes[stock].close,
      state.holdings[stock].count,
      newWorth,
      state.stockQuotes[stock].currency,
      state.exchangeRate.CAD,
      state.holdings[stock].target,
      5
    )
  );
};

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeTotalEquity(state);
  return {
    equities: initializeHoldings(state, netWorth),
  };
}

export default connect(mapStateToProps)(RebalanceList);
