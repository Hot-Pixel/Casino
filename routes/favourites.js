import express from "express";
const router = express.Router();


/* Poker */
const favourites = router.get("/", function (req, res, next) {
  res.render("favourites");
});

export default favourites;