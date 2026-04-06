import { Bookmark, Clock3, ArrowUpRight } from "lucide-react";
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
      <article className="group border-b border-line py-4 last:border-b-0">
        <div className="grid gap-3 sm:grid-cols-[1fr_108px]">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="eyebrow">{article.category || "General"}</span>
              {article.sentiment ? (
                <span className={sentimentStyles[article.sentiment]}>{article.sentiment}</span>
              ) : null}
            </div>
            <button
              onClick={() => onOpen?.(article)}
              className="news-link text-left font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-accent"
            >
              {article.title}
            </button>
            <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted">
              <span>{article.source}</span>
              <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {article.readMinutes || 5}m
              </span>
            </div>
          </div>
          <div className="img-overlay h-20 overflow-hidden rounded-lg bg-surface-2 sm:h-full">
            <img
              src={article.image || "https://via.placeholder.com/300"}
              alt={article.title || "Article image"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group animate-fadeUp overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line hover:shadow-panel">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <div className="img-overlay h-52 overflow-hidden bg-surface-2 lg:h-full">
          <img
            src={article.image || "https://via.placeholder.com/300"}
            alt={article.title || "Article image"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="eyebrow">{article.category || "General"}</span>
              {article.sentiment ? (
                <span className={sentimentStyles[article.sentiment]}>{article.sentiment}</span>
              ) : null}
            </div>

            <button
              onClick={() => onOpen?.(article)}
              className="news-link text-left font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent sm:text-2xl"
            >
              {article.title}
            </button>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-soft">{article.excerpt}</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted">
              <span>{article.source}</span>
              <span className="text-line">·</span>
              <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
              <span className="text-line">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {article.readMinutes || 5} min
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpen?.(article)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 font-mono text-xs font-semibold text-accent transition-all duration-200 hover:border-accent/40 hover:bg-accent/20"
              >
                Read summary
                <ArrowUpRight className="h-3 w-3" />
              </button>

              <button
                onClick={() => onToggleBookmark?.(article.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                  isBookmarked
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
