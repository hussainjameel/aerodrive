import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
import indexRouter from "./routes/indexRouter.js";
import usersRouter from "./routes/usersRouter.js";
import fileRouter from "./routes/fileRouter.js";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  origin: [
    "http://localhost:5173",           // Vite local development (default port)
    "http://localhost:3000",           // if you sometimes use 3000
    "https://aerodrive-frontend.onrender.com"   // ← Your live frontend URL (will update after deploy)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 1. HEALTH CHECK FIRST
app.get("/", (req, res) => {
  res.send("AeroDrive backend running 🚀");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/file", fileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.use(function (err, req, res, next) {
  console.error(err); // logs full error in terminal

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
