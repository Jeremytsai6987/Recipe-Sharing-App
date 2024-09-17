// File: backend/server.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Route Files
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
