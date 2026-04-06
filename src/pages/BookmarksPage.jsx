import { BookmarkX, Bookmark } from "lucide-react";
import { mockArticles } from "../data/mockNews";
import ArticleCard from "../components/ArticleCard";

export default function BookmarksPage({ bookmarks, onToggleBookmark, onOpenArticle }) {
  const savedArticles = mockArticles.filter((article) => bookmarks.includes(article.id));

  return (
    <section className="space-y-8 animate-fadeUp">
      {/* ── Page header ── */}
      <div className="border-b border-line pb-6">
        <span className="eyebrow mb-2 block">Saved Stories</span>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Bookmarks</h1>
          {savedArticles.length > 0 && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent mb-1">
              {savedArticles.length} saved
            </span>
          )}
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Stories are stored locally in your browser for this frontend-only version.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        /* ── Empty state ── */
        <div className="panel p-14 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface-2">
            <BookmarkX className="h-7 w-7 text-muted" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink mb-2">No saved stories yet</h2>
          <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
            Browse the home page and click <strong className="text-soft">Save</strong> on any article to keep it here.
          </p>
        </div>
      ) : (
        /* ── Articles grid ── */
        <div className="space-y-4 stagger">
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
