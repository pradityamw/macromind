import { getArticleById } from "@/actions/news";
import { matchArticleToModules } from "@/actions/learn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, ArrowLeft, Bot, BookOpen, BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SimplifySection from "@/components/news/SimplifySection";
import SaveButton from "@/components/shared/SaveButton";
import ReactMarkdown from "react-markdown";
import NewsChat from "@/components/news/NewsChat";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const isLearnMode = resolvedSearchParams?.mode === "learn";
  const lang = resolvedSearchParams?.lang === "id" ? "id" : "en";
  const article = await getArticleById(resolvedParams.id, isLearnMode);

  if (!article) {
    return (
      <div className="p-8">
        <h1>{lang === 'id' ? 'Artikel Tidak Ditemukan!' : 'Article Not Found!'}</h1>
        <p>Params ID received: {resolvedParams?.id}</p>
      </div>
    );
  }

  let learnContext = null;

  if (isLearnMode) {
    learnContext = await matchArticleToModules(article, lang);
  }

  return (
    <div className="flex-1 px-4 md:px-8 max-w-5xl mx-auto w-full pb-20">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="pl-0 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {lang === 'id' ? 'Kembali ke Berita' : 'Back to Feed'}
          </Button>
        </Link>
      </div>

      {isLearnMode ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-full hidden sm:block">
              <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">
                {lang === 'id' ? 'Pelajari Konteksnya Dulu' : 'Learn Before You Read'}
              </h1>
              <p className="text-muted-foreground">
                {lang === 'id' ? `Sebelum membaca "${article.title}", mari pahami konsep dasarnya.` : `Before diving into "${article.title}", let's understand the core concepts.`}
              </p>
            </div>
          </div>
          
          {learnContext ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-border/50 rounded-xl p-6 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-xl font-bold font-heading">{lang === 'id' ? 'Konsep Kunci' : 'Key Concepts'}</h3>
                </div>
                <ul className="space-y-4">
                  {learnContext.keyConcepts?.map((concept: any, index: number) => (
                    <li key={index} className="space-y-1">
                      <span className="font-semibold text-foreground underline decoration-emerald-500/50 underline-offset-4 cursor-help">{concept.term}</span>
                      <p className="text-sm text-muted-foreground">{concept.definition}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/50 rounded-xl p-6 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <h3 className="text-xl font-bold font-heading">{lang === 'id' ? 'Mengapa Ini Penting' : 'Why it Matters'}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <ReactMarkdown>{learnContext.whyItMatters}</ReactMarkdown>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 border border-border/50 rounded-xl text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
              <p>{lang === 'id' ? 'Mencocokkan dengan kurikulum...' : 'Generating AI context...'}</p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Link href={`/news/${article.id}?lang=${lang}`}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {lang === 'id' ? 'Saya Siap Membaca Berita' : "I'm Ready to Read"}
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <article className="space-y-8 animate-in fade-in duration-500">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={article.category === "Economy" ? "secondary" : "default"} className={article.category === "Economy" ? "bg-emerald-500/20 text-emerald-500" : "bg-blue-500/20 text-blue-500"}>
                {article.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {article.estimated_read_time} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.thumbnail_url && (
            <div className="w-full aspect-video relative rounded-xl overflow-hidden bg-muted">
              <Image 
                src={article.thumbnail_url} 
                alt={article.title} 
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-t border-border/50 mt-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="font-medium">{article.source}</div>
              <Separator orientation="vertical" className="h-4" />
              <div className="text-muted-foreground text-sm">
                {new Date(article.published_at).toLocaleDateString()}
              </div>
            </div>
            <SaveButton 
              item={{ id: article.id, title: article.title, type: "article", url: `/news/${article.id}` }} 
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none pb-8">
            <ReactMarkdown>{article.content || article.summary}</ReactMarkdown>
          </div>

          <SimplifySection originalText={article.content || article.summary || ""} />

          <NewsChat articleContext={{ title: article.title, summary: article.summary, content: article.content }} />
        </article>
      )}
    </div>
  );
}
