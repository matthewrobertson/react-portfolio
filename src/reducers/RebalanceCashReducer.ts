import { ActionType, UPDATE_REBALANCE_CASH } from "../actions/actions";

export interface IRebalanceCashState {
  USD: number | null;
  CAD: number | null;
}

const defaultState: IRebalanceCashState = {
  USD: 0,
  CAD: 0,
};

export default function rebalanceCashReducer(
  state: IRebalanceCashState = defaultState,
  action: ActionType
): IRebalanceCashState {
  switch (action.type) {
    case UPDATE_REBALANCE_CASH:
      console.log("in the place");
      const newState = { ...state };
      newState[action.currency] = action.amount;
      return newState;
  }
  return state;
}
