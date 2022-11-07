import express from "express";
const router = express.Router();

const mpuPayoutDebit = router.get("/", function (req, res, next) {
  res.render("mpu-payout-debit");
});

export default mpuPayoutDebit;