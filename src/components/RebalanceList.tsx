import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency, formatPercent } from "../utils/Utils";

interface IRebalanceListProps {
  equities: IRebalanceListItem[];
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

const RebalanceList: React.StatelessComponent<IRebalanceListProps> = (
  props: IRebalanceListProps
) => {
  return (
    <div>
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
