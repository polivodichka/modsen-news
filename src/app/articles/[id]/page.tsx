import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleById } from "@/entities/article";
import { formatDate, normalizeImageUrl } from "@/shared/lib";
import { BackButton, Skeleton } from "@/shared/ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) return { title: "Article not found — Modsen News" };

  return {
    title: `${article.fields.headline ?? article.webTitle} — Modsen News`,
    description: article.fields.trailText ?? undefined,
  };
}

async function ArticleContent({ id }: { id: string }) {
  const article = await getArticleById(id);

  if (!article) notFound();

  return (
    <div className="grid grid-cols-[165px_1fr] items-start gap-[40px]">
      {/* Back */}
      <BackButton />
      <article className="mt-[65px] grid gap-[24px]">
        {/* Date */}
        <p className="text-sm font-bold">
          {formatDate(article.webPublicationDate)}
        </p>
        {/* Author */}
        <p className="text-sm">
          <span className="font-bold text-[var(--text)]">Author</span>
          <span className="text-[var(--text-info)]">
            {" "}
            - {article.fields.byline ?? article.sectionName}
          </span>
        </p>
        {/* Content */}
        {article.fields.bodyText && (
          <p className="max-w-[860px] text-[14px] leading-[25px] font-normal text-[var(--text-info)]">
            {article.fields.bodyText}
          </p>
        )}
        {/* Image */}
        {article.fields.thumbnail && (
          <div className="relative h-[300px] w-[420px] overflow-hidden rounded-[5px]">
            <Image
              src={normalizeImageUrl(article.fields.thumbnail)}
              alt={article.fields.headline ?? article.webTitle}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </article>
    </div>
  );
}

function ArticleContentFallback() {
  return (
    <div className="grid gap-[40px]">
      <Skeleton className="h-6 w-20" />
      <div className="grid max-w-3xl gap-[24px]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-40" />
        <div className="grid gap-[16px]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-[240px] w-[340px] rounded-[5px]" />
      </div>
    </div>
  );
}

async function ArticleContentWrapper({ params }: PageProps) {
  const { id } = await params;
  return <ArticleContent id={id} />;
}

export default function ArticlePage({ params }: PageProps) {
  return (
    <Suspense fallback={<ArticleContentFallback />}>
      <ArticleContentWrapper params={params} />
    </Suspense>
  );
}
