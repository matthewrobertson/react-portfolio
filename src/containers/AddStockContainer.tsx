import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/actions";
import AddStockForm from "../components/AddStockForm";
import fetchStockQuote from "../fetchers/StockFetcher";
import { IStoreState } from "../store";
import { IAddStockState } from "../reducers/AddStockReducer";
import { Currency } from "../constants/types";

interface IOwnProps {
  editTicker?: string;
}

export function mapStateToProps(state: IStoreState, ownProps: IOwnProps) {
  if (ownProps.editTicker) {
    console.log(ownProps.editTicker);
    return { ...state.addStock, ticker: ownProps.editTicker, isEditing: true };
  } else {
    return { ...state.addStock, isEditing: false };
  }
}
type StateProps = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onAddStock: (
      ticker: string,
      quantity: number,
      currency: Currency,
      targetPercent: number
    ) => fetchStockQuote(dispatch, ticker, quantity, currency, targetPercent),
    onFieldChange: (field: keyof IAddStockState, value: string) =>
      dispatch(actions.addStockChange(field, value)),
  };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddStockForm);
