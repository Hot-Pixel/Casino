import express from "express";
const router = express.Router();

const gameExclusion = router.get("/", function (req, res, next) {
  res.render("game-exclusion-user-screen");
});

export default gameExclusion;