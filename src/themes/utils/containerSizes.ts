import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
export const defaultContainerStyles = {
  minWidth: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const defaultGameContainerrStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
    position: 'relative'
}));
export const StyledGameContainer = styled(Box)(({ theme }) => ({
  
  height: "100%",
  width: "100%",                  // 90% of the parent width
  flex: 1,
  margin: "2rem auto",          // center horizontally + top/bottom margin
  borderRadius: "10px",
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.brandWhite.main,
  border: `1px solid ${theme.palette.brandGray.main}`,
}));
export const PageBackground = styled(Box)(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.brandWhite.main,
}));
