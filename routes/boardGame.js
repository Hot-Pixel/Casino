import express from "express";
const router = express.Router();


/* Poker */
const boardGame = router.get("/", function (req, res, next) {
  res.render("board-game");
});

export default boardGame;