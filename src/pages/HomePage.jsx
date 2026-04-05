import { useMemo, useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

export default function HomePage({
  query = "",
  bookmarks = [],
  onToggleBookmark,
  history = [],
  onOpenArticle,
}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=india&apiKey=${apiKey}`
        );
        const data = await res.json();

        const formatted = (data.articles || []).map((item, i) => ({
          id: i + 1,
          title: item?.title || "",
          excerpt: item?.description || "",
          content: item?.content || "", // 🔥 IMPORTANT
          image: item?.urlToImage || "https://via.placeholder.com/300",
          source: item?.source?.name || "Unknown",
          publishedAt: item?.publishedAt,
          category: "General",
          readMinutes: 5,
        }));

        setArticles(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) =>
      `${a.title} ${a.excerpt}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [articles, query]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!articles.length) {
    return <div className="text-center py-10">No news found</div>;
  }

  const lead = filtered[0] || articles[0];

  return (
    <div className="space-y-10">

      {/* TOP STORY */}
      <section>
        <img
          src={lead.image}
          className="w-full h-80 object-cover"
        />

        <h1 className="text-3xl font-bold mt-4">
          {lead.title}
        </h1>

        <p className="mt-2 text-gray-600">
          {lead.excerpt}
        </p>

        <button
          onClick={() => onOpenArticle(lead)} // ✅ FIX
          className="text-blue-500 mt-2"
        >
          Read more
        </button>
      </section>

      {/* LIST */}
      <div className="space-y-6">
        {filtered.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onOpen={() => onOpenArticle(article)} // ✅ FIX
            onToggleBookmark={onToggleBookmark}
            isBookmarked={bookmarks.includes(article.id)}
          />
        ))}
      </div>
    </div>
  );
}