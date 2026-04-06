import { Bookmark, Clock3, ArrowUpRight } from "lucide-react";
import { sentimentStyles, formatDate } from "../utils/newsUtils";

export default function ArticleCard({ article, onOpen, onToggleBookmark, isBookmarked, compact = false }) {
  if (compact) {
    return (
      <article className="group border-b border-line py-4 last:border-b-0">
        <div className="grid gap-3 sm:grid-cols-[1fr_108px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="eyebrow">{article.category}</span>
              <span className={sentimentStyles[article.sentiment]}>
                {article.sentiment}
              </span>
            </div>
            <button
              onClick={() => onOpen(article.id)}
              className="text-left font-display text-base font-semibold leading-snug text-ink news-link group-hover:text-accent transition-colors"
            >
              {article.title}
            </button>
            <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted">
              <span>{article.source}</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {article.readMinutes}m
              </span>
            </div>
          </div>
          <div className="img-overlay h-20 rounded-lg overflow-hidden sm:h-full">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="animate-fadeUp group rounded-xl border border-line bg-surface overflow-hidden transition-all duration-300 hover:border-line hover:shadow-panel hover:-translate-y-0.5">
      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Image */}
        <div className="img-overlay h-52 lg:h-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="eyebrow">{article.category}</span>
              <span className={sentimentStyles[article.sentiment]}>
                {article.sentiment}
              </span>
            </div>

            <button
              onClick={() => onOpen(article.id)}
              className="text-left font-display text-xl font-semibold leading-snug text-ink news-link group-hover:text-accent transition-colors sm:text-2xl"
            >
              {article.title}
            </button>

            <p className="mt-3 text-sm leading-relaxed text-soft line-clamp-2">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted">
              <span>{article.source}</span>
              <span className="text-line">·</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="text-line">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {article.readMinutes} min
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpen(article.id)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 border border-accent/20 px-3 py-1.5 font-mono text-xs font-semibold text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent/40"
              >
                Read summary
                <ArrowUpRight className="h-3 w-3" />
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                  isBookmarked
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-accent/40 hover:text-accent hover:bg-accent/5"
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
