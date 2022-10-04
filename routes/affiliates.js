import express from "express";
const router = express.Router();


/* Poker */
const affiliates = router.get("/", function (req, res, next) {
  res.render("affiliates");
});

export default affiliates;