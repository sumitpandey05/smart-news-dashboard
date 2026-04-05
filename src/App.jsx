import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ArticleModal from "./components/ArticleModal";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useLocalStorage("smart-news-bookmarks", []);
  const [history, setHistory] = useLocalStorage("smart-news-history", []);
  const [selectedArticle, setSelectedArticle] = useState(null);

  function handleToggleBookmark(articleId) {
    setBookmarks((current) =>
      current.includes(articleId)
        ? current.filter((id) => id !== articleId)
        : [articleId, ...current]
    );
  }

  function handleOpenArticle(article) {
    if (!article) return; // ✅ SAFETY

    setSelectedArticle(article);

    setHistory((current) => {
      const next = [
        { id: article.id, viewedAt: new Date().toISOString() },
        ...current.filter((item) => item.id !== article.id),
      ];
      return next.slice(0, 20);
    });
  }

  return (
    <div className="min-h-screen">
      <Navbar
        query={query}
        setQuery={setQuery}
        bookmarkCount={bookmarks.length}
      />

      <main className="mx-auto max-w-7xl px-4 py-8">
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

      {/* ✅ ONLY RENDER MODAL IF ARTICLE EXISTS */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isBookmarked={bookmarks.includes(selectedArticle.id)}
          onClose={() => setSelectedArticle(null)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </div>
  );
}