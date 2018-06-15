import {
  ActionType,
  ADD_HOLDING,
  IAddHoldingAction,
  IUpdateShareCount,
  IUpdateTargetPercent,
  UPDATE_HOLDING_PERCENT,
  UPDATE_SHARE_COUNT,
} from "../actions/actions";

interface IHolding {
  count: number;
  target: number;
}
export interface IHoldingsState {
  [ticker: string]: IHolding;
}

export default function addStockReducer(
  state: IHoldingsState = {},
  action: ActionType
): IHoldingsState {
  switch (action.type) {
    case ADD_HOLDING:
      return addHolding(state, action);
    case UPDATE_SHARE_COUNT:
      return udpateShareCount(state, action);
    case UPDATE_HOLDING_PERCENT:
      return updateHoldingPercent(state, action);
  }
  return state;
}

function addHolding(
  state: IHoldingsState,
  action: IAddHoldingAction
): IHoldingsState {
  const newState = Object.assign({}, state);
  const { ticker } = action;
  newState[ticker] = {
    count: action.quantity,
    target: 0,
  };
  return newState;
}

function udpateShareCount(
  state: IHoldingsState,
  action: IUpdateShareCount
): IHoldingsState {
  const newState = Object.assign({}, state);
  const { ticker, count } = action;
  newState[ticker].count = count;
  return newState;
}

function updateHoldingPercent(
  state: IHoldingsState,
  action: IUpdateTargetPercent
): IHoldingsState {
  const newState = Object.assign({}, state);
  const { ticker, target } = action;
  newState[ticker].target = target;
  return newState;
}
