import express from "express";
const router = express.Router();

const gameLimit = router.get("/", function (req, res, next) {
  res.render("game-limit-user-screen");
});

export default gameLimit;