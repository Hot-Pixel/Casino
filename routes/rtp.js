import express from "express";
const router = express.Router();

const rtp = router.get("/", function (req, res, next) {
  res.render("rtp");
});

export default rtp;