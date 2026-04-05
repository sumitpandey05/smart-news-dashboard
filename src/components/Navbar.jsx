import {
  BarChart3,
  Bookmark,
  Menu,
  Search,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = ["Home", "World", "Business", "Technology", "AI", "Opinion"];

export default function Navbar({ query, setQuery, bookmarkCount }) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-stone-800 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <span>{today}</span>
          <span className="hidden sm:inline">Independent reporting, clear summaries, and simple reading tools.</span>
        </div>
      </div>

      <div className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 md:hidden">
            <Menu className="h-4 w-4" />
            Menu
          </button>

          <Link to="/" className="text-center md:text-left">
            <p className="font-display text-3xl font-bold tracking-tight text-ink">Daily Scope</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-900">Smart News Intelligence</p>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border border-line px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-stone-900" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search coverage"
                className="w-44 bg-transparent text-sm outline-none placeholder:text-stone-400 lg:w-60"
              />
            </div>
            <NavLink to="/analytics" className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-accent">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </NavLink>
            <NavLink to="/bookmarks" className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-accent">
              <Bookmark className="h-4 w-4" />
              Saved {bookmarkCount ? `(${bookmarkCount})` : ""}
            </NavLink>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-6 overflow-x-auto text-sm font-medium text-stone-900">
            {navItems.map((item) => (
              <button key={item} className="whitespace-nowrap news-link">
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border border-line px-3 py-2 md:hidden">
            <Search className="h-4 w-4 text-stone-900" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search coverage"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
