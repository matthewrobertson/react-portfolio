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
  onChangedTargetPercent: (ticker: string, target: number) => any;
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

const getItem = (e: IRebalanceListItem) => {
  return {
    stock: e.stock,
    shareCount: e.shareCount,
    positionValue: formatCurrency(e.positionValue),
    percentPort: formatPercent(e.percentPort),
    targetPercent: e.targetPercent,
    buySell: e.buySell,
  };
};
type IRowItem = ReturnType<typeof getItem>;

class RebalanceList extends React.Component<IRebalanceListProps> {
  public onTargetChanged = (ticker: string) => {
    return (val: string) => {
      const target = parseFloat(val);
      if (target) {
        this.props.onChangedTargetPercent(ticker, target);
      }
    };
  };

  public renderColumn = (item: IRowItem, index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName || ""];

    if (column.key === "targetPercent") {
      return (
        <TextField
          value={fieldContent}
          onChanged={this.onTargetChanged(item.stock)}
        />
      );
    }
    return <span>{fieldContent}</span>;
  };

  public render() {
    return (
      <div>
        <TextField
          value={String(
            this.props.rebalanceCashCAD == null
              ? ""
              : this.props.rebalanceCashCAD
          )}
          label={"CAD to Add:"}
          onChanged={this.props.onChangedRebalanceCashCAD}
        />
        <TextField
          value={String(
            this.props.rebalanceCashUSD == null
              ? ""
              : this.props.rebalanceCashUSD
          )}
          label={"USD to Add:"}
          onChanged={this.props.onChangedRebalanceCashUSD}
        />
        <DetailsList
          items={this.props.equities.map(getItem)}
          columns={Object.keys(columns).map(getColumn)}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={this.renderColumn}
        />
      </div>
    );
  }
}

export default RebalanceList;
