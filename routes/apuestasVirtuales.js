import express from "express";
const router = express.Router();

/* appApuestas */
const apuestasVirtuales = router.get("/", function (req, res, next) {
  res.render("apuestas-virtuales");

});

export default apuestasVirtuales;