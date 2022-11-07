import express from "express";
const router = express.Router();

const mpuPayoutNeteller = router.get("/", function (req, res, next) {
  res.render("mpu-payout-neteller");
});

export default mpuPayoutNeteller;