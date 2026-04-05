import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateSummary(article) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
Return ONLY JSON. No markdown. No headings.

Format:
{
  "summary": "3 line summary",
  "takeaways": ["point1", "point2", "point3"],
  "simple": "simple explanation"
}

Article:
Title: ${article.title}
Description: ${article.excerpt}
Content: ${article.content}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    console.log("RAW AI:", text);

    // 🔥 REMOVE MARKDOWN JUNK
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("PARSE FAILED:", text);

      return {
        summary: "Could not generate summary",
        takeaways: [],
        simple: "",
      };
    }

    return parsed;
  } catch (err) {
    console.error(err);
    return {
      summary: "Error generating summary",
      takeaways: [],
      simple: "",
    };
  }
}