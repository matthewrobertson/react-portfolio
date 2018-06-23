import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IAddStockState } from "../reducers/AddStockReducer";
import { Currency } from "../constants/types";
import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import "./AddStockForm.css";

interface IAddStockFormProps extends IAddStockState {
  onAddStock: (
    ticker: string,
    numShares: number,
    currency: Currency,
    targetPercent: number
  ) => any;
  onFieldChange: (field: keyof IAddStockState, ticker: string) => any;
  isEditing: boolean;
}

export default class AddStockForm extends React.Component<IAddStockFormProps> {
  public render(): JSX.Element {
    return (
      <div className="AddStockForm-wrapper">
        <div className="ms-fontSize-xl AddStockForm-header">
          {this.props.isEditing ? "Edit Holding" : "Add Equity"}
        </div>
        {this.getError()}
        <form>
          <TextField
            label="Symbol"
            onChanged={this.onValueChanged("ticker")}
            value={this.props.ticker}
            disabled={this.props.isEditing}
          />
          <TextField
            label={"Shares"}
            onChanged={this.onValueChanged("numShares")}
            value={this.props.numShares.toString()}
          />
          <Dropdown
            label="Currency"
            defaultSelectedKey={this.props.currency}
            options={[
              { key: "CAD", text: "CAD", data: "CAD" },
              { key: "USD", text: "USD", data: "USD" },
            ]}
            onChanged={this.onDropdownChanged}
          />
          <TextField
            label={"Target Percent"}
            onChanged={this.onValueChanged("targetPercent")}
            value={this.props.targetPercent.toString()}
          />
          <div className="AddStockForm-buttonWrapper">
            <DefaultButton
              primary={true}
              text="Add Stock"
              onClick={this.onAddStockClick}
            />
          </div>
        </form>
      </div>
    );
  }

  private onValueChanged = (field: keyof IAddStockState) => (value: string) =>
    this.props.onFieldChange(field, value);

  private onDropdownChanged = (option: IDropdownOption, index?: number) => {
    this.props.onFieldChange(
      "currency",
      index === 0 ? Currency.CAD : Currency.USD
    );
  };

  private onAddStockClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onAddStock(
      this.props.ticker,
      this.props.numShares,
      this.props.currency,
      this.props.targetPercent
    );
  };

  private getError() {
    if (this.props.errorMessage != null) {
      return (
        <MessageBar messageBarType={MessageBarType.error}>
          {this.props.errorMessage}
        </MessageBar>
      );
    }
    return null;
  }
}
