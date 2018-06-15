import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IAddStockState } from "../reducers/AddStockReducer";
import { Currency } from "../constants/types";

interface IAddStockFormProps extends IAddStockState {
  onAddStock: (ticker: string, numShares: number) => any;
  onAddCash: (currency: Currency, amount: number) => any;
  onFieldChange: (field: keyof IAddStockState, ticker: string) => any;
}

export default class AddStockForm extends React.Component<IAddStockFormProps> {
  public render(): JSX.Element {
    return (
      <Pivot>
        <PivotItem headerText="Add Stock">
          <div>
            <form>
              <TextField
                label="Symbol"
                onChanged={this.onValueChanged("ticker")}
                value={this.props.ticker}
              />
              <TextField
                label={"Shares"}
                onChanged={this.onValueChanged("numShares")}
                value={this.props.numShares.toString()}
              />
              <DefaultButton
                primary={true}
                text="Add Stock"
                onClick={this.onAddStockClick}
              />
            </form>
          </div>
        </PivotItem>
        <PivotItem headerText="Add Cash">
          <form>
            <TextField
              label={"Amount"}
              onChanged={this.onValueChanged("currencyAmount")}
              value={this.props.currencyAmount.toString()}
            />
            <Dropdown
              label="Currency"
              defaultSelectedKey="CAD"
              options={[
                { key: "CAD", text: "CAD", data: "CAD" },
                { key: "USD", text: "USD", data: "USD" },
              ]}
              onChanged={this.onDropdownChanged}
            />
            <DefaultButton
              primary={true}
              text="Add Cash"
              onClick={this.onAddCashClick}
            />
          </form>
        </PivotItem>
      </Pivot>
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
    this.props.onAddStock(this.props.ticker, this.props.numShares);
  };

  private onAddCashClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onAddCash(this.props.currency, this.props.currencyAmount);
  };
}
