import express from "express";
const router = express.Router();

const mpuPayoutSkrill = router.get("/", function (req, res, next) {
  res.render("mpu-payout-skrill");
});

export default mpuPayoutSkrill;