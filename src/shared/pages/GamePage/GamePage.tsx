import React, { useEffect, useState, useRef, useContext } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { UserContext } from "../../../App";
import { GameState } from "../../../utils/types/gameTypes";
import { BASE_URL } from "../../../utils/vars";
import { useUI } from "../../../providers/UIContext/UIContext";
import { UserReactionMessages } from "../../../utils/enums";
import { GradientLinearProgress } from "../../components/Loader/Loader";
import { defaultContainerStyles, StyledGameContainer } from "../../../themes/utils/containerSizes";
import GameHeader from "./components/GameHeader";
import theme from "../../../themes";
import GameButton from "../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000;

export default function GamePage() {
  const { userId } = useContext(UserContext);
  const { showToast, state } = useUI();
  const navigate = useNavigate();
  // Keep a stable reference to showToast
  const showToastRef = useRef(showToast);
  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  // Game states
  const [gameState, setGameState] = useState<GameState>("WAITING");
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>(0);
  const [indicatorSide, setIndicatorSide] = useState<"left" | "right" | null>(null);

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const [restartCount, setRestartCount] = useState(0);
  const gameLoopInstanceIdRef = useRef(0);

  useEffect(() => {
    if (!userId) return;

    gameLoopInstanceIdRef.current++;
    const currentInstanceId = gameLoopInstanceIdRef.current;

    const runGameLoop = async () => {
      while (currentInstanceId === gameLoopInstanceIdRef.current) {
        setGameState("WAITING");
        setIndicatorSide(null);
        await delay(randomDelay());
        if (currentInstanceId !== gameLoopInstanceIdRef.current) break;

        const side: "left" | "right" = Math.random() < 0.5 ? "left" : "right";
        setIndicatorSide(side);
        setGameState("SHOWING");

        const reactionResult = await waitForKeyPress(side, 1000);
        if (reactionResult === "success") {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          showToastRef.current(UserReactionMessages["Success"], "success");
        } else {
          setGameState("ENDED");
          showToastRef.current(UserReactionMessages[reactionResult === "tooLate" ? "TooLate" : "WrongKey"], "error");
          await saveScore(false);
          break;
        }
      }
    };

    runGameLoop();
    return () => {
      gameLoopInstanceIdRef.current++;
    };
  }, [userId, restartCount]);

  // Wait for correct key press
  const waitForKeyPress = (
    expected: "left" | "right",
    timeout: number
  ): Promise<"success" | "wrongKey" | "tooLate"> => {
    return new Promise((resolve) => {
      let reaction: "success" | "wrongKey" | null = null;
      const onKeyDown = (e: KeyboardEvent) => {
        if (gameStateRef.current !== "SHOWING") return;
        if (reaction !== null) return;
        const key = e.key.toLowerCase();
        const correct =
          (expected === "left" && (key === "a" || key === "arrowleft")) ||
          (expected === "right" && (key === "d" || key === "arrowright"));
        reaction = correct ? "success" : "wrongKey";
      };

      window.addEventListener("keydown", onKeyDown);
      setTimeout(() => {
        window.removeEventListener("keydown", onKeyDown);
        resolve(reaction !== null ? reaction : "tooLate");
      }, timeout);
    });
  };

  const saveScore = async (success: boolean) => {
    try {
      await fetch(`${BASE_URL}/api/saveScore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, score: scoreRef.current, success }),
      });
    } catch (err) {
      console.error("Failed to save score:", err);
    }
  };

  // Restart
  const handleRestart = () => {
    setScore(0);
    scoreRef.current = 0;
    setIndicatorSide(null);
    setGameState("WAITING");
    setRestartCount((prev) => prev + 1);
  };

  return (
    <Container
      sx={{
        ...defaultContainerStyles,
      }}
    >
      <StyledGameContainer>
        {/* 1) In-game header */}
      
        {state.playerName && <GameHeader gameState={gameState} playerName={state.playerName} score={score} />}
        {/* 2) WAITING / SHOWING / ENDED inside the same container */}
        {gameState === "WAITING" && (
          <Box
            sx={{
              width: "33%",
              margin: "20px auto",
              textAlign: "center",
              height: "100%",
              display: "flex",
              alignItems: "cneter",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <GradientLinearProgress variant="indeterminate" />
          </Box>
        )}
        {gameState === "SHOWING" && indicatorSide && (
           <Box
           sx={{
             position: "relative",
             width: "100%",
             flex: 1,
             mt: 2,
             padding: 1,
           }}
         >
           <Box
             sx={{
               position: "absolute",
               top: "50%",
               transform: "translateY(-50%)",
               left: indicatorSide === "left" ? "20%" : "auto",
               right: indicatorSide === "right" ? "20%" : "auto",
               boxShadow: theme?.customShadows?.gameCube,
               borderRadius: "16.5px",
               backgroundColor: theme?.palette?.baseWhite.main,
               width: "60px",
               height: "60px",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
             }}
           >
             <Box
               sx={{
                 backgroundColor: theme?.palette?.basePinkSecondary.main,
                 width: "45px",
                 height: "45px",
                 borderRadius: "10.5px",
               }}
             ></Box>
           </Box>
         </Box>
        )}
        {gameState === "ENDED" && (
          <Box
            sx={{
              textAlign: "center",
              height: "100%",
              display: "flex",
              alignItems: "cneter",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="mavensBigTitleBold" sx={{ color: theme?.palette?.infoRed?.main, fontWeight: "bold", mb: 4 }}>
              GAME OVER!
            </Typography>
            <Typography variant="mavensBigTitleBold" sx={{ mb: 4 }}>
              [Score {score}]
            </Typography>
            <Box>
              <Button variant="outlined" onClick={() => navigate("/leaderboard")}>
                Highscore
              </Button>
              <GameButton
                sx={{ m: 1 }}
                width={ 163}
                text="Restart Game"
                icon={<SendIcon />}
                iconPosition="start"
                fullWidth={true}
                onClick={handleRestart}
              />
            </Box>
          </Box>
        )}
      </StyledGameContainer>
    </Container>
  );
}
