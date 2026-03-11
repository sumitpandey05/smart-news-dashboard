import { Bookmark, Clock3, X } from "lucide-react";
import { sentimentStyles, formatDate } from "../utils/newsUtils";

export default function ArticleModal({ article, isBookmarked, onClose, onToggleBookmark }) {
  if (!article) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/50 px-4 py-8">
      <div className="mx-auto max-w-5xl bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            <span>{article.category}</span>
            <span className={`rounded-full px-2 py-1 text-[10px] normal-case tracking-normal ${sentimentStyles[article.sentiment]}`}>
              {article.sentiment}
            </span>
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{article.title}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500">
              <span>{article.author}</span>
              <span>{article.source}</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                {article.readMinutes} min read
              </span>
            </div>

            <img src={article.image} alt={article.title} className="mt-6 h-72 w-full object-cover sm:h-96" />

            <div className="mt-6 border-l-4 border-accent pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">AI Summary</p>
              <p className="mt-2 text-base leading-8 text-stone-700">{article.summary}</p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Article Snapshot</p>
              <p className="mt-3 text-[15px] leading-8 text-stone-700">{article.content}</p>
            </div>
          </div>

          <aside className="space-y-6 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Key Takeaways</p>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-stone-700">
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway} className="border-b border-line pb-3 last:border-b-0">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Simplified Mode</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{article.simplified}</p>
            </div>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-semibold ${
                isBookmarked ? "border-accent bg-accent text-white" : "border-line text-ink hover:border-accent hover:text-accent"
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
