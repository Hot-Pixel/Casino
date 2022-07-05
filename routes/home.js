import express from "express";
const router = express.Router();


/* Home */
const home = router.get("/", function (req, res, next) {
  res.render("index");
});

export default home;