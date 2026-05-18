import { notFound } from "next/navigation";
import { getModuleById } from "@/actions/learn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, GraduationCap, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import NewsChat from "@/components/news/NewsChat";

export default async function ModuleDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams?.lang === "id" ? "id" : "en";
  const moduleData = await getModuleById(id, lang);

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-8 px-4 md:px-8 max-w-5xl mx-auto pb-12">
      <Link href={`/learn?lang=${lang}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {lang === 'id' ? 'Kembali ke Modul' : 'Back to Modules'}
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {moduleData.level}
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {moduleData.duration}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight font-heading">{moduleData.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {moduleData.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border bg-card">
            <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-blue-500">
              {moduleData.content ? (
                <ReactMarkdown>{moduleData.content}</ReactMarkdown>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  {lang === 'id' ? 'Konten untuk modul ini sedang disiapkan. Silakan periksa kembali nanti.' : 'Content for this module is currently being generated. Please check back later.'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <NewsChat 
            articleContext={{
              title: moduleData.title,
              summary: moduleData.description,
              content: moduleData.content
            }} 
          />
        </div>
      </div>
    </div>
  );
}
