import express from "express";
const router = express.Router();


/* Poker */
const affiliates = router.get("/", function (req, res, next) {
  res.render("poker-satelites-online");
});

export default affiliates;