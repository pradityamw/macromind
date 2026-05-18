"use server";

import { Article } from "@/types";
import Parser from "rss-parser";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure', 'content:encoded']
  }
});

// Cache for a short time to avoid hitting RSS too often and getting blocked
let cachedFeeds: Record<string, { data: Article[], lastFetch: number }> = {
  en: { data: [], lastFetch: 0 },
  id: { data: [], lastFetch: 0 }
};
const CACHE_DURATION = 15 * 60 * 1000; // 15 mins

export async function getNewsFeed(language: 'en' | 'id' = 'en', category?: "Tech" | "Economy"): Promise<Article[]> {
  try {
    const cache = cachedFeeds[language];
    if (cache.data.length > 0 && Date.now() - cache.lastFetch < CACHE_DURATION) {
      let result = cache.data;
      if (category) {
        result = result.filter(a => a.category === category);
      }
      return result;
    }

    const techFeedUrl = language === 'id' 
      ? "https://www.antaranews.com/rss/tekno.xml" 
      : "https://techcrunch.com/feed/";
      
    const economyFeedUrl = language === 'id'
      ? "https://www.antaranews.com/rss/ekonomi.xml"
      : "https://finance.yahoo.com/news/rss";

    const [techFeed, ecoFeed] = await Promise.all([
      parser.parseURL(techFeedUrl).catch(() => ({ items: [] })),
      parser.parseURL(economyFeedUrl).catch(() => ({ items: [] }))
    ]);

    const formatItems = (items: any[], cat: "Tech" | "Economy", source: string) => {
      return items.map(item => {
        // base64url encode the URL for safe passing in the route
        const id = Buffer.from(item.link || "").toString("base64url");
        
        let thumbnail_url = undefined;
        if (item['media:content']?.$?.url) {
          thumbnail_url = item['media:content'].$.url;
        } else if (item.enclosure?.url) {
          thumbnail_url = item.enclosure.url;
        }

        return {
          id,
          title: item.title || "No Title",
          summary: item.contentSnippet || item.snippet || "No summary available",
          original_url: item.link || "",
          source,
          category: cat,
          difficulty_level: "Intermediate" as any,
          estimated_read_time: 5,
          thumbnail_url,
          published_at: item.isoDate || item.pubDate || new Date().toISOString()
        };
      });
    };

    const techSource = language === 'id' ? 'Antara Tekno' : 'TechCrunch';
    const ecoSource = language === 'id' ? 'Antara Ekonomi' : 'Yahoo Finance';

    const techArticles = formatItems(techFeed.items.slice(0, 15), "Tech", techSource);
    const ecoArticles = formatItems(ecoFeed.items.slice(0, 15), "Economy", ecoSource);

    let combined = [...techArticles, ...ecoArticles].sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

    cachedFeeds[language] = {
      data: combined,
      lastFetch: Date.now()
    };

    if (category) {
      combined = combined.filter(a => a.category === category);
    }

    return combined;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

export async function getArticleById(id: string, skipScraping = false): Promise<Article | null> {
  try {
    // decode the URL from the base64url ID
    const url = Buffer.from(id, "base64url").toString("utf-8");
    
    // If we only need summary/title (e.g. for AI Context generation)
    // we can skip the heavy web scraping process
    if (skipScraping) {
      const cachedArticle = cachedFeeds['en'].data.find(a => a.id === id) || cachedFeeds['id'].data.find(a => a.id === id);
      if (cachedArticle) {
        return cachedArticle;
      }
    }

    // Fetch the raw HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch article HTML: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse using JSDOM and Readability
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error("Readability failed to parse the document");
    }

    // Convert HTML to Markdown
    const turndownService = new TurndownService();
    // Some basic cleanup rules
    turndownService.remove(['script', 'noscript', 'style']);
    const markdownContent = turndownService.turndown(article.content);

    // Provide a fallback thumbnail if possible
    const ogImage = doc.window.document.querySelector('meta[property="og:image"]')?.getAttribute("content");

    return {
      id,
      title: article.title,
      summary: article.excerpt || "",
      content: markdownContent,
      original_url: url,
      source: article.siteName || new URL(url).hostname,
      category: "Economy", // Fallback, could be inferred from URL
      difficulty_level: "Intermediate",
      estimated_read_time: Math.max(1, Math.ceil((article.textContent || "").split(/\s+/).length / 200)),
      thumbnail_url: ogImage || undefined,
      published_at: new Date().toISOString()
    };
  } catch (error) {
    console.error("Exception fetching full article:", error);
    return null;
  }
}
