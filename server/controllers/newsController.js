const getNews = (req, res) => {
  res.status(200).json({
    message: "News controller ready for API integration",
    data: [],
  });
};

module.exports = {
  getNews,
};
