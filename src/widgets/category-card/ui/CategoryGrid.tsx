import { CATEGORIES } from "@/shared/config";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-[36px] sm:grid-cols-3 lg:grid-cols-3">
      {CATEGORIES.map(({ id, label, image }) => (
        <CategoryCard key={id} id={id} label={label} image={image} />
      ))}
    </div>
  );
}
