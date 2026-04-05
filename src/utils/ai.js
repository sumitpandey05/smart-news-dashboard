const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function fallbackResponse(article) {
  return {
    summary: article?.summary || article?.excerpt || "No summary available.",
    takeaways: article?.takeaways || [],
    simple: article?.simplified || article?.excerpt || "",
  };
}

export async function generateSummary(article) {
  if (!article) {
    return fallbackResponse(article);
  }

  try {
    const response = await fetch(`${API_BASE}/ai/summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
      }),
    });

    if (!response.ok) {
      throw new Error("AI summary request failed");
    }

    const data = await response.json();

    return {
      summary: data.summary || data.data?.summary || article.summary || article.excerpt || "No summary available.",
      takeaways: data.takeaways || data.data?.takeaways || article.takeaways || [],
      simple: data.simple || data.data?.simple || article.simplified || article.excerpt || "",
    };
  } catch (error) {
    console.error(error);
    return fallbackResponse(article);
  }
}
