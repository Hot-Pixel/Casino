import express from "express";
const router = express.Router();

const mpuPayout = router.get("/", function (req, res, next) {
  res.render("mpu-payout");
});

export default mpuPayout;