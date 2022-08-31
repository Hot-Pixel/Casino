import express from "express";
const router = express.Router();


/* Slot */
const slots = router.get("/", function (req, res, next) {
  res.render("slots");
});

export default slots;