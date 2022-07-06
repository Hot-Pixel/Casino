import express from "express";
const router = express.Router();


/* Home */
const slots = router.get("/", function (req, res, next) {
  res.render("slots");
});

export default slots;