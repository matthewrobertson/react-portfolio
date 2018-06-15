import {
  ActionType,
  ADD_HOLDING,
  ADD_STOCK_CHANGE,
  ADD_CASH,
} from "../actions/actions";
import { Currency } from "../constants/types";

export interface IAddStockState {
  ticker: string;
  numShares: number;
  currencyAmount: number;
  currency: Currency;
  isValid: boolean;
}

const defaultState: IAddStockState = {
  isValid: true,
  ticker: "",
  numShares: 0,
  currencyAmount: 0,
  currency: Currency.CAD,
};

export default function addStockReducer(
  state: IAddStockState = defaultState,
  action: ActionType
): IAddStockState {
  switch (action.type) {
    case ADD_STOCK_CHANGE:
      const newState = Object.assign({}, state);
      newState[action.field] = action.value;
      return newState;
    case ADD_HOLDING:
    case ADD_CASH:
      return defaultState;
  }
  return state;
}
