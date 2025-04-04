// theme/components.ts
import { Theme } from '@mui/material/styles';
import { CSSObject, minWidth, width } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { customAlertShadows } from './utils/shadows';

export default function componentsOverride(theme: Theme) {
  const { palette, shape } = theme;

  // --- Button Overrides ---
  const buttonRootStyles: CSSObject = {
    textTransform: 'none',
    borderRadius: shape.borderRadius, // e.g. 12
  };

  const containedPrimaryStyles: CSSObject = {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    '&:hover': {
      backgroundColor: palette.brandGray3.main,
    },
    borderRadius: shape.borderRadius,
    width: '144px',
    height: '36px',
    padding: '4px 12px'
  };

  const containedSecondaryStyles: CSSObject = {
    backgroundColor: palette.brandGray.main,
    color: palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: palette.secondary.dark,
    },
    borderRadius: shape.borderRadius,
  };


  // --- Outlined Input Overrides ---
  const outlinedInputRootStyles: CSSObject = {
    width: '280px',
    maxHeight: 36,
    fontSize: theme.typography.body2?.fontSize,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.brandGray.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.primary.main,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.error.main,
    },
  };

  // --- Filled Input Overrides (if needed) ---
  const filledInputRootStyles: CSSObject = {
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#eee',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
    },
    '&.Mui-error': {
      backgroundColor: '#ffe5e5',
    },
  };
  // --- Form Label Overrides ---
  const formLabelStyles: CSSObject = {
    width: 'auto',
    color: '#999',
    '&.Mui-focused': {
      color: palette.primary.main,
    },
    '&.Mui-error': {
      color: palette.error.main,
    },
  };
  // --- Alert (for Toasts) Overrides ---
  const alertRootStyles: CSSObject = {
    //  alert is between 500px and 800px wide
    minWidth: 500,
    maxWidth: 200,
    borderRadius: shape.borderRadius,
          boxShadow: customAlertShadows[1],
    color: palette.primary.main,
    border: 10,
    borderColor: palette.primary.main
  };

  return {
    // Buttons
    MuiButton: {
      styleOverrides: {
        root: buttonRootStyles,
        containedPrimary: containedPrimaryStyles,
        containedSecondary: containedSecondaryStyles,
      },
    },
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        minWidth: 280,
        root: outlinedInputRootStyles,
        input: {
          fontStyle: 'italic', // default italic when not focused
          '&:focus': {
            fontStyle: 'normal',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        minWidth: 280,
        root: filledInputRootStyles,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        minWidth: 280,
        root: formLabelStyles,
      },
    },
    // Toasts (Alerts & Snackbars)
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          success:<CancelIcon />,
          error: <CancelIcon />,
          //Possible for future uses...//
          // info: <InfoOutlinedIcon />,
          // warning: <WarningAmberOutlinedIcon />,
        },
      },
      styleOverrides: {
        root: alertRootStyles,
        //  success alerts in standard variant
        standardSuccess: {
          backgroundColor: theme.palette.common.white,
          color: palette.brandGreen.main, // text color
          '& .MuiAlert-icon': {
            color: palette.brandGray2.main, // success icon color
          },
          // Override the close "X" (action area) so it’s NOT green
          '& .MuiAlert-action .MuiIconButton-root': {
            color: palette.brandGray2.main, 
          },
        },
        // 3) For error alerts in standard variant
        standardError: {
          backgroundColor: theme.palette.common.white,
          color: palette.brandRed.main,
          '& .MuiAlert-icon': {
            color: palette.brandRed.main, // error icon color
          },
          // Make the close "X" neutral
          '& .MuiAlert-action .MuiIconButton-root': {
            color: theme.palette.grey[500],
          },
        },
      },
    },

  };
}
