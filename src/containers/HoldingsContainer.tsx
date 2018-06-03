// import { values } from 'lodash-es';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';
import HoldingsList from '../components/HoldingsList';
import { IHoldingDetails } from '../constants/types';
import { IStoreState } from '../store';

const initializeHolding = (
  ticker: string, 
  sharePrice: number, 
  shareCount: number, 
  netWorth: number,
): IHoldingDetails => {
  const totalValue = sharePrice * shareCount;
  const currentPercentage = netWorth > 0 ? (totalValue / netWorth) * 100 : 0.0;
  return {
      currentPercentage,
      shareCount,
      sharePrice,
      targetPercent: 0,
      ticker,
      totalValue,
  };
};

const initializeHoldings = (state: IStoreState, newWorth: number): IHoldingDetails[] => {
  const holdings = [];
  const stocks = Object.keys(state.holdings);
  for (const stock of stocks) {
    holdings.push(initializeHolding(
      stock,
      state.stockQuotes[stock].close,
      state.holdings[stock],
      newWorth,
    ));
  }
  return holdings;
};

const computeNetWorth = (
  state: IStoreState,
): number => {
  let worth = 0;
  const stocks = Object.keys(state.holdings);
  for (const stock of stocks) {
    worth += state.holdings[stock] * state.stockQuotes[stock].close;
  }
  return worth;
}

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeNetWorth(state);
  return {
    holdings: initializeHoldings(state, netWorth),
    netWorth,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onShareCountChange: (ticker: string, count: number) => dispatch(actions.updateShareCount(ticker, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsList);