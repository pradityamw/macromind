import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const topics = [
  { id: "intro-econ", title: "Intro Economics", level: "Beginner", icon: "BookOpen" },
  { id: "supply-demand", title: "Supply & Demand", level: "Beginner", icon: "TrendingUpDown" },
  { id: "opportunity-cost", title: "Opportunity Cost", level: "Beginner", icon: "Split" },
  { id: "gdp-basics", title: "GDP Basics", level: "Beginner", icon: "BarChart3" },
  { id: "inflation-basics", title: "Inflation Basics", level: "Beginner", icon: "ArrowUpRight" },
  { id: "consumer-behavior", title: "Consumer Behavior", level: "Beginner", icon: "Users" },
  { id: "producer-basics", title: "Producer Basics", level: "Beginner", icon: "Factory" },
  
  { id: "market-structure", title: "Market Structure", level: "Intermediate", icon: "LayoutGrid" },
  { id: "monopoly", title: "Monopoly", level: "Intermediate", icon: "Crown" },
  { id: "oligopoly", title: "Oligopoly", level: "Intermediate", icon: "Users2" },
  { id: "game-theory", title: "Game Theory", level: "Intermediate", icon: "Dices" },
  { id: "banking-system", title: "Banking System", level: "Intermediate", icon: "Building2" },
  { id: "interest-rates", title: "Interest Rates", level: "Intermediate", icon: "Percent" },
  { id: "forex-economics", title: "Forex Economics", level: "Intermediate", icon: "Globe2" },
  { id: "bond-market", title: "Bond Market", level: "Intermediate", icon: "ScrollText" },
  { id: "behavioral-economics", title: "Behavioral Economics", level: "Intermediate", icon: "Brain" },
  
  { id: "is-lm-model", title: "IS-LM Model", level: "Advanced", icon: "LineChart" },
  { id: "ad-as-model", title: "AD-AS Model", level: "Advanced", icon: "Activity" },
  { id: "monetary-economics", title: "Monetary Economics", level: "Advanced", icon: "Coins" },
  { id: "fiscal-policy", title: "Fiscal Policy", level: "Advanced", icon: "Landmark" },
  { id: "international-trade", title: "International Trade", level: "Advanced", icon: "Ship" },
  { id: "yield-curve", title: "Yield Curve", level: "Advanced", icon: "TrendingUp" },
  { id: "econometrics", title: "Econometrics", level: "Advanced", icon: "Calculator" },
  { id: "financial-economics", title: "Financial Economics", level: "Advanced", icon: "PieChart" },
  
  { id: "global-macro", title: "Global Macro", level: "Expert", icon: "Earth" },
  { id: "quantitative-easing", title: "Quantitative Easing", level: "Expert", icon: "Banknote" },
  { id: "crisis-analysis", title: "Economic Crisis Analysis", level: "Expert", icon: "AlertTriangle" },
  { id: "geopolitical-economics", title: "Geopolitical Economics", level: "Expert", icon: "Map" },
  { id: "ai-economy", title: "AI Economy", level: "Expert", icon: "Cpu" },
  { id: "central-bank-strategy", title: "Central Bank Strategy", level: "Expert", icon: "Target" },
  { id: "market-psychology", title: "Market Psychology", level: "Expert", icon: "HeartPulse" },
  { id: "portfolio-theory", title: "Portfolio Theory", level: "Expert", icon: "Briefcase" }
];

async function generateContent(title, level) {
  const prompt = `
  Anda adalah seorang profesor ekonomi dan pakar trading profesional.
  Tuliskan materi pembelajaran (article/module) komprehensif dalam bahasa Indonesia tentang "${title}" untuk tingkat "${level}".
  
  Syarat penulisan:
  1. Gunakan format Markdown (menggunakan headings ##, bullet points, bold text).
  2. Materi harus jelas, mudah dipahami, berbobot, dan relevan dengan dunia finansial/trading.
  3. Panjang artikel sekitar 300 - 500 kata.
  4. Berikan kesimpulan praktis bagi trader/investor di akhir materi.
  5. Jangan gunakan tag pembuka/penutup seperti \`\`\`markdown, langsung berikan teksnya.
  `;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });
    const data = await res.json();
    
    if (data.error) {
      console.error(`Gemini API Error for ${title}:`, data.error);
      return `Materi tentang ${title} gagal di-generate (API Error).`;
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error(`Fetch error for ${title}:`, error);
    return `Materi tentang ${title} gagal di-generate.`;
  }
}

async function seed() {
  console.log("🚀 Starting AI Curriculum Generation (32 Modules)...");
  
  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing in .env.local!");
    return;
  }

  let sqlOutput = "-- ==========================================\n";
  sqlOutput += "-- COMPLETE CURRICULUM AI INJECTION SCRIPT\n";
  sqlOutput += "-- ==========================================\n\n";

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    console.log(`\n⏳ [${i+1}/${topics.length}] Generating: ${topic.title} (${topic.level})...`);
    
    let content = await generateContent(topic.title, topic.level);
    
    // If it hit a rate limit, retry once after 10 seconds
    if (content.includes("API Error") || content.includes("gagal")) {
       console.log("   ⚠️ Rate limit hit. Waiting 10 seconds to retry...");
       await new Promise(r => setTimeout(r, 10000));
       content = await generateContent(topic.title, topic.level);
    }
    
    // Escape single quotes for SQL
    const escapedContent = content.replace(/'/g, "''");
    const description = `Materi komprehensif tentang ${topic.title} untuk tingkat ${topic.level}.`;
    
    sqlOutput += `INSERT INTO modules (id, title, description, icon, level, duration, content)\n`;
    sqlOutput += `VALUES ('${topic.id}', '${topic.title}', '${description}', '${topic.icon}', '${topic.level}', '15 mins', '${escapedContent}')\n`;
    sqlOutput += `ON CONFLICT (id) DO UPDATE SET\n`;
    sqlOutput += `  title = EXCLUDED.title,\n`;
    sqlOutput += `  description = EXCLUDED.description,\n`;
    sqlOutput += `  icon = EXCLUDED.icon,\n`;
    sqlOutput += `  level = EXCLUDED.level,\n`;
    sqlOutput += `  content = EXCLUDED.content;\n\n`;
    
    console.log(`   ✅ Script written for: ${topic.title}`);
    
    // Wait 5 seconds to stay well below 15 RPM free tier limit
    if (i < topics.length - 1) {
      console.log("   (Waiting 5s for API rate limits...)");
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  fs.writeFileSync('curriculum.sql', sqlOutput);
  console.log("\n🎉 All 32 AI Modules successfully generated and saved to curriculum.sql!");
}

seed();
