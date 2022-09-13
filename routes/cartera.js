import express from "express";
const router = express.Router();

const cartera = router.get("/", function (req, res, next) {
  res.render("wallet-user-screen");
});

export default cartera;