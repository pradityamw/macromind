import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LineChart, PieChart, TrendingUp, DollarSign, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getModules } from "@/actions/learn";

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "LineChart":
      return <LineChart className="h-8 w-8 text-blue-500 mb-2" />;
    case "PieChart":
      return <PieChart className="h-8 w-8 text-emerald-500 mb-2" />;
    case "DollarSign":
      return <DollarSign className="h-8 w-8 text-purple-500 mb-2" />;
    case "TrendingUp":
      return <TrendingUp className="h-8 w-8 text-amber-500 mb-2" />;
    default:
      return <Layout className="h-8 w-8 text-gray-500 mb-2" />;
  }
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams?.lang === "id" ? "id" : "en";
  const modules = await getModules(lang);

  return (
    <div className="flex-1 space-y-6 px-4 md:px-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">
            {lang === 'id' ? 'Modul Pembelajaran' : 'Learn Modules'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {lang === 'id' ? 'Kuasai fundamental Makro dan Mikro ekonomi untuk trading yang lebih baik.' : 'Master the fundamentals of Macro and Micro economics to trade better.'}
          </p>
        </div>
      </div>
      
      {modules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {lang === 'id' ? 'Belum ada modul tersedia.' : 'No modules available yet.'}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {modules.map((mod) => (
            <Card key={mod.id} className="hover:border-primary/50 transition-colors flex flex-col">
              <CardHeader>
                {getIconComponent(mod.icon)}
                <CardTitle className="text-2xl font-heading">{mod.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {mod.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {mod.level}
                  </span>
                  <span>•</span>
                  <span>{mod.duration}</span>
                </div>
                <Link href={`/learn/${mod.id}?lang=${lang}`}>
                  <Button className="w-full">
                    {lang === 'id' ? 'Mulai Modul' : 'Start Module'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
