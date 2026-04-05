const { fetchNews } = require("../services/newsService");

const getNews = async (req, res, next) => {
  try {
    const articles = await fetchNews();

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
};
