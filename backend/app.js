const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

//iimport routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// Database connections
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  // Start the server after successful database connection
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE

app.use("/api", authRoutes);
app.use("/api", postRoutes);

//error middle ware
app.use(errorHandler);

//port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
