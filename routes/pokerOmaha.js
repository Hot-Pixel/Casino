import express from "express";
const router = express.Router();

/* Casino */
const omaha = router.get("/", function (req, res, next) {
  res.render("poker-omaha");
});

export default omaha;