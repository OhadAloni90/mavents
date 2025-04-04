export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface UIState {
  userId: string | null;
  toast: {
    open: boolean;
    message: string;
    severity: ToastSeverity;
  };
  loading: {
    open: boolean;
    message: string;
  };
  playerName: string | null;
}

export type UIAction =
  | { type: 'SET_USER'; payload: string }
  | { type: 'CLEAR_USER' }
  | { type: 'SHOW_TOAST'; payload: { message: string; severity: ToastSeverity } }
  | { type: 'HIDE_TOAST' }
  | { type: 'SHOW_LOADING'; payload: string }
  | { type: 'HIDE_LOADING' };
