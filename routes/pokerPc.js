import express from "express";
const router = express.Router();


/* Poker */
const pokerPc = router.get("/", function (req, res, next) {
  res.render("poker-pc");
});

export default pokerPc;