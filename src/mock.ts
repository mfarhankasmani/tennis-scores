import { IScore, IPlayer } from "./components/Scoreboard/Scoreboard";

export const mockScore = ({ ...arg } = {}): IScore => {
  return {
    players: [
      mockPlayer({ name: "Roger Federer" }),
      mockPlayer({ name: "Rafael Nadal" }),
    ],
    currentSet: 0,
    deuce: false,
    gameOver: false,
    tieBreaker: false,
    winner: undefined,
    ...arg,
  };
};

export const mockPlayer = ({ ...args } = {}): IPlayer => {
  return {
    name: "Roger Federer",
    point: 15,
    advantage: "",
    sets: [6, 3],
    setWon: 0,
    ...args,
  };
};
