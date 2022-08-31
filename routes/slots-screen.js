import express from "express";
const router = express.Router();

/* Ruleta */
const slotsScreen = router.get("/", function (req, res, next) {
  res.render("slots-screen");
});

export default slotsScreen;