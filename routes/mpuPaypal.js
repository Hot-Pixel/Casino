import express from "express";
const router = express.Router();

const mpuPaypal = router.get("/", function (req, res, next) {
  res.render("mpu-paypal");
});

export default mpuPaypal;