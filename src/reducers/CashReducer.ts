import { ActionType, ADD_CASH } from "../actions/actions";

interface ICashHolding {
  count: number;
  target: number;
}
export interface ICashHoldingsState {
  [currency: string]: ICashHolding;
}

export default function cashHoldingReducer(
  state: ICashHoldingsState = {},
  action: ActionType
): ICashHoldingsState {
  switch (action.type) {
    case ADD_CASH:
      const newState = { ...state };
      if (newState[action.currency] == null) {
        newState[action.currency] = { count: 0, target: 0 };
      }
      newState[action.currency].count = action.amount;
      return newState;
  }
  return state;
}
