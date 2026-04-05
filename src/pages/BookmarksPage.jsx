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
    <section className="space-y-8">
      <div className="border-b border-line pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Saved Stories</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Bookmarks</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-800">
          Stories are stored locally in the browser for this frontend-only version.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="panel p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-line text-stone-900">
            <BookmarkX className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-2xl text-ink">No saved stories</h2>
          <p className="mt-2 text-sm text-stone-900">Use the save action on any article to keep it here.</p>
        </div>
      ) : (
        <div className="space-y-6">
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
