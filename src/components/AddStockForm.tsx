import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { Currency } from "../constants/types";
import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import "./AddStockForm.css";
import { Redirect } from "react-router";

interface IAddStockFormProps {
  ticker?: string;
  numShares?: number;
  currency?: Currency;
  targetPercent?: number;
  onAddStock: (
    ticker: string,
    numShares: number,
    currency: Currency,
    targetPercent: number
  ) => Promise<any>;
  onDeleteStock: (ticker: string) => any;
  isEditing: boolean;
  errorMessage?: string;
}

interface IAddStockFormState {
  ticker: string;
  numShares: string;
  currency: string;
  targetPercent: string;
  redirect: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

export default class AddStockForm extends React.Component<
  IAddStockFormProps,
  IAddStockFormState
> {
  constructor(props: IAddStockFormProps) {
    super(props);
    const { ticker, numShares, currency, targetPercent } = this.props;
    this.state = {
      ticker: ticker || "",
      numShares: numShares ? String(numShares) : "0",
      currency: currency || Currency.CAD,
      targetPercent: targetPercent ? String(targetPercent) : "0",
      redirect: false,
      isLoading: false,
      errorMessage: null,
    };
  }

  public render(): JSX.Element {
    if (this.state.redirect) {
      return <Redirect to="/positions" />;
    }
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
            value={this.state.ticker}
            disabled={this.props.isEditing}
          />
          <TextField
            label={"Shares"}
            onChanged={this.onValueChanged("numShares")}
            value={this.state.numShares.toString()}
          />
          <Dropdown
            label="Currency"
            defaultSelectedKey={this.state.currency}
            options={[
              { key: "CAD", text: "CAD", data: "CAD" },
              { key: "USD", text: "USD", data: "USD" },
            ]}
            onChanged={this.onDropdownChanged}
          />
          <TextField
            label={"Target Percent"}
            onChanged={this.onValueChanged("targetPercent")}
            value={this.state.targetPercent.toString()}
          />
          <div className="AddStockForm-buttonWrapper">
            {this.renderDeleteButton()}
            <DefaultButton
              primary={true}
              text={this.props.isEditing ? "Save" : "Add Stock"}
              onClick={this.onAddStockClick}
              disabled={this.state.isLoading}
            />
          </div>
        </form>
      </div>
    );
  }

  private renderDeleteButton() {
    if (!this.props.isEditing) {
      return null;
    }
    return (
      <DefaultButton
        primary={false}
        text="Delete"
        onClick={this.onDeleteClick}
        disabled={this.state.isLoading}
      />
    );
  }

  private onValueChanged = (field: keyof IAddStockFormState) => (
    value: string
  ) => {
    const state = {};
    state[field] = value;
    this.setState(state);
  };

  private onDropdownChanged = (option: IDropdownOption, index?: number) => {
    this.setState({
      currency: index === 0 ? Currency.CAD : Currency.USD,
    });
  };

  private onAddStockClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props
      .onAddStock(
        this.state.ticker,
        parseInt(this.state.numShares, 10),
        this.state.currency as Currency,
        parseFloat(this.state.targetPercent)
      )
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(() => {
        this.setState({ errorMessage: "Invalid Ticker" });
      });
  };

  private onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ redirect: true });
    this.props.onDeleteStock(this.state.ticker);
  };

  private getError() {
    if (this.state.errorMessage != null) {
      return (
        <MessageBar messageBarType={MessageBarType.error}>
          {this.state.errorMessage}
        </MessageBar>
      );
    }
    return null;
  }
}
