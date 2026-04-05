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
  const leftColumnArticles = filteredArticles.slice(1, 5);
  const rightColumnArticles = filteredArticles.slice(5, 10);
  const feedArticles = filteredArticles.slice(0, visibleCount);
  const editorsPicks = mockArticles.slice(2, 5);

  const keywordData = useMemo(() => getKeywords(mockArticles), []);
  const trendingTopics = useMemo(() => getTrendingTopics(mockArticles), []);
  const historyArticles = useMemo(
    () => history.map((item) => mockArticles.find((article) => article.id === item.id)).filter(Boolean),
    [history]
  );
  const historyCount = history.filter(
    (item) => Date.now() - new Date(item.viewedAt).getTime() <= 7 * 24 * 60 * 60 * 1000
  ).length;
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
        <div className="mb-6 border-b border-line pb-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Top Stories</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Front page coverage</h2>
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
        </div>

        <div className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="space-y-5 border-b border-line pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">In The News</p>
              <div className="mt-4 space-y-4">
                {leftColumnArticles.map((article) => (
                  <div key={article.id} className="border-b border-line pb-4 last:border-b-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{article.category}</p>
                    <button
                      onClick={() => onOpenArticle(article.id)}
                      className="mt-2 text-left font-display text-xl leading-8 text-ink news-link"
                    >
                      {article.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Editors' Picks</p>
              <div className="mt-3">
                {editorsPicks.map((article) => (
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
            </div>
          </aside>

          <main>
            <article>
              <button onClick={() => onOpenArticle(leadArticle.id)} className="block w-full text-left">
                <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {leadArticle.title}
                </h1>
              </button>
              <p className="mt-4 text-base leading-8 text-stone-900">{leadArticle.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-900">
                <span>{leadArticle.source}</span>
                <span>{formatDate(leadArticle.publishedAt)}</span>
                <span>{leadArticle.readMinutes} min read</span>
              </div>

              <img
                src={leadArticle.image}
                alt={leadArticle.title}
                className="mt-5 h-72 w-full object-cover sm:h-[460px]"
              />
            </article>

            <div className="mt-8 border-t border-line pt-6">
              <div className="space-y-6">
                {feedArticles.length === 0 ? (
                  <div className="py-10 text-sm text-stone-900">No articles match the current filters.</div>
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
            </div>
          </main>

          <aside className="space-y-6 border-t border-line pt-6 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
            <section>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Latest</p>
                <h3 className="mt-2 font-display text-2xl text-ink">Most recent</h3>
              </div>
              <div className="mt-4 space-y-4">
                {rightColumnArticles.map((article, index) => (
                  <div key={article.id} className="border-b border-line pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <span className="pt-1 text-xs font-semibold text-accent">0{index + 1}</span>
                      <div>
                        <button
                          onClick={() => onOpenArticle(article.id)}
                          className="text-left text-base font-semibold leading-7 text-ink news-link"
                        >
                          {article.title}
                        </button>
                        <p className="mt-1 text-xs text-stone-900">
                          {article.category} • {article.readMinutes} min read
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <InsightsPanel
              keywordData={keywordData}
              trendingTopics={trendingTopics}
              categoryData={categoryData}
              historyCount={historyCount}
              averageReadTime={averageReadTime}
            />
          </aside>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <HistoryPanel
          historyItems={history.slice(0, 5)}
          getArticleById={(articleId) => mockArticles.find((article) => article.id === articleId)}
        />

        <section className="panel p-5">
          <div className="border-b border-line pb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Reading Notes</p>
            <h3 className="mt-2 font-display text-2xl text-ink">Why this layout</h3>
          </div>
          <div className="mt-4 space-y-4 text-sm leading-7 text-stone-900">
            <p>
              The homepage is structured around a classic news-site hierarchy: supporting stories on the left,
              the main headline in the center, and updates plus analytics on the right.
            </p>
            <p>
              That keeps the most important story visually dominant while still showing enough surrounding content
              to make the page feel like a real front page.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}

