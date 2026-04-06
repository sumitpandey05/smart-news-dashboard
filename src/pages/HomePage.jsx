import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
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
    <div className="space-y-12">
      <section>
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-0.5 rounded-full bg-accent" />
            <div>
              <span className="eyebrow mb-0.5 block">Top Stories</span>
              <h2 className="font-display text-2xl font-bold text-ink">Front page coverage</h2>
            </div>
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

        {loading ? <div className="mb-4 text-sm text-soft">Loading latest news...</div> : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="min-w-0">
            <article className="group mb-8 animate-fadeUp">
              <div className="img-overlay h-72 overflow-hidden rounded-xl bg-surface-2 sm:h-[420px]">
                <img
                  src={leadArticle.image || "https://via.placeholder.com/1000x600"}
                  alt={leadArticle.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-accent/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper backdrop-blur-sm">
                    {leadArticle.category}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button onClick={() => onOpenArticle?.(leadArticle)} className="block w-full text-left">
                  <h1 className="lead-headline text-3xl transition-colors hover:text-accent sm:text-4xl lg:text-[2.6rem]">
                    {leadArticle.title}
                  </h1>
                </button>
                <p className="mt-3 text-base leading-relaxed text-soft">{leadArticle.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
                  <span>{leadArticle.source}</span>
                  <span className="text-line">·</span>
                  <span>{leadArticle.publishedAt ? formatDate(leadArticle.publishedAt) : "No date"}</span>
                  <span className="text-line">·</span>
                  <span>{leadArticle.readMinutes || 5} min read</span>
                </div>
              </div>
            </article>

            <div className="mb-6 flex items-center gap-3 border-t border-line pt-6">
              <div className="h-4 w-0.5 rounded-full bg-line" />
              <span className="eyebrow">More Stories</span>
            </div>

            <div className="stagger space-y-4">
              {feedArticles.length === 0 ? (
                <div className="panel p-10 text-center">
                  <p className="font-mono text-sm text-muted">No articles match the current filters.</p>
                </div>
              ) : (
                feedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onOpen={onOpenArticle}
                    onToggleBookmark={onToggleBookmark}
                    isBookmarked={bookmarks.includes(article.id)}
                  />
                ))
              )}
            </div>

            {visibleCount + 1 < filteredArticles.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                  className="btn-ghost gap-2"
                >
                  Load more stories
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </main>

          <aside className="min-w-0 space-y-6">
            <div className="panel p-5">
              <div className="mb-4 border-b border-line pb-3">
                <span className="eyebrow">More headlines</span>
              </div>
              <div className="space-y-4">
                {sideArticles.map((article) => (
                  <div key={article.id} className="group border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <button
                      onClick={() => onOpenArticle?.(article)}
                      className="news-link text-left font-display text-xl leading-8 text-ink transition-colors group-hover:text-accent"
                    >
                      {article.title}
                    </button>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-soft">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
