import express from "express";
const router = express.Router();

const mpuTransfer = router.get("/", function (req, res, next) {
  res.render("mpu-transfer");
});

export default mpuTransfer;