import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency, formatPercent } from "../utils/Utils";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface IRebalanceListProps {
  rebalanceCashUSD: number;
  rebalanceCashCAD: number;
  equities: IRebalanceListItem[];
  onChangedRebalanceCashUSD: (amount: string) => any;
  onChangedRebalanceCashCAD: (amount: string) => any;
}

export interface IRebalanceListItem {
  stock: string;
  shareCount: number;
  positionValue: number;
  percentPort: number;
  targetPercent: number;
  buySell: number;
}

const columns = {
  stock: "Stock",
  shareCount: "Units",
  positionValue: "Mkt Value",
  percentPort: "Current %",
  targetPercent: "Target %",
  buySell: "Buy / Sell",
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

/*
const validateNumberInput = (value: string): string => {
  if (value.trim().length === 0 || isNaN(+value)) {
    return "0";
  }
  return value;
};
*/

const RebalanceList: React.StatelessComponent<IRebalanceListProps> = (
  props: IRebalanceListProps
) => {
  return (
    <div>
      <TextField
        value={String(props.rebalanceCashCAD.toString())}
        label={"CAD to Add:"}
        onChanged={props.onChangedRebalanceCashCAD}
      />
      <TextField
        value={String(props.rebalanceCashUSD)}
        label={"USD to Add:"}
        onChanged={props.onChangedRebalanceCashUSD}
      />
      <DetailsList
        items={props.equities.map(e => {
          return {
            stock: e.stock,
            shareCount: e.shareCount,
            positionValue: formatCurrency(e.positionValue),
            percentPort: formatPercent(e.percentPort),
            targetPercent: formatPercent(e.targetPercent / 100),
            buySell: e.buySell,
          };
        })}
        columns={Object.keys(columns).map(getColumn)}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default RebalanceList;
