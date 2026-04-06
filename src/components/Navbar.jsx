import { BarChart3, Bookmark, Menu, Rss, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = ["Home", "World", "Business", "Technology", "AI", "Opinion"];

export default function Navbar({ query, setQuery, bookmarkCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-xl">
      <div className="border-b border-line/50">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] tracking-wider text-muted">{today}</span>
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-muted">Live coverage · Independent reporting</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn-ghost px-3 py-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link to="/" className="group flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
                <Rss className="h-3.5 w-3.5 text-paper" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Daily Scope</span>
            </div>
            <p className="hidden pl-9 pt-0.5 font-mono text-[9px] uppercase tracking-[0.35em] text-muted sm:block">
              Smart News Intelligence
            </p>
          </Link>

          <div className="flex items-center gap-2">
            <div
              className={`hidden items-center gap-2 rounded-lg border px-3 py-2.5 transition-all duration-200 md:flex ${
                searchFocused ? "border-accent/50 bg-surface-2 shadow-glow-sm" : "border-line bg-surface"
              }`}
            >
              <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search coverage..."
                className="w-44 bg-transparent text-sm text-body outline-none placeholder:text-muted lg:w-56"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted hover:text-soft">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-line text-soft hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                }`
              }
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-line text-soft hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                }`
              }
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] font-bold text-paper">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 md:hidden">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search coverage..."
            className="w-full bg-transparent text-sm text-body outline-none placeholder:text-muted"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted hover:text-soft">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-line/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <button
                key={item}
                className="whitespace-nowrap rounded-md px-3.5 py-1.5 font-mono text-xs font-medium text-muted transition-all duration-200 hover:bg-surface-2 hover:text-soft"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
