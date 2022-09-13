import express from "express";
const router = express.Router();

const datos = router.get("/", function (req, res, next) {
  res.render("data-user-screen");

});

export default datos;