const { buildPlaceholderResponse } = require("../utils/apiResponse");

const getNews = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("News controller ready for API integration", {
      source: "newsService",
      data: [],
    })
  );
};

module.exports = {
  getNews,
};
