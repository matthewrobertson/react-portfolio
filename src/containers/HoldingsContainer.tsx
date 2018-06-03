import { values } from 'lodash-es';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';
import HoldingsList from '../components/HoldingsList';
import { IStoreState } from '../store';


export function mapStateToProps(state: IStoreState) {
  return {
    holdings: values(state.holdings),
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onShareCountChange: (ticker: string, count: number) => dispatch(actions.updateShareCount(ticker, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsList);