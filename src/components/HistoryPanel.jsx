import { Clock3, History } from "lucide-react";
import { formatDate } from "../utils/newsUtils";

export default function HistoryPanel({ historyItems, getArticleById }) {
  return (
    <section className="panel p-5">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-line">
        <History className="h-3.5 w-3.5 text-muted" />
        <div>
          <span className="eyebrow block mb-0.5">Reading History</span>
          <h3 className="font-display text-xl font-semibold text-ink">Recently opened</h3>
        </div>
      </div>

      <div className="space-y-4">
        {historyItems.length === 0 ? (
          <div className="rounded-lg bg-surface-2 border border-line p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-3">
              <History className="h-4 w-4 text-muted" />
            </div>
            <p className="font-mono text-xs text-muted">Open an article to begin tracking your reading history.</p>
          </div>
        ) : (
          historyItems.map((item) => {
            const article = getArticleById(item.id);
            if (!article) return null;

            return (
              <div
                key={`${item.id}-${item.viewedAt}`}
                className="flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0 group"
              >
                <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold leading-snug text-ink line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted">
                    <span className="rounded-full border border-line px-1.5 py-0.5">{article.category}</span>
                    <span>{formatDate(item.viewedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-2.5 w-2.5" />
                      {article.readMinutes}m
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
