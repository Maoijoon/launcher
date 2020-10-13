import { CurateActionType } from './enums';
import { CurateAction, CurateState } from './types';

export function curateStateReducer(state: CurateState = createInitialState(), action: CurateAction): CurateState {
  switch (action.type) {
    default:
      return state;

    case CurateActionType.CREATE_CURATION:
      return {
        ...state,
        curations: [
          ...state.curations,
          {
            folder: action.folder,
            game: {},
            addApps: [],
          },
        ],
      };

    case CurateActionType.SET_CURRENT_CURATION:
      return {
        ...state,
        current: action.index,
      };

    case CurateActionType.NEW_ADDAPP:
      return {
        ...state,
      };

    case CurateActionType.EDIT_CURATION_META: {
      const index = state.curations.findIndex(curation => curation.folder === action.folder);

      if (index === -1) { return { ...state }; }

      const oldCuration = state.curations[index];

      const newCurations = [ ...state.curations ];
      newCurations[index] = {
        ...oldCuration,
        game: {
          ...oldCuration.game,
          [action.property]: action.value,
        },
      };

      return {
        ...state,
        curations: newCurations,
      };
    }

    case CurateActionType.SET_ALL_CURATIONS:
      return {
        ...state,
        curations: [ ...action.curations ],
      };

    case CurateActionType.APPLY_DELTA: {
      const newCurations = [ ...state.curations ];

      if (action.removed) {
        for (let i = newCurations.length - 1; i >= 0; i--) {
          if (action.removed.indexOf(newCurations[i].folder) !== -1) {
            newCurations.splice(i, 1);
          }
        }
      }

      if (action.added) { newCurations.push(...action.added); }

      return {
        ...state,
        curations: newCurations,
      };
    }
  }
}

function createInitialState(): CurateState {
  return {
    curations: [],
    current: -1,
  };
}
