import express from "express";
const router = express.Router();


/* Poker */
const poker = router.get("/", function (req, res, next) {
  res.render("poker");
});

export default poker;