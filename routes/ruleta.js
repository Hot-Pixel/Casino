import express from "express";
const router = express.Router();

/* Ruleta */
const ruleta = router.get("/", function (req, res, next) {
  res.render("ruleta");
});

export default ruleta;