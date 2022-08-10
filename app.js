import express from "express";
const app = express();
import createError from "http-errors";
import path from "path";
import home from "./routes/home.js";
import about from "./routes/about.js";
import layout from "./routes/layout.js";
import slots from "./routes/slots.js";
import slotsAll from "./routes/slotsAll.js";
import casino from "./routes/casino.js";
import promo from "./routes/promociones.js";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// render engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", home);
app.use("/about", about);
app.use("/layout", layout);
app.use("/slots", slots);
app.use("/slots-all", slotsAll);
app.use("/casino", casino);
app.use("/promociones", promo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;