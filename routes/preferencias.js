import express from "express";
const router = express.Router();

const preferencias = router.get("/", function (req, res, next) {
  res.render("preferences-user-screen");
});

export default preferencias;