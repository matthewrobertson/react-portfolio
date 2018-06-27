import { connect } from "react-redux";
import RebalanceList, { IRebalanceListItem } from "../components/RebalanceList";
import { Currency } from "../constants/types";
import { IStoreState } from "../store";
import {
  computeTotalEquity,
  computeRebalanceCash,
} from "../services/SummationService";
import { Dispatch } from "react-redux";
import * as actions from "../actions/actions";

const initializeHolding = (
  stock: string,
  price: number,
  shareCount: number,
  netWorth: number,
  currency: Currency,
  exchangeRate: number,
  targetPercent: number
): IRebalanceListItem => {
  const totalValue = price * shareCount;
  const positionValue =
    currency === Currency.USD ? totalValue : totalValue / exchangeRate;
  const percentPort = netWorth > 0 ? positionValue / netWorth : 0.0;
  const buySell = Math.floor(
    (netWorth * targetPercent) / price / 100 - shareCount
  );

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
      state.holdings[stock].target
    )
  );
};

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onChangedRebalanceCashCAD: (amount: string) =>
      dispatch(actions.updateRebalanceCash(Currency.CAD, amount)),
    onChangedRebalanceCashUSD: (amount: string) =>
      dispatch(actions.updateRebalanceCash(Currency.USD, amount)),
    onChangedTargetPercent: (ticker: string, target: number) => {
      dispatch(actions.updateTargetPercent(ticker, target));
    },
  };
}

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeTotalEquity(state) + computeRebalanceCash(state);
  return {
    equities: initializeHoldings(state, netWorth),
    rebalanceCashUSD: state.rebalanceCash.USD,
    rebalanceCashCAD: state.rebalanceCash.CAD,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RebalanceList);
