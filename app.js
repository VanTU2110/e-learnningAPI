const express = require("express");
const cors = require("cors");
const connectDB = require("./config/configDB");

// Import Middleware
const errorHandler = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

// Kết nối MongoDB
connectDB();

// Middleware cơ bản
app.use(cors()); // Cho phép API gọi từ frontend
app.use(express.json()); // Hỗ trợ dữ liệu JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);

app.get("/", (req, res) => {
    res.send("Backend đã sẵn sàng rồi đó, test đi");
  });
  
module.exports = app;
