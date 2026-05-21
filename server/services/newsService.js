const axios = require("axios");
const env = require("../config/env");

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x500";

function estimateReadMinutes(text = "") {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(wordCount / 200));
}

function mapArticle(item, index) {
  const content = item.content || item.description || item.title || "";

  return {
    id: item.url || `news-${index + 1}`,
    title: item.title || "Untitled article",
    excerpt: item.description || "",
    content,
    image: item.urlToImage || PLACEHOLDER_IMAGE,
    source: item.source?.name || "Unknown",
    author: item.author || "Editorial Desk",
    publishedAt: item.publishedAt || new Date().toISOString(),
    category: "General",
    sentiment: "Neutral",
    readMinutes: estimateReadMinutes(content),
    summary: item.description || "",
    takeaways: [],
    simplified: "",
    url: item.url || "",
  };
}

const fetchNews = async () => {
  if (!env.newsApiKey) {
    throw new Error("NEWS_API_KEY is missing in server environment variables");
  }

  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: "india",
      language: "en",
      pageSize: 12,
      apiKey: env.newsApiKey,
    },
  });

  const articles = response.data?.articles || [];
  return articles.map(mapArticle);
};

module.exports = {
  fetchNews,
};