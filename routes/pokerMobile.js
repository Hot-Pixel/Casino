import express from "express";
const router = express.Router();


/* Poker */
const pokerMobile = router.get("/", function (req, res, next) {
  res.render("poker-mobile");
});

export default pokerMobile;