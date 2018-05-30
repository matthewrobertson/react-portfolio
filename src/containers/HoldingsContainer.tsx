import { connect } from 'react-redux';
// import * as actions from '../actions';
import HoldingsList from '../components/HoldingsList';
import { IStoreState } from '../store';

export function mapStateToProps(state: IStoreState) {
  return {holdings: state.holdings};
}

// export function mapDispatchToProps(dispatch: Dispatch<actions.AddStockAction>) {
//   return {
//   };
// }

export default connect(mapStateToProps)(HoldingsList);