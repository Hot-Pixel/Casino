import express from "express";
const router = express.Router();

/* atencionCliente */
const atencionCliente = router.get("/", function (req, res, next) {
  res.render("atencion-cliente");

});

export default atencionCliente;