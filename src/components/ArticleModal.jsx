import { Bookmark, Clock3, X, Share2, ArrowUpRight } from "lucide-react";
import { sentimentStyles, formatDate } from "../utils/newsUtils";
import { useEffect } from "react";

export default function ArticleModal({ article, isBookmarked, onClose, onToggleBookmark }) {
  // Close on Escape key
  useEffect(() => {
    if (!article) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [article, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-40 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl animate-fadeUp rounded-2xl bg-surface border border-line shadow-float overflow-hidden">

          {/* ── Header ── */}
          <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-surface-2">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{article.category}</span>
              <span className={sentimentStyles[article.sentiment]}>
                {article.sentiment}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                  isBookmarked
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </button>
              <button
                onClick={onClose}
                className="rounded-lg border border-line p-2 text-muted transition-all duration-200 hover:border-line hover:text-soft hover:bg-surface-3"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">

            {/* Left: Main content */}
            <div className="border-b border-line lg:border-b-0 lg:border-r p-6 sm:p-8 space-y-6">
              {/* Title */}
              <div>
                <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
                  {article.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted">
                  <span className="text-soft font-medium">{article.author}</span>
                  <span className="text-line">·</span>
                  <span>{article.source}</span>
                  <span className="text-line">·</span>
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="text-line">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    {article.readMinutes} min read
                  </span>
                </div>
              </div>

              {/* Hero image */}
              <div className="img-overlay rounded-xl overflow-hidden h-56 sm:h-72">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* AI Summary */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                  <span className="eyebrow text-accent">AI Summary</span>
                </div>
                <p className="text-sm leading-relaxed text-body">{article.summary}</p>
              </div>

              {/* Article snapshot */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-4 w-0.5 rounded-full bg-line"></div>
                  <span className="eyebrow">Article Snapshot</span>
                </div>
                <p className="text-sm leading-relaxed text-soft">{article.content}</p>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="p-6 sm:p-8 space-y-8">

              {/* Key Takeaways */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-4 w-0.5 rounded-full bg-accent"></div>
                  <span className="eyebrow">Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {article.takeaways.map((takeaway, i) => (
                    <li key={takeaway} className="flex items-start gap-3 border-b border-line pb-3 last:border-b-0 last:pb-0">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-[9px] font-bold text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-body">{takeaway}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simplified Mode */}
              <div className="rounded-xl bg-surface-2 border border-line p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-4 w-0.5 rounded-full bg-soft"></div>
                  <span className="eyebrow">Simplified Mode</span>
                </div>
                <p className="text-sm leading-relaxed text-soft italic">{article.simplified}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => onToggleBookmark(article.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isBookmarked
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line text-soft hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "Saved to bookmarks" : "Save article"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
