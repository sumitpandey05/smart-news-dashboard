export default function ArticleCard({
  article = {},
  onOpen,
  onToggleBookmark,
  isBookmarked,
}) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-700 cursor-pointer hover:bg-gray-900 transition">

      {/* LEFT: SMALL IMAGE */}
      <img
        src={article?.image || "https://via.placeholder.com/120"}
        alt=""
        className="w-28 h-20 object-cover rounded"
      />

      {/* CENTER: TEXT */}
      <div className="flex-1">
        <h2
          onClick={() => article?.id && onOpen?.(article.id)}
          className="text-lg font-semibold leading-6 text-white hover:underline"
        >
          {article?.title}
        </h2>

        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {article?.excerpt}
        </p>

        <div className="text-xs text-gray-500 mt-2">
          {article?.source}
        </div>
      </div>

      {/* RIGHT: META */}
      <div className="flex flex-col justify-between items-end text-xs text-gray-400 min-w-[100px]">

        <span>
          {article?.category || "General"} • {article?.readMinutes || 5} min
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            article?.id && onToggleBookmark?.(article.id);
          }}
        >
          {isBookmarked ? "★" : "☆"}
        </button>

      </div>
    </div>
  );
}