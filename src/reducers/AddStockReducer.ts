import {
  ActionType,
  ADD_HOLDING,
  ADD_STOCK_CHANGE,
  ADD_CASH,
  ADD_STOCK_ERROR,
  FETCH_STOCK_QUOTE_ERROR,
} from "../actions/actions";
import { Currency } from "../constants/types";

export interface IAddStockState {
  ticker: string;
  numShares: number;
  currency: Currency;
  errorMessage: string | null;
  targetPercent: number;
}

const defaultState: IAddStockState = {
  errorMessage: null,
  ticker: "",
  numShares: 0,
  currency: Currency.CAD,
  targetPercent: 0,
};

export default function addStockReducer(
  state: IAddStockState = defaultState,
  action: ActionType
): IAddStockState {
  switch (action.type) {
    case ADD_STOCK_CHANGE:
      const newState = Object.assign({}, state);
      if (action.field === "numShares") {
        newState.numShares = parseInt(action.value, 10);
      } else if (action.field === "targetPercent") {
        newState.targetPercent = parseFloat(action.value);
      } else {
        // @ts-ignore
        newState[action.field] = action.value;
      }

      return newState;
    case ADD_STOCK_ERROR:
    case FETCH_STOCK_QUOTE_ERROR:
      const errorState = { ...state };
      errorState.errorMessage = action.message;
      return errorState;
    case ADD_HOLDING:
    case ADD_CASH:
      return defaultState;
  }
  return state;
}
