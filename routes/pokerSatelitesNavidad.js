import express from "express";
const router = express.Router();


/* Poker */
const pokerSatelitesNavidad = router.get("/", function (req, res, next) {
  res.render("poker-satelites-navidad");
});

export default pokerSatelitesNavidad;