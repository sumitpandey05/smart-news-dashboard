import { useEffect, useState } from "react";
import { Bookmark, Clock3, X } from "lucide-react";
import { generateSummary } from "../utils/ai";
import { formatDate, sentimentStyles } from "../utils/newsUtils";

export default function ArticleModal({ article, isBookmarked, onClose, onToggleBookmark }) {
  const [aiData, setAiData] = useState({
    summary: article?.summary || "",
    takeaways: article?.takeaways || [],
    simple: article?.simplified || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!article) return;

    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [article, onClose]);

  useEffect(() => {
    if (!article) return;

    let cancelled = false;

    async function runAI() {
      setAiData({
        summary: article.summary || "",
        takeaways: article.takeaways || [],
        simple: article.simplified || "",
      });

      setLoading(true);
      const result = await generateSummary(article);
      if (!cancelled && result) {
        setAiData({
          summary: result.summary || article.summary || "",
          takeaways: result.takeaways?.length ? result.takeaways : article.takeaways || [],
          simple: result.simple || article.simplified || "",
        });
      }
      if (!cancelled) {
        setLoading(false);
      }
    }

    runAI();

    return () => {
      cancelled = true;
    };
  }, [article]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-40 animate-fadeIn">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl animate-fadeUp overflow-hidden rounded-2xl border border-line bg-surface shadow-float">
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{article.category || "General"}</span>
              {article.sentiment ? (
                <span className={sentimentStyles[article.sentiment]}>{article.sentiment}</span>
              ) : null}
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
                className="rounded-lg border border-line p-2 text-muted transition-all duration-200 hover:bg-surface-3 hover:text-soft"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6 border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
                  {article.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted">
                  <span className="font-medium text-soft">{article.author || "Editorial Desk"}</span>
                  <span className="text-line">·</span>
                  <span>{article.source || "Unknown source"}</span>
                  <span className="text-line">·</span>
                  <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
                  <span className="text-line">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    {article.readMinutes || 5} min read
                  </span>
                </div>
              </div>

              <div className="img-overlay h-56 overflow-hidden rounded-xl bg-surface-2 sm:h-72">
                <img
                  src={article.image || "https://via.placeholder.com/800x500"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="eyebrow text-accent">AI Summary</span>
                </div>
                <p className="text-sm leading-relaxed text-body">
                  {loading ? "Generating summary..." : aiData.summary || "No summary available."}
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-4 w-0.5 rounded-full bg-line" />
                  <span className="eyebrow">Article Snapshot</span>
                </div>
                <p className="text-sm leading-relaxed text-soft">
                  {article.content || article.excerpt || "No article content available."}
                </p>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-4 w-0.5 rounded-full bg-accent" />
                  <span className="eyebrow">Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {(aiData.takeaways || []).map((takeaway, index) => (
                    <li key={`${takeaway}-${index}`} className="flex items-start gap-3 border-b border-line pb-3 last:border-b-0 last:pb-0">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-[9px] font-bold text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-body">{takeaway}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-4 w-0.5 rounded-full bg-soft" />
                  <span className="eyebrow">Simplified Mode</span>
                </div>
                <p className="text-sm italic leading-relaxed text-soft">{aiData.simple || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
