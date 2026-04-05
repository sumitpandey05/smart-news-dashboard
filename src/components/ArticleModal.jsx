import { useEffect, useState } from "react";
import { Bookmark, Clock3, X } from "lucide-react";
import { generateSummary } from "../utils/ai";

export default function ArticleModal({
  article,
  isBookmarked,
  onClose,
  onToggleBookmark,
}) {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!article) return;

    async function runAI() {
      setLoading(true);
      const res = await generateSummary(article);
      setAiData(res);
      setLoading(false);
    }

    runAI();
  }, [article]);

  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-6 relative">

        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-3xl font-bold">{article.title}</h2>

        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          <span>{article.source}</span>

          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toDateString()
              : "No date"}
          </span>

          <span className="flex items-center gap-1">
            <Clock3 size={14} />
            {article.readMinutes} min
          </span>
        </div>

        <img
          src={article.image}
          className="w-full h-80 object-cover mt-4"
        />

        {/* SUMMARY */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm">SUMMARY</h3>
          <p>
            {loading
              ? "Generating..."
              : aiData?.summary || "No summary"}
          </p>
        </div>

        {/* TAKEAWAYS */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm">KEY TAKEAWAYS</h3>
          <ul>
            {(aiData?.takeaways || []).map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>

        {/* SIMPLE */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm">SIMPLIFIED</h3>
          <p>{aiData?.simple || ""}</p>
        </div>

        <button
          onClick={() => onToggleBookmark(article.id)}
          className="mt-6 border px-4 py-2"
        >
          <Bookmark size={16} />
          {isBookmarked ? " Saved" : " Save"}
        </button>
      </div>
    </div>
  );
}