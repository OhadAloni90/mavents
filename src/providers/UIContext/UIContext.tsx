import React, { createContext, useContext, useReducer, ReactNode, useRef } from 'react';
import { Box } from '@mui/material';
import { initialState, uiReducer } from './UIReducer';
import { UIAction, UIState, ToastSeverity } from '../../utils/types/UITypes';
import ToastMessage from '../../shared/components/ToastMessage/ToastMessage';

type UIContextProps = {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
  showToast: (message: string, severity?: ToastSeverity) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  onSetLoading: (loading: boolean) => void;
  setUser: (user: string) => void;
};

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, severity: ToastSeverity = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, severity } });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 2000);
  };

  const showLoading = (message: string = 'Loading...') => {
    dispatch({ type: 'SET_LOADING', payload: message });
  };

  const hideLoading = () => {
    dispatch({ type: 'HIDE_LOADING' });
  };

  const onSetLoading = (loading: boolean) => {
    dispatch({ type: 'LOADING', payload: loading });
  };

  const setUser = (user: string) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  return (
    <UIContext.Provider
      value={{ state, dispatch, showToast, showLoading, hideLoading, onSetLoading, setUser }}
    >
      {/* Wrap content in a relative container */}
      <Box ref={containerRef} sx={{ position: 'relative', minHeight: '100vh' }}>
        {children}
        {/* Pass the container ref to the ToastMessage */}
        <ToastMessage
          open={state.toast.open}
          message={state.toast.message}
          severity={state.toast.severity}
          onClose={() => dispatch({ type: 'HIDE_TOAST' })}
        />
      </Box>
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
