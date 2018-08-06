import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { formatCurrency, formatPercent } from "../utils/Utils";
import { Currency } from "../constants/types";
import { Link } from "react-router-dom";

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
  actions: "",
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

const getRow = (e: IEquityListItem) => {
  return {
    stock: e.stock,
    price: formatCurrency(e.price),
    shareCount: e.shareCount,
    currency: e.currency,
    value: formatCurrency(e.value),
    percentPort: formatPercent(e.percentPort),
    actions: "",
  };
};
type IRowItem = ReturnType<typeof getRow>;

const renderColumn = (item: IRowItem, index: number, column: IColumn) => {
  const fieldContent = item[column.fieldName || ""];
  if (column.key === "actions") {
    const url = `/edit_holding/${item.stock}`;
    return <Link to={url}>Edit</Link>;
  }
  return <span>{fieldContent}</span>;
};

const EquitiesList: React.StatelessComponent<IEquitiesListProps> = (
  props: IEquitiesListProps
) => {
  return (
    <div>
      <DetailsList
        items={props.equities.map(getRow)}
        columns={Object.keys(columns).map(getColumn)}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={renderColumn}
      />
    </div>
  );
};

export default EquitiesList;
