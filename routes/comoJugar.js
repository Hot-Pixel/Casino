import express from "express";
const router = express.Router();

/* Casino */
const howTo = router.get("/", function (req, res, next) {
  res.render("howTo");
});

export default howTo;