import express from "express";
const router = express.Router();

const mpuQuestionarie = router.get("/", function (req, res, next) {
  res.render("mpu-questionarie");
});

export default mpuQuestionarie;