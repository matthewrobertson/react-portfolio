import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency } from "../utils/Utils";

interface IBalancesTableProps {
  cashCAD: number;
  cashUSD: number;
  equityCAD: number;
  equityUSD: number;
  netWorthCAD: number;
  netWorthUSD: number;
}

const columns = {
  rowLabel: "",
  usd: "Total (USD)",
  cad: "Total (CAD)",
};
const getColumn = (x: string): IColumn => {
  return {
    key: x,
    name: columns[x],
    fieldName: x,
    minWidth: 100,
    maxWidth: 100,
  };
};

const getItem = (label: string, usd: number, cad: number) => {
  return {
    key: label,
    rowLabel: label,
    cad: formatCurrency(usd),
    usd: formatCurrency(cad),
  };
};

const BalancesTable: React.StatelessComponent<IBalancesTableProps> = (
  props: IBalancesTableProps
) => {
  return (
    <div>
      <DetailsList
        items={[
          getItem("Cash", props.cashUSD, props.cashCAD),
          getItem("Equity", props.equityUSD, props.equityCAD),
          getItem("Net", props.netWorthUSD, props.netWorthCAD),
        ]}
        columns={Object.keys(columns).map(getColumn)}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default BalancesTable;
