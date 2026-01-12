import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/entities/article";
import { encodeArticleId } from "@/entities/article";
import { formatDate, cn, normalizeImageUrl } from "@/shared/lib";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const id = encodeArticleId(article.url);

  return (
    <Link
      href={`/articles/${id}`}
      className={cn(
        "group grid grid-rows-[240px_1fr] overflow-hidden rounded-[5px] bg-white",
        "hover:shadow-xl",
        "text-[var(--text-info)] transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        {article.urlToImage ? (
          <Image
            src={normalizeImageUrl(article.urlToImage)}
            alt={article.title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--accent)]">
            <span className="text-[150px]">📰</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-[20px] mt-[20px] mb-[25px] grid grid-rows-[auto_1fr_auto] gap-[15px]">
        {/* Date */}
        <span className="text-xs">{formatDate(article.publishedAt)}</span>

        {/* Title + Description */}
        <div className="grid gap-2">
          <h2 className="line-clamp-3 text-lg leading-snug font-bold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]">
            {article.title}
          </h2>
          {article.description && (
            <p className="line-clamp-3 text-xs leading-relaxed">
              {article.description}
            </p>
          )}
        </div>
        {/* Author footer */}
        <div className="grid gap-0.5 border-t border-gray-100 pt-6">
          <span className="truncate text-xs leading-relaxed font-bold text-[var(--text)]">
            By {article.author ?? article.source.name}
          </span>
          <span className="text-xs">{article.source.name}</span>
        </div>
      </div>
    </Link>
  );
}
