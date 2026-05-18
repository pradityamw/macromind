"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { getNewsFeed } from "@/actions/news";
import Image from "next/image";
import { useLanguageStore } from "@/store/language";
import { Article } from "@/types";

export default function DashboardPage() {
  const { language } = useLanguageStore();
  const [newsFeed, setNewsFeed] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      const feed = await getNewsFeed(language);
      setNewsFeed(feed);
      setLoading(false);
    }
    loadNews();
  }, [language]);

  if (loading) {
    return (
      <div className="flex-1 space-y-6 px-4 md:px-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight font-heading">{language === 'en' ? 'Your Feed' : 'Berita Terkini'}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Filter</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsFeed.map((news) => (
          <Card key={news.id} className="flex flex-col hover:border-primary/50 transition-colors overflow-hidden">
            {news.thumbnail_url && (
              <div className="w-full h-48 relative bg-muted">
                <Image 
                  src={news.thumbnail_url} 
                  alt={news.title} 
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={news.category === "Economy" ? "secondary" : "default"} className={news.category === "Economy" ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30" : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"}>
                  {news.category}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2 text-xl font-heading">{news.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <CardDescription className="line-clamp-3">
                {news.summary}
              </CardDescription>
            </CardContent>
            <div className="px-6 pb-6 mt-auto">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {news.estimated_read_time} min read
                </div>
                <div>Level: {news.difficulty_level}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/news/${news.id}?mode=learn&lang=${language}`} className="w-full">
                  <Button className="w-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                    {language === 'en' ? 'Learn Context First' : 'Pelajari Konteksnya'}
                  </Button>
                </Link>
                <Link href={`/news/${news.id}?lang=${language}`} className="w-full">
                  <Button className="w-full" variant="outline" size="sm">
                    {language === 'en' ? 'Read News' : 'Baca Berita'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
