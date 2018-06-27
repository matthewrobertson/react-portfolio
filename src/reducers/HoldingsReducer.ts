import {
  ActionType,
  ADD_HOLDING,
  IAddHoldingAction,
  IUpdateShareCount,
  IUpdateTargetPercent,
  UPDATE_HOLDING_PERCENT,
  UPDATE_SHARE_COUNT,
  REMOVE_HOLDING,
  IRemoveHolding,
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
    case REMOVE_HOLDING:
      return removeHolding(state, action);
  }
  return state;
}

function removeHolding(
  state: IHoldingsState,
  action: IRemoveHolding
): IHoldingsState {
  const newState = Object.assign({}, state);
  delete newState[action.ticker];
  return newState;
}
function addHolding(
  state: IHoldingsState,
  action: IAddHoldingAction
): IHoldingsState {
  const newState = Object.assign({}, state);
  const { ticker } = action;
  newState[ticker] = {
    count: action.quantity,
    target: action.targetPercent,
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
