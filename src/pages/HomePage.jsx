import { useMemo, useState } from "react";
import { categories, mockArticles } from "../data/mockNews";
import CategoryFilter from "../components/CategoryFilter";
import ArticleCard from "../components/ArticleCard";
import InsightsPanel from "../components/InsightsPanel";
import HistoryPanel from "../components/HistoryPanel";
import { getCategoryCounts, getKeywords, getTrendingTopics, formatDate } from "../utils/newsUtils";

const INITIAL_COUNT = 4;
const LOAD_MORE_STEP = 3;

export default function HomePage({
  query,
  bookmarks,
  onToggleBookmark,
  history,
  onOpenArticle,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${article.source}`.toLowerCase();
      const matchesQuery = searchable.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const leadArticle = filteredArticles[0] || mockArticles[0];
  const featuredSide = filteredArticles.slice(1, 3);
  const latestArticles = filteredArticles.slice(0, 5);
  const feedArticles = filteredArticles.slice(0, visibleCount);
  const keywordData = useMemo(() => getKeywords(mockArticles), []);
  const trendingTopics = useMemo(() => getTrendingTopics(mockArticles), []);
  const historyArticles = useMemo(
    () => history.map((item) => mockArticles.find((article) => article.id === item.id)).filter(Boolean),
    [history]
  );
  const historyCount = history.filter((item) => Date.now() - new Date(item.viewedAt).getTime() <= 7 * 24 * 60 * 60 * 1000).length;
  const averageReadTime = historyArticles.length
    ? Math.round(historyArticles.reduce((sum, article) => sum + article.readMinutes, 0) / historyArticles.length)
    : 0;
  const categoryData = useMemo(
    () => getCategoryCounts(historyArticles.length ? historyArticles : mockArticles),
    [historyArticles]
  );

  return (
    <div className="space-y-10">
      <section className="border-b border-line pb-8">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr_0.8fr]">
          <div className="xl:col-span-2">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
              <article>
                <img src={leadArticle.image} alt={leadArticle.title} className="h-72 w-full object-cover sm:h-[420px]" />
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Top Story</p>
                  <button onClick={() => onOpenArticle(leadArticle.id)} className="mt-3 text-left font-display text-4xl leading-tight text-ink news-link">
                    {leadArticle.title}
                  </button>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-stone-700">{leadArticle.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                    <span>{leadArticle.source}</span>
                    <span>{formatDate(leadArticle.publishedAt)}</span>
                    <span>{leadArticle.readMinutes} min read</span>
                  </div>
                </div>
              </article>

              <div className="border-t border-line lg:border-l lg:border-t-0 lg:pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">More Headlines</p>
                <div className="mt-4 space-y-5">
                  {featuredSide.map((article) => (
                    <div key={article.id} className="border-b border-line pb-5 last:border-b-0">
                      <button onClick={() => onOpenArticle(article.id)} className="text-left font-display text-2xl leading-9 text-ink news-link">
                        {article.title}
                      </button>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{article.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="panel p-5">
            <div className="border-b border-line pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Latest</p>
              <h2 className="mt-2 font-display text-2xl text-ink">Developing now</h2>
            </div>
            <div className="mt-4 space-y-4">
              {latestArticles.map((article, index) => (
                <div key={article.id} className="border-b border-line pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <span className="pt-1 text-xs font-semibold text-accent">0{index + 1}</span>
                    <div>
                      <button onClick={() => onOpenArticle(article.id)} className="text-left text-base font-semibold leading-7 text-ink news-link">
                        {article.title}
                      </button>
                      <p className="mt-1 text-xs text-stone-500">{article.category} • {article.readMinutes} min read</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr_340px]">
        <div className="xl:col-span-2">
          <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Coverage</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Latest reporting</h2>
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

          <div className="mt-4 space-y-6">
            {feedArticles.length === 0 ? (
              <div className="py-10 text-sm text-stone-500">No articles match the current filters.</div>
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

          {visibleCount < filteredArticles.length ? (
            <div className="mt-6">
              <button
                onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                className="border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
              >
                Load more stories
              </button>
            </div>
          ) : null}

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <section>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Editors' Picks</p>
              </div>
              <div className="mt-2">
                {mockArticles.slice(2, 5).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onOpen={onOpenArticle}
                    onToggleBookmark={onToggleBookmark}
                    isBookmarked={bookmarks.includes(article.id)}
                    compact
                  />
                ))}
              </div>
            </section>

            <HistoryPanel
              historyItems={history.slice(0, 5)}
              getArticleById={(articleId) => mockArticles.find((article) => article.id === articleId)}
            />
          </div>
        </div>

        <InsightsPanel
          keywordData={keywordData}
          trendingTopics={trendingTopics}
          categoryData={categoryData}
          historyCount={historyCount}
          averageReadTime={averageReadTime}
        />
      </section>
    </div>
  );
}
