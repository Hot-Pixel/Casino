import express from "express";
const router = express.Router();

const landingAffiliates = router.get("/", function (req, res, next) {
  res.render("landing-affiliates");
});

export default landingAffiliates;