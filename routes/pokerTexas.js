import express from "express";
const router = express.Router();

/* Casino */
const texas = router.get("/", function (req, res, next) {
  res.render("poker-texas");
});

export default texas;