export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap transition-all duration-200 ${
              isActive ? "category-pill-active" : "category-pill"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
