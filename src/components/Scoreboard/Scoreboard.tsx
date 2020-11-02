import React from "react";
import useStyles from "./Scoreboard.style";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import calculateScore from "./utils";

interface IScoreboard {
  teams: {
    player1: string;
    player2: string;
  };
}

export interface IPlayer {
  name: string;
  point: 0 | 15 | 30 | 40;
  advantage: "A" | "";
  sets: number[];
  setWon: number;
  tiePoint?: number;
}

export interface IScore {
  players: IPlayer[];
  deuce: boolean;
  gameOver: boolean;
  tieBreaker: boolean;
  currentSet: number;
  winner?: string;
}

const initialValue = (player1: string, player2: string): IScore => {
  return {
    players: [
      {
        name: player1,
        point: 0,
        advantage: "",
        sets: [0],
        setWon: 0,
      },
      {
        name: player2,
        point: 0,
        advantage: "",
        sets: [0],
        setWon: 0,
      },
    ],
    currentSet: 0,
    deuce: false,
    gameOver: false,
    tieBreaker: false,
    winner: undefined,
  };
};

const Scoreboard: React.FunctionComponent<IScoreboard> = ({ teams }) => {
  const classes = useStyles();

  const { player1, player2 } = teams;

  const [score, setScore] = React.useState(initialValue(player1, player2));
  const [count, setCount] = React.useState(-1);

  const { players, deuce, winner, gameOver, tieBreaker } = score;

  const handleOnClick = (index: number) => {
    const newScore = calculateScore(score, index);
    setScore(newScore);
    setCount(count + 1);
  };

  console.log({ score });

  const setsTableHeader = players[0].sets.map((set, i) => {
    return (
      <TableCell align="right" key={i}>
        {i + 1}
      </TableCell>
    );
  });

  const tableBody = players.map((player) => {
    const sets = player.sets.map((set, i) => {
      return (
        <TableCell align="right" key={`${player.name}-${i}`}>
          {set}
        </TableCell>
      );
    });
    return (
      <TableRow key={player.name}>
        <TableCell component="th" scope="row">
          {player.name}
        </TableCell>
        {tieBreaker && <TableCell align="right">{player.tiePoint}</TableCell>}
        <TableCell align="right">{player.advantage}</TableCell>
        <TableCell align="right" key={player.point}>
          {player.point}
        </TableCell>
        {sets}
      </TableRow>
    );
  });

  return (
    <div className={classes.scoreboard}>
      <div className="scoreboard__header" key={score.players[0].point}>
        <h2>Scoreboard</h2>
      </div>
      <TableContainer className={classes.table__container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {tieBreaker && <TableCell align="right">Tie Br</TableCell>}
              <TableCell align="right"></TableCell>
              <TableCell align="right">Game</TableCell>
              {setsTableHeader}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.scoreboard__footer}>
        {!gameOver && (
          <>
            <p className={classes.scoreboard__footer__p}>{deuce && "Deuce"}</p>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOnClick(0)}
              >
                {player1}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOnClick(1)}
              >
                {player2}
              </Button>
            </div>
          </>
        )}
        {gameOver && (
          <p className={classes.scoreboard__footer__p}>
            Winner of the game is {winner}
          </p>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
