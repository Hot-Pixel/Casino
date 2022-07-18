import express from "express";
const router = express.Router();

/* Slots All*/
const slotsAll = router.get("/", function (req, res, next) {
  res.render("slots-all");
});

export default slotsAll;