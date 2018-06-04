import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/actions';
import AddStockForm from '../components/AddStockForm';
import fetchStockQuote from '../fetchers/StockFetcher';
import { IStoreState } from '../store';

export function mapStateToProps(state: IStoreState) {
  return {
    ticker: state.addStock.ticker,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onAddStock: (ticker: string) => fetchStockQuote(dispatch, ticker),
    onUpdateTicker: (ticker: string) => dispatch(actions.addStockChange(ticker)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockForm);