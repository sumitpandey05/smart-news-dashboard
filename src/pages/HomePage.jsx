import { useMemo, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { categories, mockArticles } from "../data/mockNews";
import CategoryFilter from "../components/CategoryFilter";
import ArticleCard from "../components/ArticleCard";
import InsightsPanel from "../components/InsightsPanel";
import HistoryPanel from "../components/HistoryPanel";
import { getCategoryCounts, getKeywords, getTrendingTopics, formatDate, sentimentStyles } from "../utils/newsUtils";

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
    <div className="space-y-12">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — Front page coverage
      ════════════════════════════════════════════════════════════════ */}
      <section>
        {/* Section header */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-0.5 rounded-full bg-accent" />
            <div>
              <span className="eyebrow block mb-0.5">Top Stories</span>
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

        {/* Three-column layout */}
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_300px]">

          {/* ── Left sidebar ── */}
          <aside className="space-y-6">
            {/* In The News */}
            <div className="panel p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                <span className="eyebrow">In The News</span>
              </div>
              <div className="space-y-4">
                {leftColumnArticles.map((article, i) => (
                  <div key={article.id} className="group border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <span className="eyebrow text-accent mb-1 block">{article.category}</span>
                    <button
                      onClick={() => onOpenArticle(article.id)}
                      className="text-left font-display text-base font-semibold leading-snug text-ink news-link group-hover:text-accent transition-colors"
                    >
                      {article.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Editors' Picks */}
            <div className="panel p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                <Flame className="h-3.5 w-3.5 text-accent" />
                <span className="eyebrow">Editors' Picks</span>
              </div>
              <div>
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

          {/* ── Center: Lead + Feed ── */}
          <main className="min-w-0">
            {/* Hero article */}
            <article className="group mb-8 animate-fadeUp">
              {/* Hero image */}
              <div className="img-overlay h-72 rounded-xl overflow-hidden sm:h-[420px]">
                <img
                  src={leadArticle.image}
                  alt={leadArticle.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-accent/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper backdrop-blur-sm">
                    {leadArticle.category}
                  </span>
                  <span className={sentimentStyles[leadArticle.sentiment]}>
                    {leadArticle.sentiment}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => onOpenArticle(leadArticle.id)}
                  className="block w-full text-left"
                >
                  <h1 className="lead-headline text-3xl sm:text-4xl lg:text-[2.6rem] group-hover:text-accent transition-colors">
                    {leadArticle.title}
                  </h1>
                </button>
                <p className="mt-3 text-base leading-relaxed text-soft">{leadArticle.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
                  <span>{leadArticle.source}</span>
                  <span className="text-line">·</span>
                  <span>{formatDate(leadArticle.publishedAt)}</span>
                  <span className="text-line">·</span>
                  <span>{leadArticle.readMinutes} min read</span>
                </div>
              </div>
            </article>

            {/* Feed divider */}
            <div className="flex items-center gap-3 mb-6 border-t border-line pt-6">
              <div className="h-4 w-0.5 rounded-full bg-line" />
              <span className="eyebrow">More Stories</span>
            </div>

            {/* Article feed */}
            <div className="space-y-4 stagger">
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

            {/* Load more */}
            {visibleCount < filteredArticles.length && (
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

          {/* ── Right sidebar ── */}
          <aside className="space-y-6 min-w-0">
            {/* Most Recent */}
            <div className="panel p-5">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-line">
                <span className="eyebrow">Latest</span>
                <span className="ml-auto font-mono text-[9px] text-muted">Most recent</span>
              </div>
              <div className="space-y-4">
                {rightColumnArticles.map((article, index) => (
                  <div key={article.id} className="group flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <span className="font-mono text-[10px] font-bold text-accent mt-1 flex-shrink-0 w-5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <button
                        onClick={() => onOpenArticle(article.id)}
                        className="text-left text-sm font-semibold leading-snug text-ink news-link group-hover:text-accent transition-colors line-clamp-2"
                      >
                        {article.title}
                      </button>
                      <p className="mt-1.5 font-mono text-[10px] text-muted">
                        {article.category} · {article.readMinutes} min read
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — History + Reading Notes
      ════════════════════════════════════════════════════════════════ */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <HistoryPanel
          historyItems={history.slice(0, 5)}
          getArticleById={(articleId) => mockArticles.find((article) => article.id === articleId)}
        />

        <section className="panel p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-line">
            <div className="h-4 w-0.5 rounded-full bg-accent" />
            <div>
              <span className="eyebrow block mb-0.5">Reading Notes</span>
              <h3 className="font-display text-xl font-semibold text-ink">Why this layout</h3>
            </div>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-soft">
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
