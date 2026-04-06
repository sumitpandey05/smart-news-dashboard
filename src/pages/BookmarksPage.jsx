import { BookmarkX } from "lucide-react";
import ArticleCard from "../components/ArticleCard";

export default function BookmarksPage({
  articles = [],
  bookmarks,
  onToggleBookmark,
  onOpenArticle,
}) {
  const savedArticles = articles.filter((article) => bookmarks.includes(article.id));

  return (
    <section className="animate-fadeUp space-y-8">
      <div className="border-b border-line pb-6">
        <span className="eyebrow mb-2 block">Saved Stories</span>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Bookmarks</h1>
          {savedArticles.length > 0 && (
            <span className="mb-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
              {savedArticles.length} saved
            </span>
          )}
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Stories are stored locally in your browser for this frontend-only version.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="panel p-14 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface-2">
            <BookmarkX className="h-7 w-7 text-muted" />
          </div>
          <h2 className="mb-2 font-display text-2xl font-semibold text-ink">No saved stories yet</h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
            Browse the home page and click <strong className="text-soft">Save</strong> on any article to keep it here.
          </p>
        </div>
      ) : (
        <div className="stagger space-y-4">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={onOpenArticle}
              onToggleBookmark={onToggleBookmark}
              isBookmarked
            />
          ))}
        </div>
      )}
    </section>
  );
}
