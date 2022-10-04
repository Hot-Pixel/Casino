import express from "express";
const router = express.Router();


/* Poker */
const pokerSatelitesCEP = router.get("/", function (req, res, next) {
  res.render("poker-satelites-cep");
});

export default pokerSatelitesCEP;