import express from "express";
const router = express.Router();

const game = router.get("/", function (req, res, next) {
  res.render("game-user-screen");
});

export default game;