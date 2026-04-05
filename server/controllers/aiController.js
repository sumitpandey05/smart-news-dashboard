const { buildPlaceholderResponse } = require("../utils/apiResponse");

const summarizeArticle = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("AI summary endpoint ready for integration", {
      feature: "summary",
      body: req.body,
    })
  );
};

const analyzeSentiment = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("AI sentiment endpoint ready for integration", {
      feature: "sentiment",
      body: req.body,
    })
  );
};

const generateSuggestions = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("AI suggestions endpoint ready for integration", {
      feature: "suggestions",
      body: req.body,
    })
  );
};

module.exports = {
  summarizeArticle,
  analyzeSentiment,
  generateSuggestions,
};
