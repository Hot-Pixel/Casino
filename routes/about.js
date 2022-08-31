import express from "express";
const router = express.Router();

/* About */
const about = router.get("/", function (req, res, next) {
  res.render("about");

});

export default about;