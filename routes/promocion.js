import express from "express";
const router = express.Router();

/* Casino */
const promocion = router.get("/", function (req, res, next) {
  res.render("promocion");
});

export default promocion;