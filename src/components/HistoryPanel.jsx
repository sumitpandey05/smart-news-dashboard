import { Clock3 } from "lucide-react";
import { formatDate } from "../utils/newsUtils";

export default function HistoryPanel({ historyItems, getArticleById }) {
  return (
    <section className="panel p-5">
      <div className="border-b border-line pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-900">Reading History</p>
        <h3 className="mt-2 font-display text-2xl text-ink">Recently opened</h3>
      </div>

      <div className="mt-4 space-y-4">
        {historyItems.length === 0 ? (
          <div className="text-sm text-stone-900">Open an article to begin tracking your reading history.</div>
        ) : (
          historyItems.map((item) => {
            const article = getArticleById(item.id);
            if (!article) return null;

            return (
              <div key={`${item.id}-${item.viewedAt}`} className="border-b border-line pb-4 last:border-b-0">
                <p className="font-display text-lg leading-7 text-ink">{article.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-stone-900">
                  <span>{article.category}</span>
                  <span>{formatDate(item.viewedAt)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {article.readMinutes} min read
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

