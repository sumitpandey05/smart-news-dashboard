const buildPlaceholderResponse = (message, extra = {}) => ({
  success: true,
  message,
  ...extra,
});

module.exports = {
  buildPlaceholderResponse,
};
