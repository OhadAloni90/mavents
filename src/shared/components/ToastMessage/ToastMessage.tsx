import React from 'react';
import { Alert, Box, Portal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StyledToastBox } from './style/StyledToastBox';
type ToastMessageProps = {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  container?: Element | null;
};
export default function ToastMessage({
  open,
  message,
  severity = 'success',
  onClose,
  container,
}: ToastMessageProps) {
  if (!open) return null;
  return (
    <Portal container={container}>
      <StyledToastBox
        mb={3}
      >
        <Alert
          icon={severity === 'success' ? <CheckCircleIcon /> : <CancelIcon />}
          severity={severity}
          sx={{fontSize: '15px'}}
          onClose={onClose}
        >
          {message}
        </Alert>
      </StyledToastBox>
    </Portal>
  );
}
