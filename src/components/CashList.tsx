import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import { formatCurrency, formatPercent } from "../utils/Utils";
import { Currency } from "../constants/types";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface ICashListProps {
  usd: number;
  cad: number;
  usdPercent: number;
  cadPercent: number;
  usdRate: number;
  cadRate: number;
  onAddCash: (currency: Currency, amount: number) => any;
}

interface ICashListState {
  [key: string]: string;
}

const columns = {
  rowLabel: "Currency",
  exchange: "Exchange Rate",
  total: "Total",
  per_port: "Portfolio %",
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

const getItem = (
  label: Currency,
  exchange: number,
  total: number,
  percent: number
) => {
  return {
    key: label,
    rowLabel: label,
    exchange: formatCurrency(exchange),
    total,
    per_port: formatPercent(percent),
    actions: label,
  };
};
type IRowItem = ReturnType<typeof getItem>;

class CashList extends React.Component<ICashListProps, ICashListState> {
  constructor(props: ICashListProps) {
    super(props);
    this.state = {};
  }

  public onItemInvoked = (item: ReturnType<typeof getItem>): void => {
    const state = {};
    state[item.key] = item.total;
    this.setState(state);
  };

  public renderColumn = (item: IRowItem, index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName || ""];
    const isEditing = this.isEditing(item.key);
    if (column.key === "actions") {
      if (!isEditing) {
        return <Link data-selection-invoke={true}>Edit</Link>;
      } else {
        const onCancelClick = () => this.stopEditing(item.key);
        const onSaveClick = () => this.onSave(item.key);
        return (
          <span>
            <Link onClick={onSaveClick}>Save</Link>
            <Link onClick={onCancelClick}>Cancel</Link>
          </span>
        );
      }
    }
    if (column.key === "total") {
      if (this.isEditing(item.key)) {
        const onChange = (val: string) => {
          this.setStateItem(item.key, val);
        };

        return (
          <TextField
            value={this.state[item.key].toString()}
            onChanged={onChange}
          />
        );
      } else {
        return <span>{formatCurrency(item.total)}</span>;
      }
    }
    return <span>{fieldContent}</span>;
  };

  public render() {
    const props = this.props;
    return (
      <div>
        <DetailsList
          items={[
            getItem(Currency.USD, props.usdRate, props.usd, props.usdPercent),
            getItem(Currency.CAD, props.cadRate, props.cad, props.cadPercent),
          ]}
          columns={Object.keys(columns).map(getColumn)}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={this.renderColumn}
          onItemInvoked={this.onItemInvoked}
        />
      </div>
    );
  }

  private isEditing(currency: Currency): boolean {
    return this.state[currency] != null;
  }

  private stopEditing(currency: Currency): void {
    this.setStateItem(currency, null);
  }

  private onSave(currency: Currency): void {
    this.props.onAddCash(currency, parseFloat(this.state[currency]));
    this.stopEditing(currency);
  }

  private setStateItem(key: Currency, val: string | null): void {
    const state = {};
    state[key] = val;
    this.setState(state);
  }
}

export default CashList;
