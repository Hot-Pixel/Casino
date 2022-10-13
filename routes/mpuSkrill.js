import express from "express";
const router = express.Router();

const mpuSkrill = router.get("/", function (req, res, next) {
  res.render("mpu-skrill");
});

export default mpuSkrill;