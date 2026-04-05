import { Bookmark, Clock3 } from "lucide-react";
import { sentimentStyles, formatDate } from "../utils/newsUtils";

export default function ArticleCard({
  article = {},
  onOpen,
  onToggleBookmark,
  isBookmarked,
  compact = false,
}) {
  if (compact) {
    return (
      <article className="border-b border-line py-4 last:border-b-0">
        <div className="grid gap-4 sm:grid-cols-[1fr_120px] sm:items-start">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-900">
              <span>{article.category || "General"}</span>
              {article.sentiment ? (
                <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
                  {article.sentiment}
                </span>
              ) : null}
            </div>
            <button onClick={() => onOpen?.(article)} className="mt-2 text-left font-display text-lg leading-7 text-ink news-link">
              {article.title}
            </button>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-700">
              <span>{article.source}</span>
              <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
            </div>
          </div>
          <img
            src={article.image || "https://via.placeholder.com/300"}
            alt={article.title || "Article image"}
            className="aspect-[4/3] w-full rounded-sm object-contain bg-stone-100"
          />
        </div>
      </article>
    );
  }

  return (
    <article className="animate-fadeUp border-b border-line pb-5 last:border-b-0">
      <div className="grid gap-4 md:grid-cols-[200px_1fr] md:items-start">
        <img
          src={article.image || "https://via.placeholder.com/300"}
          alt={article.title || "Article image"}
          className="aspect-[4/3] w-full rounded-sm object-contain bg-stone-100"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-900">
            <span>{article.category || "General"}</span>
            {article.sentiment ? (
              <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
                {article.sentiment}
              </span>
            ) : null}
          </div>
          <button onClick={() => onOpen?.(article)} className="mt-2 text-left font-display text-xl leading-8 text-ink news-link">
            {article.title}
          </button>
          <p className="mt-2 text-sm leading-7 text-stone-800 line-clamp-3">{article.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-700">
            <span>{article.source}</span>
            <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readMinutes || 5} min read
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <button onClick={() => onOpen?.(article)} className="text-sm font-semibold text-accent hover:underline">
              Read summary
            </button>
            <button
              onClick={() => onToggleBookmark?.(article.id)}
              className={`inline-flex items-center gap-2 text-sm ${isBookmarked ? "text-accent" : "text-stone-800 hover:text-accent"}`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
