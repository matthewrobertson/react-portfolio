// import { values } from 'lodash-es';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/actions';
import HoldingsList from '../components/HoldingsList';
import { Currency, IHoldingDetails } from '../constants/types';
import { IStoreState } from '../store';

// BORIS QUESION: ORGANIZING FUNCTIONAL BUSINESS LOGIC
const initializeHolding = (
  ticker: string, 
  sharePrice: number, 
  shareCount: number, 
  netWorth: number,
  currency: Currency,
  exchangeRate: number,
): IHoldingDetails => {
  const totalValue = sharePrice * shareCount;
  const usdValue = currency === Currency.USD ? totalValue : totalValue / exchangeRate;
  const cadValue = currency === Currency.CAD ? totalValue : totalValue * exchangeRate;
  const currentPercentage = netWorth > 0 ? (usdValue / netWorth) : 0.0;
  return {
      cadValue,
      currency,
      currentPercentage,
      shareCount,
      sharePrice,
      targetPercent: 0,
      ticker,
      usdValue,
      
  };
};

const initializeHoldings = (state: IStoreState, newWorth: number): IHoldingDetails[] => {
  const stocks = Object.keys(state.holdings);
  return stocks.map((stock) => initializeHolding(
    stock,
    state.stockQuotes[stock].close,
    state.holdings[stock],
    newWorth,
    state.stockQuotes[stock].currency,
    state.exchangeRate.CAD,
  ));
};

const computeNetWorth = (
  state: IStoreState,
): {usd: number, cad: number} => {
  let usd = 0;
  let cad = 0;
  const exchangeRate = state.exchangeRate.CAD;
  const stocks = Object.keys(state.holdings);
  for (const stock of stocks) {
    const quote = state.stockQuotes[stock];
    const val = state.holdings[stock] * quote.close;
    if (quote.currency === Currency.USD) {
      usd += val;
      cad += (val * exchangeRate);
    } else {
      usd += val;
      cad += (val / exchangeRate);
    }
  }
  return {usd, cad};
}

export function mapStateToProps(state: IStoreState) {
  const netWorth = computeNetWorth(state);
  return {
    holdings: initializeHoldings(state, netWorth.usd),
    netWorthCAD: netWorth.cad,
    netWorthUSD: netWorth.usd,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onShareCountChange: (ticker: string, count: number) => dispatch(actions.updateShareCount(ticker, count)),
    onUpdateCurrency: (ticker: string, currency: Currency) => dispatch(actions.updateStockCurrency(ticker, currency))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsList);