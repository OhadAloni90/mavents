import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./shared/pages/SignInPage/SignInPage";
import GamePage from "./shared/pages/GamePage/GamePage";
import LeaderboardPage from "./shared/pages/LeaderBoardPage/LeaderboardPage";
import Header from "./shared/components/Header/Header";
import { UIProvider } from "./providers/UIContext/UIContext";
import GradientBackground from "./themes/utils/backgrounds";
import { Box } from "@mui/material";
export const UserContext = React.createContext<{
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
  userId: "",
  setUserId: () => {},
});

export default function App() {
  const [userId, setUserId] = React.useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <UIProvider>
        <GradientBackground
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/*  fixed-height header */}
          <Header text="mavens Game" />
          {/*  main content  below the header */}
          <Box
            sx={{
              flex: 1,
              marginTop: "40px", // exactly the header’s height
              height: "calc(100vh - 40px)", // fill the rest of the screen,
              
            }}
          >
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </Box>
        </GradientBackground>
      </UIProvider>
    </UserContext.Provider>
  );
}
