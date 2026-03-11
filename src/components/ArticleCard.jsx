import { Bookmark, Clock3 } from "lucide-react";
import { sentimentStyles, formatDate } from "../utils/newsUtils";

export default function ArticleCard({ article, onOpen, onToggleBookmark, isBookmarked, compact = false }) {
  if (compact) {
    return (
      <article className="border-b border-line py-4 last:border-b-0">
        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              <span>{article.category}</span>
              <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
                {article.sentiment}
              </span>
            </div>
            <button onClick={() => onOpen(article.id)} className="mt-2 text-left font-display text-xl leading-8 text-ink news-link">
              {article.title}
            </button>
            <p className="mt-2 text-sm leading-6 text-stone-600">{article.excerpt}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <span>{article.source}</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readMinutes} min read
              </span>
            </div>
          </div>
          <img src={article.image} alt={article.title} className="h-32 w-full object-cover sm:h-full" />
        </div>
      </article>
    );
  }

  return (
    <article className="animate-fadeUp border-b border-line pb-6 last:border-b-0">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <img src={article.image} alt={article.title} className="h-48 w-full object-cover lg:h-full" />
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            <span>{article.category}</span>
            <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
              {article.sentiment}
            </span>
          </div>
          <button onClick={() => onOpen(article.id)} className="mt-3 text-left font-display text-2xl leading-9 text-ink news-link">
            {article.title}
          </button>
          <p className="mt-3 text-sm leading-7 text-stone-600">{article.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span>{article.source}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readMinutes} min read
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button onClick={() => onOpen(article.id)} className="text-sm font-semibold text-accent hover:underline">
              Read summary
            </button>
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center gap-2 text-sm ${isBookmarked ? "text-accent" : "text-stone-600 hover:text-accent"}`}
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
