const getBookmarks = (req, res) => {
  res.status(200).json({
    message: "Bookmarks controller ready",
    data: [],
  });
};

const addBookmark = (req, res) => {
  res.status(201).json({
    message: "Add bookmark controller ready",
  });
};

const removeBookmark = (req, res) => {
  res.status(200).json({
    message: `Remove bookmark controller ready for id ${req.params.id}`,
  });
};

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
