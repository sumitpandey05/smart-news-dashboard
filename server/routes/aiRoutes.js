const express = require("express");
const {
  summarizeArticle,
  analyzeSentiment,
  generateSuggestions,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/summary", summarizeArticle);
router.post("/sentiment", analyzeSentiment);
router.post("/suggestions", generateSuggestions);

module.exports = router;
