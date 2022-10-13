import express from "express";
const router = express.Router();

const mpuPaysafe = router.get("/", function (req, res, next) {
  res.render("mpu-paysafe");
});

export default mpuPaysafe;