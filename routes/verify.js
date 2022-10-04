import express from "express";
const router = express.Router();

const verificacion = router.get("/", function (req, res, next) {
  res.render("verify-user-screen");
});

export default verificacion;