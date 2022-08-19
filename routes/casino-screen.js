import express from "express";
const router = express.Router();

/* Ruleta */
const casinoScreen = router.get("/", function (req, res, next) {
  res.render("casino-screen");
});

export default casinoScreen;