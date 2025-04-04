// GameContainer.tsx
import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { dialogsShadow } from "../../../themes/utils/shadows";

type GameContainerProps = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  fill?: boolean; // if true, fill parent with an offset
} & BoxProps;

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.brandWhite?.main ?? "#FFFFFF",
  borderRadius: theme.shape.borderRadius,
  boxShadow: dialogsShadow[1],
  padding: "25px 20px 20px 20px",
  margin: "0 auto",
}));

export default function GameContainer({ children, width, height, fill = false, sx, ...rest }: GameContainerProps) {
  return (
    <StyledContainer
      sx={{
        // If "fill" is true, use calc(100% - 30px). Otherwise, use the width/height props.
        minWidth: width || 400,
        minHeight: height || 120,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
}
