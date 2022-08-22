import express from "express";
const router = express.Router();

/* User*/
const user = router.get("/", function (req, res, next) {
  res.render("user");
});

export default user;