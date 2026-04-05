import { useEffect, useState } from "react";
import { Bookmark, Clock3, X } from "lucide-react";
import { generateSummary } from "../utils/ai";
import { formatDate, sentimentStyles } from "../utils/newsUtils";

export default function ArticleModal({
  article,
  isBookmarked,
  onClose,
  onToggleBookmark,
}) {
  const [aiData, setAiData] = useState({
    summary: article?.summary || "",
    takeaways: article?.takeaways || [],
    simple: article?.simplified || "",
  });
  const [loading, setLoading] = useState(false);

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
      const res = await generateSummary(article);
      if (!cancelled && res) {
        setAiData({
          summary: res.summary || article.summary || "",
          takeaways: res.takeaways?.length ? res.takeaways : article.takeaways || [],
          simple: res.simple || article.simplified || "",
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

  if (!article) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/50 px-4 py-8">
      <div className="mx-auto max-w-5xl bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">
            <span>{article.category || "General"}</span>
            {article.sentiment ? (
              <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
                {article.sentiment}
              </span>
            ) : null}
          </div>
          <button onClick={onClose} className="text-stone-900 hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{article.title}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-900">
              <span>{article.author || "Editorial Desk"}</span>
              <span>{article.source || "Unknown source"}</span>
              <span>{article.publishedAt ? formatDate(article.publishedAt) : "No date"}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                {article.readMinutes || 5} min read
              </span>
            </div>

            <img
              src={article.image || "https://via.placeholder.com/800x500"}
              alt={article.title}
              className="mt-6 h-72 w-full object-cover sm:h-96"
            />

            <div className="mt-6 border-l-4 border-accent pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">AI Summary</p>
              <p className="mt-2 text-base leading-8 text-stone-900">
                {loading ? "Generating summary..." : aiData.summary || "No summary available."}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Article Snapshot</p>
              <p className="mt-3 text-[15px] leading-8 text-stone-900">
                {article.content || article.excerpt || "No article content available."}
              </p>
            </div>
          </div>

          <aside className="space-y-6 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Key Takeaways</p>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-stone-900">
                {(aiData.takeaways || []).map((takeaway, index) => (
                  <li key={`${takeaway}-${index}`} className="border-b border-line pb-3 last:border-b-0">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Simplified Mode</p>
              <p className="mt-3 text-sm leading-7 text-stone-900">{aiData.simple || ""}</p>
            </div>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-semibold ${
                isBookmarked
                  ? "border-accent bg-accent text-white"
                  : "border-line text-ink hover:border-accent hover:text-accent"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Saved to bookmarks" : "Save article"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
