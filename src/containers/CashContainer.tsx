import { connect, Dispatch } from "react-redux";
import CashList from "../components/CashList";
import { IStoreState } from "../store";
import { computeNetWorth } from "../services/SummationService";
import { Currency } from "../constants/types";
import * as actions from "../actions/actions";

const getCashAmount = (state: IStoreState, currency: Currency): number => {
  const curHolding = state.cash[currency];
  return curHolding == null ? 0 : curHolding.count;
};

export function mapStateToProps(state: IStoreState) {
  const exchangeRate = state.exchangeRate.CAD;
  const netWorthUSD = computeNetWorth(state);
  const cad = getCashAmount(state, Currency.CAD);
  const usd = getCashAmount(state, Currency.USD);
  const usdPercent = netWorthUSD === 0 ? 0 : usd / netWorthUSD;
  const cadPercent = netWorthUSD === 0 ? 0 : cad / exchangeRate / netWorthUSD;
  const usdRate = 1.0;
  const cadRate = state.exchangeRate.CAD;
  return {
    cad,
    usd,
    usdPercent,
    cadPercent,
    usdRate,
    cadRate,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ActionType>) {
  return {
    onAddCash: (currency: Currency, amount: number) =>
      dispatch(actions.addCash(currency, amount)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashList);
