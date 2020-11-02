import calculateScore from "./utils";
import { mockScore } from "../../mock";

describe("ScoreUtils", () => {
  it("should update the point of player one", () => {
    const newScore = calculateScore(mockScore(), 0);
    expect(newScore.players[0].point).toEqual(30);
  });

  it("should update the point of player two", () => {
    const newScore = calculateScore(mockScore(), 1);
    expect(newScore.players[1].point).toEqual(30);
  });
});
