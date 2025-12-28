import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/entities/article";
import { encodeArticleId } from "@/entities/article";
import { formatDate } from "@/shared/lib";
import { cn } from "@/shared/lib";
import { normalizeImageUrl } from "@/shared/lib/normalize-image-url";

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
        "group flex flex-col bg-[var(--card-bg)] rounded-xl overflow-hidden",
        "border border-[var(--muted)] hover:border-[var(--accent)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-[var(--muted)]">
        {article.urlToImage ? (
          <Image
            src={normalizeImageUrl(article.urlToImage)}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[var(--muted)] text-4xl">📰</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Source */}
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          {article.source.name}
        </span>

        {/* Title */}
        <h2 className="text-base font-bold leading-snug line-clamp-3 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-gray-400 line-clamp-2 flex-1">
            {article.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--muted)] text-xs text-gray-500">
          <span className="truncate max-w-[60%]">
            {article.author ?? article.source.name}
          </span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}