import express from "express";
const router = express.Router();

const mpuDebit = router.get("/", function (req, res, next) {
  res.render("mpu-debit");
});

export default mpuDebit;