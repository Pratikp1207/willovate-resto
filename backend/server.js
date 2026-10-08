const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tableRoutes = require("./routes/tableRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/tables",tableRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Willovate Resto Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

const missingEnvironmentVariables = [
  "MONGO_URI",
  "JWT_SECRET"
].filter((name) => !process.env[name]?.trim());

if (missingEnvironmentVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`
  );
  process.exit(1);
}

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed. Check MONGO_URI and confirm MongoDB is running."
    );
    console.error(`Connection error type: ${error.name}`);
    process.exitCode = 1;
  }
};

startServer();