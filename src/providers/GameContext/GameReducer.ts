import { UIAction, GameState } from "../../utils/types/UITypes";

export const initialState: GameState = {
  userId: null,
  toast: {
    open: false,
    message: '',
    severity: 'success',
  },
  isLoading: false,
  playerName: ''
};
export function GameReducer(state: GameState, action: UIAction): GameState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userId: action.payload, playerName: action?.payload };
    case 'SHOW_TOAST':
      return { ...state, toast: { open: true, message: action.payload.message, severity: action.payload.severity } };
    case 'HIDE_TOAST':
      return { ...state, toast: { ...state.toast, open: false } };
    case 'LOADING': 
      return {...state, isLoading: action?.payload }
    default:
      return state;
  }
}
