import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency, formatPercent } from "../utils/Utils";
import { Currency } from "../constants/types";

interface IEquitiesListProps {
  equities: IEquityListItem[];
}

export interface IEquityListItem {
  stock: string;
  price: number;
  shareCount: number;
  currency: Currency;
  value: number;
  percentPort: number;
}

const columns = {
  stock: "Symbol",
  price: "Price",
  shareCount: "Units",
  currency: "Currency",
  value: "Mkt Value",
  percentPort: "% Portfolio",
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

const EquitiesList: React.StatelessComponent<IEquitiesListProps> = (
  props: IEquitiesListProps
) => {
  return (
    <div>
      <DetailsList
        items={props.equities.map(e => {
          return {
            stock: e.stock,
            price: formatCurrency(e.price),
            shareCount: e.shareCount,
            currency: e.currency,
            value: formatCurrency(e.value),
            percentPort: formatPercent(e.percentPort),
          };
        })}
        columns={Object.keys(columns).map(getColumn)}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default EquitiesList;
