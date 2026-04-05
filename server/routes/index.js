const express = require("express");

const newsRoutes = require("./newsRoutes");
const bookmarkRoutes = require("./bookmarkRoutes");
const aiRoutes = require("./aiRoutes");

const router = express.Router();

router.use("/news", newsRoutes);
router.use("/bookmarks", bookmarkRoutes);
router.use("/ai", aiRoutes);

module.exports = router;
