import { 
    ActionType, 
    IAddHoldingAction, 
} from '../actions';
import { ADD_HOLDING } from '../constants/actions'

export default function addStockReducer(
    state: string[] = [],
    action: ActionType,
): string[] {
    switch (action.type) {
        case ADD_HOLDING:
            const newState = state.slice(0);
            newState.push((action as IAddHoldingAction).ticker);
            return newState;
    }
    return state;
};