export interface Article {
  id: string;
  title: string;
  summary: string;
  original_url: string;
  source: string;
  category: "Tech" | "Economy";
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  estimated_read_time: number;
  thumbnail_url?: string;
  content?: string;
  published_at: string;
}

export interface Lesson {
  id: string;
  article_id: string;
  title: string;
  content: {
    type: "text" | "infographic";
    value: string;
  }[];
  glossary_terms: {
    term: string;
    definition: string;
  }[];
}
