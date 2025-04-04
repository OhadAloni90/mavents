import React from 'react';
import { Alert, Box, Portal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1300, // make sure it appears above other content
          bottom:22,
        }}
        mb={3}
      >
        <Alert
          icon={severity === 'success' ? <CheckCircleIcon /> : <CancelIcon />}
          severity={severity}
          onClose={onClose}
        >
          {message}
        </Alert>
      </Box>
    </Portal>
  );
}
