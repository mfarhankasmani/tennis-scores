import { IScore } from "./Scoreboard";

const calculateScore = (score: IScore, index: number) => {
  const otherIndex = index === 0 ? 1 : 0;
  const currentPlayer = score.players[index];
  const otherPlayer = score.players[otherIndex];

  const handleDeuce = () => {
    if (!score.deuce) {
      score.deuce = true;
      return false;
    }
    return handleAdvantage();
  };

  const handleAdvantage = () => {
    if (!anyPlayerWithAdavantage(score)) {
      currentPlayer.advantage = "A";
      return false;
    }
    if (currentPlayer.advantage === "A") {
      currentPlayer.advantage = "";
      score.deuce = false;
      return true;
    }
    currentPlayer.advantage = "";
    otherPlayer.advantage = "";
    return false;
  };

  const handleSetUpdate = () => {
    const setCount = currentPlayer.sets[score.currentSet] + 1;
    currentPlayer.sets[score.currentSet] = setCount;
    currentPlayer.point = 0;
    otherPlayer.point = 0;
    if (checkForTie(setCount, otherPlayer.sets[score.currentSet])) {
      score.tieBreaker = true;
      currentPlayer.tiePoint = 0;
      otherPlayer.tiePoint = 0;
      return;
    }
    if (!checkSetDifference(setCount, otherPlayer.sets[score.currentSet]))
      return;
    currentPlayer.setWon += 1;
    handleWinner();
    return;
  };

  const handleWinner = () => {
    if (
      score.currentSet >= 2 &&
      currentPlayer.setWon - otherPlayer.setWon >= 2
    ) {
      score.winner = currentPlayer.name;
      score.gameOver = true;
      return;
    }
    currentPlayer.sets.push(0);
    otherPlayer.sets.push(0);
    score.currentSet = score.currentSet + 1;
    return;
  };

  if (score.tieBreaker) {
    const tiePoint = currentPlayer.tiePoint ? currentPlayer.tiePoint + 1 : 1;
    const otherTiePoint = otherPlayer.tiePoint || 0;
    if (tiePoint > 7 && tiePoint - otherTiePoint >= 2) {
      currentPlayer.tiePoint = 0;
      otherPlayer.tiePoint = 0;
      handleSetUpdate();
    } else {
      currentPlayer.tiePoint = tiePoint;
    }
    score.players[index] = currentPlayer;
    score.players[otherIndex] = otherPlayer;
    return score;
  }

  let currentPoint: 0 | 15 | 30 | 40 = currentPlayer.point;

  if (currentPoint < 30) {
    currentPoint += 15;
    //@ts-ignore
    currentPlayer.point = currentPoint;
  } else if (currentPoint === 30) {
    currentPoint = 40;
  }

  if (currentPlayer.point !== 40 && currentPoint === 40) {
    if (checkDeuce(currentPoint, otherPlayer.point)) {
      handleDeuce();
    }
    currentPlayer.point = currentPoint;
    score.players[index] = currentPlayer;
    return score;
  }

  if (currentPlayer.point === 40) {
    let updateSet = true;
    if (checkDeuce(currentPlayer.point, otherPlayer.point)) {
      updateSet = handleDeuce();
    }
    if (updateSet) {
      handleSetUpdate();
    }
  }

  score.players[index] = currentPlayer;
  score.players[otherIndex] = otherPlayer;
  return score;
};

const checkDeuce = (
  currentPlayerPoint: number,
  otherPlayerPoint: number
): boolean => {
  if (currentPlayerPoint + otherPlayerPoint === 80) return true;
  return false;
};

const anyPlayerWithAdavantage = (score: IScore) => {
  let advantage = true;
  score.players.forEach((player) => {
    if (player.advantage === "A") advantage = false;
  });
  return !advantage;
};

const checkSetDifference = (setCurrPlayer: number, setOtherPlayer: number) => {
  if (setCurrPlayer < 6) return false;
  if (setCurrPlayer === 7) return true;
  if (setCurrPlayer - setOtherPlayer < 2) return false;
  return true;
};

const checkForTie = (setCurrPlayer: number, setOtherPlayer: number) => {
  if (setCurrPlayer === setOtherPlayer && setCurrPlayer === 6) return true;
  return false;
};

export default calculateScore;
