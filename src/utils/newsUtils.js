export const sentimentStyles = {
  Positive: "badge-positive",
  Neutral:  "badge-neutral",
  Negative: "badge-negative",
};

export function formatDate(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoString));
}

export function relativeDate(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const day = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.round(diffMs / day));
  return `${days}d ago`;
}

export function getKeywords(articles) {
  const ignored = new Set([
    "the", "and", "with", "into", "after", "still", "from", "that", "this",
    "have", "will", "they", "their", "about", "around", "while", "than",
    "more", "news", "are", "for", "new", "how", "what", "where", "when",
  ]);

  const counts = {};

  articles.forEach((article) => {
    const words = `${article.title} ${article.excerpt}`.toLowerCase().match(/[a-z]+/g) || [];
    words.forEach((word) => {
      if (word.length < 4 || ignored.has(word)) {
        return;
      }
      counts[word] = (counts[word] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([keyword, count]) => ({ keyword, count }));
}

export function getCategoryCounts(articles) {
  return articles.reduce((acc, article) => {
    const existing = acc.find((item) => item.name === article.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: article.category, value: 1 });
    }
    return acc;
  }, []);
}

export function getTrendingTopics(articles) {
  return getKeywords(articles).map((item) => ({
    topic: item.keyword,
    score: item.count * 12 + 20,
  }));
}
