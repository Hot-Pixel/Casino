import express from "express";
const router = express.Router();

const mpuPayoutOk = router.get("/", function (req, res, next) {
  res.render("mpu-payout-ok");
});

export default mpuPayoutOk;