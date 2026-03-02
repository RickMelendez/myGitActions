const express = require("express");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Get all towers
app.get("/api/towers", (req, res) => {
  res.status(200).json({
    towers: [
      { id: 1, name: "Tower Alpha", status: "active", level: 3 },
      { id: 2, name: "Tower Beta", status: "inactive", level: 1 },
    ],
  });
});

// Get a single tower by ID
app.get("/api/towers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid tower ID" });
  }
  // Placeholder — replace with real DB lookup later
  res.status(200).json({ id, name: `Tower ${id}`, status: "active", level: 1 });
});

// Create a tower
app.post("/api/towers", (req, res) => {
  const { name, level } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Tower name is required" });
  }
  res.status(201).json({ id: Date.now(), name, level: level || 1, status: "inactive" });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
