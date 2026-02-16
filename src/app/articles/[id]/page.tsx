import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleById } from "@/entities/article/api";
import { formatDate, normalizeImageUrl } from "@/shared/lib";
import { BackButton, Skeleton } from "@/shared/ui";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: "Article not found" };
  return {
    title: article.fields.headline ?? article.webTitle,
    description: article.fields.trailText ?? undefined,
  };
};

const Article = async ({ id }: { id: string }) => {
  const article = await getArticleById(id);

  if (!article) notFound();

  return (
    <div className="grid grid-cols-[165px_1fr] items-start gap-[40px]">
      <BackButton />
      <article className="mt-[65px] grid gap-[24px]">
        <time
          dateTime={article.webPublicationDate}
          className="text-sm font-bold"
        >
          {formatDate(article.webPublicationDate)}
        </time>
        <p className="text-sm">
          <span className="font-bold text-[var(--text)]">Author</span>-{" "}
          {article.fields.byline ?? article.sectionName}
        </p>
        {article.fields.bodyText && (
          <p className="max-w-[860px] text-[14px] leading-[25px] font-normal text-[var(--text-info)]">
            {article.fields.bodyText}
          </p>
        )}
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
};

const ArticleFallback = () => {
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
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  return (
    <Suspense fallback={<ArticleFallback />}>
      <Article id={id} />
    </Suspense>
  );
};

export default ArticlePage;
