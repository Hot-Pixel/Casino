import express from "express";
const router = express.Router();

const mpuPayoutTransfer = router.get("/", function (req, res, next) {
  res.render("mpu-payout-transfer");
});

export default mpuPayoutTransfer;