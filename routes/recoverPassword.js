import express from "express";
const router = express.Router();

const recoverPassword = router.get("/", function (req, res, next) {
  res.render("recoverPassword");
});

export default recoverPassword;