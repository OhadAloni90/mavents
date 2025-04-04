// ToastMessage.tsx
import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type ToastMessageProps = {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
};


export default function ToastMessage({
  open,
  message,
  severity = 'success',
  onClose,
}: ToastMessageProps) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert icon={severity === 'success' ? <CheckCircleIcon/> : <CancelIcon/> }  severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
