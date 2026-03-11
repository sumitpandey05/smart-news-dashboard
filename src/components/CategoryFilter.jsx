export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-stone-700 hover:border-accent hover:text-accent"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
