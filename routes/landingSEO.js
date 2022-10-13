import express from "express";
const router = express.Router();

/* landingSEO */
const landingSEO = router.get("/", function (req, res, next) {
  res.render("landing-seo");

});

export default landingSEO;