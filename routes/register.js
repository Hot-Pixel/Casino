import express from "express";
const router = express.Router();

const register = router.get("/", function (req, res, next) {
  res.render("register");
});

export default register;