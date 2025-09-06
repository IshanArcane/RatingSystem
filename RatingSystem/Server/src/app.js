const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/stores");
const ratingRoutes = require("./routes/ratings");
const adminRoutes = require("./routes/adminUser"); // admin user management - implement similarly

const app = express();

// Allow frontend origin: set in env or wildcard for dev
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/ratings", ratingRoutes);
app.use("/admin", adminRoutes); // admin only

// health
app.get("/", (req, res) => res.json({ message: "Store Rating API" }));

module.exports = app;
