import express from "express";
const router = express.Router();

const mpuDeposit = router.get("/", function (req, res, next) {
  res.render("mpu-deposit");
});

export default mpuDeposit;