import express from "express";
const router = express.Router();


/* Home */
const about = router.get("/", function (req, res, next) {
  res.render("index");
});

export default about;