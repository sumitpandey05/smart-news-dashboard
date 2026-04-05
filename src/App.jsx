import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ArticleModal from "./components/ArticleModal";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { mockArticles } from "./data/mockNews";

export default function App() {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useLocalStorage("smart-news-bookmarks", []);
  const [history, setHistory] = useLocalStorage("smart-news-history", []);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const selectedArticle = useMemo(
    () => mockArticles.find((article) => article.id === selectedArticleId) || null,
    [selectedArticleId]
  );

  function handleToggleBookmark(articleId) {
    setBookmarks((current) =>
      current.includes(articleId) ? current.filter((id) => id !== articleId) : [articleId, ...current]
    );
  }

  function handleOpenArticle(articleId) {
    setHistory((current) => {
      const next = [
        { id: articleId, viewedAt: new Date().toISOString() },
        ...current.filter((item) => item.id !== articleId),
      ];
      return next.slice(0, 20);
    });
    setSelectedArticleId(articleId);
  }

  return (
    <div className="min-h-screen">
      <Navbar query={query} setQuery={setQuery} bookmarkCount={bookmarks.length} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                query={query}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                history={history}
                onOpenArticle={handleOpenArticle}
              />
            }
          />
          <Route
            path="/bookmarks"
            element={
              <BookmarksPage
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onOpenArticle={handleOpenArticle}
              />
            }
          />
        </Routes>
      </main>

      <ArticleModal
        article={selectedArticle}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        onClose={() => setSelectedArticleId(null)}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}

