const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Configure CORS
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true,
  },
});

require("dotenv").config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId); // Join a room for the specific event
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Attach Socket.IO to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));