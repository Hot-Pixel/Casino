import express from "express";
const router = express.Router();

const mpuPayoutPaysafe = router.get("/", function (req, res, next) {
  res.render("mpu-payout-paysafe");
});

export default mpuPayoutPaysafe;