import express from "express";
const router = express.Router();


/* Poker */
const pokerHome = router.get("/", function (req, res, next) {
  res.render("poker-home");
});

export default pokerHome;