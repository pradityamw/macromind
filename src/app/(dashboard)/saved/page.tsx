"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ArrowRight, BookOpen, Newspaper, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function SavedPage() {
  const { savedItems, removeItem } = useStore();

  return (
    <div className="flex-1 space-y-6 px-4 md:px-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Saved Items</h2>
          <p className="text-muted-foreground mt-1">Your personal library of bookmarked content.</p>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <Card className="border-dashed border-2 bg-transparent opacity-60">
          <CardHeader className="text-center pt-10">
            <Bookmark className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No saved items yet</CardTitle>
            <CardDescription>
              When you find an interesting article or module, click the Save button to keep it here.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 flex justify-center">
            <Link href="/dashboard">
              <Button>Explore Content</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0">
                <div className={`p-3 rounded-full ${item.type === 'article' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {item.type === 'article' ? <Newspaper className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="capitalize">{item.type}</Badge>
                    <span>Saved {formatDistanceToNow(item.savedAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
                  onClick={() => removeItem(item.id)}
                  title="Remove from saved"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link href={item.url} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto gap-2">
                    Open <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
