import express from "express";
const router = express.Router();

const signIn = router.get("/", function (req, res, next) {
  res.render("signIn");
});

export default signIn;