import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/entities/article/model";
import { encodeArticleId } from "@/entities/article/model";
import { formatDate, cn, normalizeImageUrl } from "@/shared/lib";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const id = encodeArticleId(article.id);

  return (
    <Link
      href={`/articles/${id}`}
      className={cn(
        "group grid grid-rows-[240px_1fr] overflow-hidden rounded-[5px] bg-white",
        "text-[var(--text-info)] transition-all duration-300 hover:shadow-xl"
      )}
    >
      <div className="relative w-full overflow-hidden">
        {article.fields.thumbnail ? (
          <Image
            src={normalizeImageUrl(article.fields.thumbnail)}
            alt={article.webTitle}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--accent)]">
            <span className="text-4xl">📰</span>
          </div>
        )}
      </div>

      <div className="mx-[20px] mt-[20px] mb-[25px] grid grid-rows-[auto_1fr_auto] gap-[15px]">
        <time className="text-xs" dateTime={article.webPublicationDate}>
          {formatDate(article.webPublicationDate)}
        </time>

        <div className="grid gap-2">
          <h2 className="line-clamp-3 text-lg leading-snug font-bold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)]">
            {article.fields.headline ?? article.webTitle}
          </h2>
          {article.fields.trailText && (
            <p
              className="line-clamp-3 text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.fields.trailText }}
            />
          )}
        </div>

        <div className="grid gap-0.5 border-t border-gray-100 pt-6">
          <span className="truncate text-xs leading-relaxed font-bold text-[var(--text)]">
            By {article.fields.byline ?? article.sectionName}
          </span>
          <span className="text-xs">{article.sectionName}</span>
        </div>
      </div>
    </Link>
  );
};
