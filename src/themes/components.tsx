// theme/components.ts
import { Theme } from "@mui/material/styles";
import { borderColor, CSSObject } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";

export default function componentsOverride(theme: Theme) {
  const { palette, shape } = theme;
  // !--- Button Overrides ---!
  const buttonRootStyles: CSSObject = {
    textTransform: "none",
    borderRadius: shape.borderRadius,
  };
  const containedPrimaryStyles: CSSObject = {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    "&:hover": {
      backgroundColor: palette.baseGray3.main,
    },
    borderRadius: shape.borderRadius,
    width: "144px",
    height: "36px",
    padding: "4px 12px",
  };
  const containedSecondaryStyles: CSSObject = {
    backgroundColor: palette.baseGray.main,
    color: palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: palette.secondary.dark,
    },
    borderRadius: shape.borderRadius,
  };
  // !--- Outlined Input Overrides ---!
  const outlinedInputRootStyles: CSSObject = {
    width: "280px",
    maxHeight: 36,
    fontSize: theme.typography.body2?.fontSize,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.baseGray.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: palette?.infoRed?.main,
    },
  };
  // !--- Filled Input Overrides  ---!
  const filledInputRootStyles: CSSObject = {
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#eee",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
    "&.Mui-error": {
      backgroundColor: "#ffe5e5",
    },
  };
  // !--- Form Label Overrides ---!
  const formLabelStyles: CSSObject = {
    width: "auto",
    color: "#999",
    "&.Mui-focused": {
      color: palette.primary.main,
    },
    "&.Mui-error": {
      color: palette.infoRed.main,
    },
  };
  // ---!!! Alert (for Toasts) Overrides !!!----
  const alertRootStyles: CSSObject = {
    //  alert is between 500px and 800px wide
    minWidth: 500,
    maxWidth: 200,
    fontWeight: 'medium',
    borderRadius: shape.borderRadius,
    boxShadow: theme?.customShadows?.alert[0],
    color: palette.primary.main,
    border: `1px solid ${theme.palette.baseGray2.main}`,
    padding: '2px 12px'
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
          fontStyle: "normal", // default italic when not focused
          "&:focus": {
            fontStyle: "normal",
          },
          "&:hover": {
            fontStyle: "italic",
          },
          "&:placeholder-shown": {
            fontStyle: "italic",
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Affects all icons inside all IconButtons!
          "& .MuiSvgIcon-root": {
            color: theme?.palette?.baseGray2?.main,
          },
        },
      },
    },
    // Toasts (Alerts & Snackbars)
    MuiAlert: {
      styleOverrides: {
        root: alertRootStyles,
        //  success alerts in standard variant
        standardSuccess: {
          backgroundColor: theme.palette.common.white,
          color: palette.infoGreen.main, // text color
          "& .MuiAlert-icon": {
            color: palette.infoGreen.main, // success icon color
          },
          // Overrides the close "X" (action area) so it’s NOT green
          "& .MuiAlert-action .MuiIconButton-root": {
            color: '#7F817D',
          },
        },
        //  For error alerts in standard variant
        standardError: {
          backgroundColor: theme.palette.common.white,
          color: palette.infoRed.main,
          "& .MuiAlert-icon": {
            color: palette.infoRed.main, // error icon color
          },
          // Make the close "X" neutral
          "& .MuiAlert-action .MuiIconButton-root": {
            color: theme.palette.baseGray.main,
          },
        },
      },
    },

  };
}
