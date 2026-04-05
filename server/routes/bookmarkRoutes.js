const express = require("express");
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");

const router = express.Router();

router.get("/", getBookmarks);
router.post("/", addBookmark);
router.delete("/:id", removeBookmark);

module.exports = router;
