const express = require("express");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend running",
  });
});

app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
