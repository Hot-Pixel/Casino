import express from "express";
const router = express.Router();


/* Poker */
const pokerTournament = router.get("/", function (req, res, next) {
  res.render("poker-tournament");
});

export default pokerTournament;