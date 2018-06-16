import { connect } from "react-redux";
import CashList from "../components/CashList";
import { IStoreState } from "../store";
import { computeNetWorth } from "../services/SummationService";
import { Currency } from "../constants/types";

const getCashAmount = (state: IStoreState, currency: Currency): number => {
  const curHolding = state.cash[currency];
  return curHolding == null ? 0 : curHolding.count;
};

export function mapStateToProps(state: IStoreState) {
  const exchangeRate = state.exchangeRate.CAD;
  const netWorthUSD = computeNetWorth(state);
  const cad = getCashAmount(state, Currency.CAD);
  const usd = getCashAmount(state, Currency.USD);
  const usdPercent = usd / netWorthUSD;
  const cadPercent = cad / exchangeRate / netWorthUSD;
  return {
    cad,
    usd,
    usdPercent,
    cadPercent,
  };
}

export default connect(mapStateToProps)(CashList);
