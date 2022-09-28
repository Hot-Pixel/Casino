import express from "express";
const router = express.Router();

/* appApuestas */
const appApuestas = router.get("/", function (req, res, next) {
  res.render("app-apuestas");

});

export default appApuestas;