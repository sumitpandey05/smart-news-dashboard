import { useMemo } from "react";
import InsightsPanel from "../components/InsightsPanel";
import HistoryPanel from "../components/HistoryPanel";
import { getCategoryCounts, getKeywords, getTrendingTopics } from "../utils/newsUtils";

export default function AnalyticsPage({ articles = [], history = [] }) {
  const historyArticles = useMemo(
    () => history.map((item) => articles.find((article) => article.id === item.id)).filter(Boolean),
    [history, articles]
  );

  const historyCount = history.filter(
    (item) => Date.now() - new Date(item.viewedAt).getTime() <= 7 * 24 * 60 * 60 * 1000
  ).length;

  const averageReadTime = historyArticles.length
    ? Math.round(historyArticles.reduce((sum, article) => sum + (article.readMinutes || 5), 0) / historyArticles.length)
    : 0;

  const categoryData = useMemo(
    () => getCategoryCounts(historyArticles.length ? historyArticles : articles),
    [historyArticles, articles]
  );

  const keywordData = useMemo(() => getKeywords(articles), [articles]);
  const trendingTopics = useMemo(() => getTrendingTopics(articles), [articles]);

  return (
    <section className="space-y-8">
      <div className="border-b border-line pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Reader Dashboard</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Analytics</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-800">
          Review reading time, history, keyword trends, and category distribution in one place.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <HistoryPanel
          historyItems={history.slice(0, 10)}
          getArticleById={(articleId) => articles.find((article) => article.id === articleId)}
        />

        <InsightsPanel
          keywordData={keywordData}
          trendingTopics={trendingTopics}
          categoryData={categoryData}
          historyCount={historyCount}
          averageReadTime={averageReadTime}
        />
      </div>
    </section>
  );
}
