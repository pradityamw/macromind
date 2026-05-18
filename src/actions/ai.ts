"use server";

import { GoogleGenAI } from "@google/genai";
import { Article } from "@/types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

export async function generateLearnContext(article: Article) {
  try {
    // If no API key is provided, return mock data
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
      return {
        keyConcepts: [
          { term: "Interest Rates", definition: "The cost of borrowing money. When it's high, borrowing is expensive, which slows down the economy." },
          { term: "Inflation", definition: "The rate at which prices for goods and services rise." }
        ],
        whyItMatters: "This article matters because changes in the economy directly affect your daily life and investments.",
      };
    }

    const prompt = `
    Analyze the following article and generate a beginner-friendly "Learn Before You Read" context.
    Article Title: ${article.title}
    Article Summary: ${article.summary}
    Category: ${article.category}

    Please output a valid JSON object with the following schema:
    {
      "keyConcepts": [
        { "term": "Concept 1", "definition": "Simple explanation..." }
      ],
      "whyItMatters": "A 2-3 sentence explanation of why this news impacts the average person or investor."
    }
    Make sure the JSON is clean without any markdown code blocks wrapping it.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error("Error generating Learn Context:", error);
    return null;
  }
}

export async function simplifyArticle(articleText: string, level: "Beginner" | "Professional" | "Investor") {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
      return "This is a mock simplified version of the article. Setup GEMINI_API_KEY in your .env file to see real AI simplifications.";
    }

    const prompt = `
    Rewrite the following article text for a ${level} audience. 
    If the level is Beginner, use simple analogies and avoid jargon.
    If the level is Professional, keep it concise, objective, and analytical.
    If the level is Investor, focus on the market impact and financial implications.

    Article Text:
    ${articleText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error simplifying article:", error);
    return "An error occurred while trying to simplify the article.";
  }
}

export async function chatWithAI(messages: { role: string, content: string }[]) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
      return "Hi! This is a mock response because GEMINI_API_KEY is not set. Please set it in your .env.local file.";
    }

    const systemInstruction = `You are MacroMind AI, a world-class economics professor and professional trading coach. 
    Your goal is to help users learn economics, understand financial markets, and improve their trading discipline. 
    Always respond in a helpful, structured, and easy-to-understand manner. If asked about real-time data you don't know, provide general principles instead. Keep your answers concise unless asked for detail.`;

    const formattedMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: {
           role: "system",
           parts: [{ text: systemInstruction }]
        }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error chatting with AI:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
