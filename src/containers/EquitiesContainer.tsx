import { connect } from "react-redux";
import EquitiesList, { IEquityListItem } from "../components/EquitiesList";
import { Currency } from "../constants/types";
import { IStoreState } from "../store";
import { computeTotalEquity } from "../services/SummationService";

const initializeHolding = (
  stock: string,
  price: number,
  shareCount: number,
  netWorth: number,
  currency: Currency,
  exchangeRate: number
): IEquityListItem => {
  const totalValue = price * shareCount;
  const value =
    currency === Currency.USD ? totalValue : totalValue / exchangeRate;
  const percentPort = netWorth > 0 ? value / netWorth : 0.0;

  return {
    stock,
    price,
    shareCount,
    currency,
    percentPort,
    value,
  };
};

const initializeHoldings = (
  state: IStoreState,
  newWorth: number
): IEquityListItem[] => {
  const stocks = Object.keys(state.holdings);
  return stocks.map(stock =>
    initializeHolding(
      stock,
      state.stockQuotes[stock].close,
      state.holdings[stock].count,
      newWorth,
      state.stockQuotes[stock].currency,
      state.exchangeRate.CAD
    )
  );
};

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeTotalEquity(state);
  return {
    equities: initializeHoldings(state, netWorth),
  };
}

export default connect(mapStateToProps)(EquitiesList);
