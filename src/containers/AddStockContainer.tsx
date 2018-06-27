import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/actions";
import AddStockForm from "../components/AddStockForm";
import fetchStockQuote from "../fetchers/StockFetcher";
import { IStoreState } from "../store";
import { Currency } from "../constants/types";

interface IOwnProps {
  editTicker?: string;
}

export function mapStateToProps(state: IStoreState, ownProps: IOwnProps) {
  if (ownProps.editTicker && state.holdings[ownProps.editTicker]) {
    const holding = state.holdings[ownProps.editTicker];
    const equity = state.stockQuotes[ownProps.editTicker];
    return {
      ticker: ownProps.editTicker,
      isEditing: true,
      currency: equity.currency,
      targetPercent: holding.target,
      numShares: holding.count,
    };
  } else {
    return { isEditing: false };
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
    onDeleteStock: (ticker: string) => {
      dispatch(actions.removeHolding(ticker));
    },
  };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddStockForm);
