import express from "express";
const router = express.Router();

const pokerMobile = router.get("/", function (req, res, next) {
  res.render("docs-user-screen");
});

export default pokerMobile;