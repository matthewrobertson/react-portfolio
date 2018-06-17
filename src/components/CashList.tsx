import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency, formatPercent } from "../utils/Utils";

interface ICashListProps {
  usd: number;
  cad: number;
  usdPercent: number;
  cadPercent: number;
  usdRate: number;
  cadRate: number;
}

const columns = {
  rowLabel: "Currency",
  exchange: "Exchange Rate",
  total: "Total",
  per_port: "Portfolio %",
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

const getItem = (
  label: string,
  exchange: number,
  total: number,
  percent: number
) => {
  return {
    key: label,
    rowLabel: label,
    exchange: formatCurrency(exchange),
    total: formatCurrency(total),
    per_port: formatPercent(percent),
  };
};

const CashList: React.StatelessComponent<ICashListProps> = (
  props: ICashListProps
) => {
  return (
    <div>
      <DetailsList
        items={[
          getItem("USD", props.usdRate, props.usd, props.usdPercent),
          getItem("CAD", props.cadRate, props.cad, props.cadPercent),
        ]}
        columns={Object.keys(columns).map(getColumn)}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default CashList;
