import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  styled,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import theme from "../../../themes";
import SendIcon from "@mui/icons-material/Send";
import GameButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { defaultContainerStyles, StyledHighScoreContainer } from "../../../themes/utils/GlobalContainerStyles";
import { useUI } from "../../../providers/GameContext/GameContext";
import { GradientLinearProgress } from "../../components/Loader/Loader";
import { StyledLeaderBoardBox } from "./style/StyledLeaderBoardBox";
import { LeaderboardItem } from "../../../utils/interfaces/GameProps";
import { BASE_URL } from "../../../utils/vars";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  const { state, onSetLoading } = useUI();
  const fetchLeaderboard = async () => {
    onSetLoading(true);
    console.log("a", state?.isLoading);
    try {
      const res = await fetch(`${BASE_URL}/api/leaderboard`);
      const data = await res.json();
      // data.leaderboards is unsorted, so let's sort by score descending
      const sorted = data.leaderboards.sort((a: LeaderboardItem, b: LeaderboardItem) => b.score - a.score);
      setLeaderboard(sorted);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      onSetLoading(false);
      console.log("b", state?.isLoading);
    }
  };
  const mapIndexText = (index: number): string => {
    const j = index % 10;
    const k = index % 100;
    if (j === 1 && k !== 11) {
      return index + "st";
    }
    if (j === 2 && k !== 12) {
      return index + "nd";
    }
    if (j === 3 && k !== 13) {
      return index + "rd";
    }
    return index + "th";
  };
  return (
    <Container
      sx={{
        ...defaultContainerStyles,
      }}
    >
      <Typography variant="mavensBigTitleBold">HIGHSCORES TABLE</Typography>
      <StyledHighScoreContainer sx={{ mb: 6 }}>
        {state?.isLoading ? (
          <StyledLeaderBoardBox>
            <GradientLinearProgress variant="indeterminate" />
          </StyledLeaderBoardBox>
        ) : (
          <Table
            sx={{
              tableLayout: "fixed", // fixes the column widths
              width: "100%",
              "& th, & td": {
                border: `1px solid ${theme?.palette?.leaderboardInnerTableColor?.main}`,
              },
              // Then specifically override the header row's border color
              "& thead tr th": {
                borderColor: theme?.palette?.basePinkSecondary.main,
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: theme?.palette?.basePink02.main }}>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="mavenLeaderboardTitleText">POS</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  <Typography variant="mavenLeaderboardTitleText">Player name</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  <Typography variant="mavenLeaderboardTitleText">Score</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard?.map((item, index) => (
                <TableRow key={item.userId + index}>
                  <TableCell
                    sx={{
                      color: index === 0 ? theme.palette.infoGreen.main : theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    {index === 0 && <EmojiEventsIcon></EmojiEventsIcon>}

                    <Typography variant="mavenLeaderboardText"> {mapIndexText(index + 1)}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: index === 0 ? theme.palette.infoGreen.main : theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="mavenLeaderboardText">{item.username}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: index === 0 ? theme.palette.infoGreen.main : theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="mavenLeaderboardText">{item.score}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledHighScoreContainer>
   { !state?.isLoading &&   <GameButton
        text="Restart game"
        icon={<SendIcon />}
        iconPosition="start"
        fullWidth={true}
        width={163}
        onClick={() => {
          navigate("/game");
        }}
      />}
    </Container>
  );
}
