// UIContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { initialState, uiReducer } from './UIReducer';
import { UIAction, UIState, ToastSeverity } from '../../utils/types/UITypes';
import ToastMessage from '../../shared/components/ToastMessage/ToastMessage';
type UIContextProps = {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
  showToast: (message: string, severity?: ToastSeverity) => void;
  showLoading: (message?: string) => void;
  setUser: (user: string) => void;
  hideLoading: () => void;
};

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const showToast = (message: string, severity: ToastSeverity = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, severity } });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 2000); // auto-dismiss toast after 2s
  };

  const showLoading = (message: string = 'Loading...') => {
    dispatch({ type: 'SHOW_LOADING', payload: message });
  };

  const hideLoading = () => {
    dispatch({ type: 'HIDE_LOADING' });
  };
  const setUser = (user: string) => {
    dispatch({ type: 'SET_USER', payload: user})
  }
  return (
    <UIContext.Provider value={{ state, dispatch, showToast, showLoading, hideLoading, setUser }}>
      {children}
      {/* Global Toast using ToastMessage Component */}
      <ToastMessage
        open={state.toast.open}
        message={state.toast.message}
        severity={state.toast.severity}
        onClose={() => dispatch({ type: 'HIDE_TOAST' })}
      />
      {/* Global Loading Overlay */}
      <Backdrop
        open={state.loading.open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff', flexDirection: 'row' }}
      >
        <CircularProgress color="inherit" />
        {state.loading.message && (
          <Typography variant="h6" sx={{ ml: 2 }}>
            {state.loading.message}
          </Typography>
        )}
      </Backdrop>
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
