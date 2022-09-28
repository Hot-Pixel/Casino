import express from "express";
const router = express.Router();


/* Poker */
const pokerSatelitesOnline = router.get("/", function (req, res, next) {
  res.render("poker-satelites-online");
});

export default pokerSatelitesOnline;