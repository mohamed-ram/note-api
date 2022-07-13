// third-party
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const cookieParser = require("cookie-parser");
// modules
const connectDB = require("./db/db");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
// routers
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/users");

// dotenv config
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();

// connect to database
connectDB();

// basic middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// routes
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/auth", userRouter);

// debug middlewares
app.use(notFound);
app.use(errorHandler);

// server setup
const PORT = process.env.PORT || 5000;
const node_env = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${node_env} mode on port ${PORT}`.blue.inverse.underline
      .bold
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close();
});
