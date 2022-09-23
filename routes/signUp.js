import express from "express";
const router = express.Router();

const signUp = router.get("/", function (req, res, next) {
  res.render("signUp");
});

export default signUp;