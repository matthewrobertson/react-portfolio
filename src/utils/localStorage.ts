import { IStoreState } from "../store";

export const loadState = (): IStoreState | null => {
  try {
    const stateString = localStorage.getItem("state");
    if (stateString) {
      const state = JSON.parse(stateString);
      return state as IStoreState;
    }
    return null;
  } catch (_) {
    return null;
  }
};

export const persistState = (state: IStoreState): void => {
  try {
    const storableState: any = { ...state };
    storableState.addStock = undefined;
    const stateString = JSON.stringify(storableState);
    localStorage.setItem("state", stateString);
  } catch (_) {
    console.log("load state failed");
  }
};
