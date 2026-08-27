require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");

const connectDB = require("./config/db");

const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ndaRoutes = require("./routes/ndaRoutes"); // NEW

connectDB();

const app = express();

app.use(cors());
app.use("/api/upload", uploadRoutes);
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/nda", ndaRoutes); // NEW

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running...");
});