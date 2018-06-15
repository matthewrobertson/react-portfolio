import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/actions';
import AddStockForm from '../components/AddStockForm';
import fetchStockQuote from '../fetchers/StockFetcher';
import { IStoreState } from '../store';
import { IAddStockState } from '../reducers/AddStockReducer';
import { Currency } from '../constants/types';

export function mapStateToProps(state: IStoreState) {
  return {...state.addStock};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onAddStock: (ticker: string, quantity: number) => fetchStockQuote(dispatch, ticker),
    onAddCash: (currency: Currency, amount: number) => dispatch(actions.addCash(currency, amount)),
    onFieldChange: (field: keyof IAddStockState, value: string | number) => dispatch(actions.addStockChange(field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockForm);