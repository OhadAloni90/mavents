import { Box, styled } from "@mui/material";

export const LoaderBox = styled(Box)(({ theme }) => ({
    width: "33%",
    margin: "20px auto",
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "cneter",
    flexDirection: "column",
    justifyContent: "center",
  }));
  export const IndicatorBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "16.5px",
    backgroundColor: theme?.palette?.baseWhite.main,
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));
  export const StyledGameBox = styled(Box)(({}) => ({
    position: "relative",
    width: "100%",
    flex: 1,
    mt: 2,
    padding: 1,
  }));