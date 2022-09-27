import express from "express";
const router = express.Router();

/* error404 */
const error404 = router.get("/", function (req, res, next) {
  res.render("error-404");

});

export default error404;