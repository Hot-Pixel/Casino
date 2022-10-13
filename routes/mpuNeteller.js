import express from "express";
const router = express.Router();

const mpuNeteller = router.get("/", function (req, res, next) {
  res.render("mpu-neteller");
});

export default mpuNeteller;