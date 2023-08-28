require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
// const { logger } = require("./middleware/logger");
// const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const allowedOptions = require("./config/allowedOptions");
const connectToDb = require("./config/db");
const { default: mongoose } = require("mongoose");

app.use(express.json());
connectToDb();

// custom middleware
// app.use(logger);

// third party middleware , allow to use the cookie data
app.use(cookieParser());
// anoterh thrid party middleware, securing the connection
app.use(cors(allowedOptions));

// built in middleware runs auto as the server starts
// direct to the static file in main page
app.use("/", express.static(path.join(__dirname, "./client/build")));
// in main page also run that route too
app.use("/", require("./routes/route"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// run the build html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), (err) => {
    res.status(5000).send(err);
  });
});
// if the request is not in the above urls then create a 404 route url
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "the requested resouce is not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// custom middleware
// app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
