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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000;

export default function GamePage() {
  const { userId } = useContext(UserContext);
  const { showToast, state } = useUI();

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
          showToastRef.current(
            UserReactionMessages[reactionResult === "tooLate" ? "TooLate" : "WrongKey"],
            "error"
          );
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
    <Container sx={{
          ...defaultContainerStyles
        }}>
    <StyledGameContainer>
      {/* 1) In-game header */}
      {state.playerName && (
        <GameHeader
          gameState={gameState}
          playerName={state.playerName}
          score={score}
        />
      )}
      {/* 2) WAITING / SHOWING / ENDED inside the same container */}
      {gameState === "WAITING" && (
        <Box sx={{ width: "300px", margin: "20px auto" }}>
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
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: indicatorSide === "left" ? "10%" : "auto",
              right: indicatorSide === "right" ? "10%" : "auto",
              width: "50px",
              height: "50px",
              backgroundColor: "hotpink",
            }}
          />
        </Box>
      )}
      {gameState === "ENDED" && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h4" sx={{ color: "red", fontWeight: "bold", mb: 2 }}>
            GAME OVER!
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            [Score {score}]
          </Typography>
          <Box>
            <Button variant="contained" onClick={handleRestart} sx={{ mr: 2 }}>
              Restart
            </Button>
            <Button variant="outlined" onClick={() => console.log("Back to main game")}>
              Back to Main Game
            </Button>
          </Box>
        </Box>
      )}
    </StyledGameContainer>
    </Container>
  );
}
