import { useEffect, useMemo, useState } from "react";
import { categories, mockArticles } from "../data/mockNews";
import CategoryFilter from "../components/CategoryFilter";
import ArticleCard from "../components/ArticleCard";
import { formatDate } from "../utils/newsUtils";

const INITIAL_COUNT = 5;
const LOAD_MORE_STEP = 4;
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function HomePage({
  query = "",
  articles = [],
  onArticlesLoaded,
  bookmarks = [],
  onToggleBookmark,
  onOpenArticle,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE}/news`);
        if (!response.ok) {
          throw new Error("News API request failed");
        }

        const payload = await response.json();
        const serverArticles = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.articles)
            ? payload.articles
            : [];

        const formatted = serverArticles.map((item, index) => ({
          id: item?.id || item?.url || `news-${index + 1}`,
          title: item?.title || "Untitled article",
          excerpt: item?.excerpt || item?.description || "",
          content: item?.content || item?.description || "",
          image: item?.image || item?.urlToImage || "https://via.placeholder.com/800x500",
          source: item?.source?.name || item?.source || "Unknown",
          author: item?.author || "Editorial Desk",
          publishedAt: item?.publishedAt,
          category: item?.category || "General",
          sentiment: item?.sentiment || "Neutral",
          readMinutes: item?.readMinutes || 5,
          summary: item?.summary || item?.description || "",
          takeaways: item?.takeaways || [],
          simplified: item?.simplified || "",
        }));

        if (!cancelled) {
          onArticlesLoaded?.(formatted.length ? formatted : mockArticles);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          onArticlesLoaded?.(mockArticles);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, [onArticlesLoaded]);

  const sourceArticles = articles.length ? articles : mockArticles;

  const filteredArticles = useMemo(() => {
    return sourceArticles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${article.source}`.toLowerCase();
      const matchesQuery = searchable.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, sourceArticles]);

  const leadArticle = filteredArticles[0] || sourceArticles[0];
  const sideArticles = filteredArticles.slice(1, 5);
  const feedArticles = filteredArticles.slice(1, visibleCount + 1);

  if (!leadArticle && !loading) {
    return <div className="py-10 text-center text-sm text-stone-900">No news found.</div>;
  }

  return (
    <div className="space-y-8">
      <section className="border-b border-line pb-8">
        <div className="flex flex-col gap-4 border-b border-line pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Top Stories</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Today&apos;s news brief</h2>
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={(category) => {
              setActiveCategory(category);
              setVisibleCount(INITIAL_COUNT);
            }}
          />
        </div>

        {loading ? <div className="mt-4 text-sm text-stone-800">Loading latest news...</div> : null}

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <main className="min-w-0">
            <article className="border-b border-line pb-6">
              <button onClick={() => onOpenArticle?.(leadArticle)} className="block w-full text-left">
                <h1 className="font-display text-3xl leading-tight text-ink sm:text-5xl">
                  {leadArticle.title}
                </h1>
              </button>
              <p className="mt-3 max-w-3xl text-base leading-8 text-stone-800">{leadArticle.excerpt}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-700">
                <span>{leadArticle.source}</span>
                <span>{leadArticle.publishedAt ? formatDate(leadArticle.publishedAt) : "No date"}</span>
                <span>{leadArticle.readMinutes || 5} min read</span>
              </div>
              <img
                src={leadArticle.image || "https://via.placeholder.com/1000x600"}
                alt={leadArticle.title}
                className="mt-5 max-h-[520px] w-full rounded-sm object-contain bg-stone-100"
              />
            </article>

            <div className="mt-6 space-y-5">
              {feedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpen={onOpenArticle}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={bookmarks.includes(article.id)}
                />
              ))}
            </div>

            {visibleCount + 1 < filteredArticles.length ? (
              <div className="mt-6">
                <button
                  onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                  className="border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
                >
                  Load more stories
                </button>
              </div>
            ) : null}
          </main>

          <aside className="space-y-6 xl:border-l xl:border-line xl:pl-6">
            <section>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">More headlines</p>
              </div>
              <div className="mt-3 space-y-4">
                {sideArticles.map((article) => (
                  <div key={article.id} className="border-b border-line pb-4 last:border-b-0">
                    <button
                      onClick={() => onOpenArticle?.(article)}
                      className="text-left font-display text-xl leading-8 text-ink news-link"
                    >
                      {article.title}
                    </button>
                    <p className="mt-2 text-sm leading-6 text-stone-800 line-clamp-3">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
