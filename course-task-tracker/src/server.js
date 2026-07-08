const express = require("express");
const taskRoutes = require("./routes/tasks");

// define the logger path
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

// Middleware used by all routes
app.use(logger);
app.use(express.json());

// Health route
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});