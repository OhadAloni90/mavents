import { UIAction, UIState } from "../../utils/types/UITypes";

export const initialState: UIState = {
  userId: null,
  toast: {
    open: false,
    message: '',
    severity: 'success',
  },
  loading: {
    open: false,
    message: '',
  },
  playerName: ''
};

export function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userId: action.payload, playerName: action?.payload };
    case 'CLEAR_USER':
      return { ...state, userId: null };
    case 'SHOW_TOAST':
      return { ...state, toast: { open: true, message: action.payload.message, severity: action.payload.severity } };
    case 'HIDE_TOAST':
      return { ...state, toast: { ...state.toast, open: false } };
    case 'SHOW_LOADING':
      return { ...state, loading: { open: true, message: action.payload } };
    case 'HIDE_LOADING':
      return { ...state, loading: { open: false, message: '' } };
    default:
      return state;
  }
}
