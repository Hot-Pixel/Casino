import express from "express";
const router = express.Router();

/* Casino */
const promo = router.get("/", function (req, res, next) {
  res.render("promociones");
});

export default promo;