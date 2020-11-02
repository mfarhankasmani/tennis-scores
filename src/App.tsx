import React from "react";
import "./App.css";
import { Player, Scoreboard } from "./components";

function App() {
  const [showScoreboard, setScoreboard] = React.useState(false);
  const [players, setPlayers] = React.useState({ player1: "", player2: "" });

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    player1: string,
    player2: string,
    errorValidation: () => void
  ) => {
    e.preventDefault();
    errorValidation();
    setPlayers({ player1, player2 });
    if (player1 !== "" || player2 !== "") {
      setScoreboard(true);
    }
  };

  return (
    <div className="app">
      <header className="App-header"></header>
      {!showScoreboard && <Player onSubmit={handleOnSubmit} />}
      {showScoreboard && <Scoreboard teams={players} />}
    </div>
  );
}

export default App;
