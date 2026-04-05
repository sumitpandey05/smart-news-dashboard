const { buildPlaceholderResponse } = require("../utils/apiResponse");

const getBookmarks = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("Bookmarks controller ready", {
      data: [],
    })
  );
};

const addBookmark = (req, res) => {
  res.status(201).json(
    buildPlaceholderResponse("Add bookmark controller ready", {
      body: req.body,
    })
  );
};

const removeBookmark = (req, res) => {
  res.status(200).json(
    buildPlaceholderResponse("Remove bookmark controller ready", {
      id: req.params.id,
    })
  );
};

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
