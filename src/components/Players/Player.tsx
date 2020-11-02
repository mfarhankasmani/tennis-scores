import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface IPlayer {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    player1: string,
    player2: string,
    errorValidation: () => void
  ) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        width: "25ch",
      },
      "& .MuiButton-containedPrimary": {
        display: "flex",
        margin: theme.spacing(2),
        width: "25ch",
      },
    },
    player: {
      padding: "30px",
      border: "2px solid gray",
      "border-radius": "12px",
    },
  })
);

const Player: React.FunctionComponent<IPlayer> = ({ onSubmit }) => {
  const classes = useStyles();

  const [player1, setPlayer1] = React.useState("");
  const [player2, setPlayer2] = React.useState("");
  const [error, setError] = React.useState({
    player1: false,
    player2: false,
  });

  const onChangePlayer1 = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPlayer1(event.target.value);
  };

  const onChangePlayer2 = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPlayer2(event.target.value);
  };

  const errorValidation = () => {
    if (player1 === "" && player2 === "")
      setError({ player1: true, player2: true });
    else if (player1 === "" && player2 !== "")
      setError({ player1: true, player2: false });
    else if (player1 !== "" && player2 !== "")
      setError({ player1: false, player2: false });
  };

  return (
    <div className={classes.player}>
      <div className="player__header">
        <h2>Players</h2>
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onSubmit(e, player1, player2, errorValidation)}
      >
        <TextField
          id="standard-basic"
          label="Player 1"
          error={error.player1}
          value={player1}
          onChange={onChangePlayer1}
        />
        <TextField
          id="standard-basic"
          label="Player 2"
          error={error.player2}
          value={player2}
          onChange={onChangePlayer2}
        />
        <Button variant="contained" color="primary" type="submit">
          Start
        </Button>
      </form>
    </div>
  );
};

export default Player;
