import express from "express";
const router = express.Router();

/* Casino */
const casino = router.get("/", function (req, res, next) {
  res.render("casino");
});

export default casino;