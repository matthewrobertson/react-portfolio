import { connect } from "react-redux";
import BalancesTable from "../components/BalancesTable";
import { IStoreState } from "../store";
import {
  computeTotalCash,
  computeTotalEquity,
  computeNetWorth,
} from "../services/SummationService";

export function mapStateToProps(state: IStoreState) {
  const exchangeRate = state.exchangeRate.CAD;
  const cashUSD = computeTotalCash(state);
  const cashCAD = cashUSD * exchangeRate;
  const equityUSD = computeTotalEquity(state);
  const equityCAD = equityUSD * exchangeRate;
  const netWorthUSD = computeNetWorth(state);
  const netWorthCAD = netWorthUSD * exchangeRate;
  return {
    cashCAD,
    cashUSD,
    equityCAD,
    equityUSD,
    netWorthCAD,
    netWorthUSD,
  };
}

export default connect(mapStateToProps)(BalancesTable);
