import express from "express";
const router = express.Router();

const mpuPayoutPaypal = router.get("/", function (req, res, next) {
  res.render("mpu-payout-paypal");
});

export default mpuPayoutPaypal;