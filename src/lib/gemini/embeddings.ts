import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function createEmbedding(text: string) {
  try {
    const geminiEmbeddingRespose = await model.embedContent(text)
    return geminiEmbeddingRespose.embedding.values
  } catch {
    return null
  }
}