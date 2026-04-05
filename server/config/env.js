let dotenv;

try {
  dotenv = require("dotenv");
  dotenv.config();
} catch (error) {
  console.warn("dotenv is not installed yet; using process.env defaults.");
}

module.exports = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  newsApiKey: process.env.NEWS_API_KEY || "",
  aiApiKey: process.env.AI_API_KEY || "",
};
