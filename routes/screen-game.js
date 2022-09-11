import express from "express";
const router = express.Router();

/* Screen Game */
const screenGame = router.get("/", function (req, res, next) {
  res.render("screen-game");
});

export default screenGame;