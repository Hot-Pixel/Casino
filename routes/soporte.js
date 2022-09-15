import express from "express";
const router = express.Router();

const soporte = router.get("/", function (req, res, next) {
  res.render("support-user-screen");
});

export default soporte;