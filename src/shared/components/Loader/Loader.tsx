import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

export const GradientLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 11, // or whatever height you want
  borderRadius: 4,
  backgroundColor: "#e0e0e0", // the track color
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(113.09deg, #E6D4DC 17.21%, #8CD9DA 128.66%);",
  },
}));
