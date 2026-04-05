const axios = require("axios");
const env = require("../config/env");

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x500";

function estimateReadMinutes(text = "") {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(wordCount / 200));
}

function mapArticle(item, index) {
  const content = item.description || item.snippet || item.title || "";

  return {
    id: item.uuid || item.url || `news-${index + 1}`,
    title: item.title || "Untitled article",
    excerpt: item.description || item.snippet || "",
    content,
    image: item.image_url || PLACEHOLDER_IMAGE,
    source: item.source || "Unknown",
    author: item.author || "Editorial Desk",
    publishedAt: item.published_at || new Date().toISOString(),
    category: item.categories?.[0]
      ? item.categories[0].charAt(0).toUpperCase() + item.categories[0].slice(1)
      : "General",
    sentiment: "Neutral",
    readMinutes: estimateReadMinutes(content),
    summary: item.description || item.snippet || "",
    takeaways: [],
    simplified: "",
    url: item.url || "",
  };
}

const fetchNews = async () => {
  if (!env.newsApiKey) {
    throw new Error("NEWS_API_KEY is missing in server environment variables");
  }

  const response = await axios.get("https://api.thenewsapi.com/v1/news/top", {
    params: {
      api_token: env.newsApiKey,
      locale: "in",
      language: "en",
      limit: 12,
    },
  });

  const articles = response.data?.data || [];
  return articles.map(mapArticle);
};

module.exports = {
  fetchNews,
};
