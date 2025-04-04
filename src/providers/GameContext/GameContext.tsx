import React, { createContext, useContext, useReducer, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import { initialState, GameReducer } from "./GameReducer";
import { UIAction, GameState, ToastSeverity } from "../../utils/types/UITypes";
import ToastMessage from "../../shared/components/ToastMessage/ToastMessage";

type GameContextProps = {
  state: GameState;
  dispatch: React.Dispatch<UIAction>;
  showToast: (message: string, severity?: ToastSeverity) => void;
  onSetLoading: (loading: boolean) => void;
  setUser: (user: string) => void;
};

const GameContext = createContext<GameContextProps | undefined>(undefined);
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);
  const showToast = (message: string, severity: ToastSeverity = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, severity } });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2000);
  };

  const onSetLoading = (loading: boolean) => {
    dispatch({ type: "LOADING", payload: loading });
  };
  const setUser = (user: string) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  return (
    <GameContext.Provider value={{ state, dispatch, showToast, onSetLoading, setUser }}>
      {/* Wrap content in a relative container */}
      <Box ref={containerRef} sx={{ position: "relative", minHeight: "100vh" }}>
        {children}
        <ToastMessage
          open={state.toast.open}
          message={state.toast.message}
          severity={state.toast.severity}
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
          container={containerRef.current} // pass the ref’s current element
        />
      </Box>
    </GameContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
