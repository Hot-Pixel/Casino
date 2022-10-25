import express from "express";
const router = express.Router();

const generic = router.get("/", function (req, res, next) {
  res.render("generic");
});

export default generic;