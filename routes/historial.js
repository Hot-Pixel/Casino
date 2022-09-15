import express from "express";
const router = express.Router();

const historial = router.get("/", function (req, res, next) {
  res.render("history-user-screen");
});

export default historial;