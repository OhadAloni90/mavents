import React from "react";
import { Box, Typography } from "@mui/material";
import { GameHeaderProps } from "../../../../utils/interfaces/GameProps";
import theme from "../../../../themes";
import { useUI } from "../../../../providers/UIContext/UIContext";
const GameHeader: React.FC<GameHeaderProps> = ({ gameState, playerName, score }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: gameState === "ENDED" ? "center" : "space-between",
      alignItems: "center",
      mb: 2,
      borderBottom: 1,
      borderColor: theme.palette.brandGray.main,
      px: 2,
      py: 1,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      [{playerName}]
    </Typography>
    {gameState !== "ENDED" && (
      <Typography variant="h6" sx={{ color: theme.palette.brandPink02.main, fontWeight: 600 }}>
        [Score {score}]
      </Typography>
    )}
  </Box>
);

export default GameHeader;
