import express from "express";
const router = express.Router();


/* Layout */
const layout = router.get("/", function (req, res, next) {
  res.render("layout");
});

export default layout;