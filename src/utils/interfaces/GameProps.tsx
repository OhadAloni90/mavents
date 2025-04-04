import { GameState } from "../types/gameTypes";

export interface GameHeaderProps {
  gameState: GameState;
  playerName?: string;
  score?: number;
}
