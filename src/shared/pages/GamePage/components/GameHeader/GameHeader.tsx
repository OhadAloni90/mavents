import React from "react";
import { Box, Typography } from "@mui/material";
import { GameHeaderProps } from "../../../../../utils/interfaces/GameProps";
import theme from "../../../../../themes";
const GameHeader: React.FC<GameHeaderProps> = ({ gameState, playerName, score }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: gameState === "ENDED" ? "center" : "space-between",
        alignItems: "center",
        mb: 2,
        borderBottom: 1,
        borderColor: theme.palette.baseGray.main,
        borderTopLeftRadius: theme?.gameDialog?.borderRadius,
        borderTopRightRadius: theme?.gameDialog?.borderRadius,
        boxShadow: theme?.customShadows?.gameHeader,
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="mavensSubTitle" sx={{ fontWeight: 600 }}>
        [{playerName}]
      </Typography>
      {gameState !== "ENDED" && (
        <Typography variant="mavensSubTitle" sx={{ color: theme.palette.basePinkSecondary.main, fontWeight: 600 }}>
          [Score {score}]
        </Typography>
      )}
    </Box>
  );
};

export default GameHeader;
