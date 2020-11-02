import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    table__container: {
      "margin-top": theme.spacing(2),
    },
    scoreboard__footer: {
      display: "flex",
      "align-items": "center",
      "justify-content": "space-between",
    },
    scoreboard__footer__p: {
      "font-size": "larger",
      "font-weight": 700,
      color: "darkred",
      margin: theme.spacing(2),
    },
    scoreboard: {
      padding: "30px",
      border: "2px solid gray",
      "border-radius": "12px",
    },
    root: {
      "& .MuiButton-containedPrimary": {
        margin: theme.spacing(2),
        width: "auto",
      },
      "& .MuiButton-containedSecondary": {
        margin: theme.spacing(2),
        width: "auto",
      },
    },
  })
);

export default useStyles;
