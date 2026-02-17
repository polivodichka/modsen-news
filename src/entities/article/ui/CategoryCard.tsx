import { cn } from "@/shared/lib";
import Image from "next/image";

type CategoryCardProps = {
  label: string;
  image: string;
};

export const CategoryCard = ({ label, image }: CategoryCardProps) => {
  return (
    <div
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden rounded-[20px]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_10px_10px_rgba(0,0,0,0.25)]"
      )}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-inline-size: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute right-0 bottom-0 left-0 p-4">
        <h3 className="text-4xl font-bold text-white">{label}</h3>
      </div>
    </div>
  );
};
