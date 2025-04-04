import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HeaderProps } from "../../../utils/types/componentsTypes";
import { headerShadow } from "../../../themes/utils/shadows";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: headerShadow[1],
  position: "fixed", // or "sticky"
  top: 0,
  left: 0,
  right: 0,
  height: 40,
}));

export default function Header({ text }: HeaderProps) {
  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          minHeight: "40px !important",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography variant="subtitle1">{text}</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
