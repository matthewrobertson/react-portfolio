import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';
import AddStockForm from '../components/AddStockForm';
import { IStoreState } from '../store';

export function mapStateToProps(state: IStoreState) {
  return {
    ticker: state.addStock.ticker,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onAddStock: () => dispatch(actions.addStock()),
    onUpdateTicker: (ticker: string) => dispatch(actions.addStockChange(ticker)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockForm);