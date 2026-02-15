import { CATEGORIES } from "@/shared/config";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardLink } from "./CategoryCardLink";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-[36px] sm:grid-cols-3 lg:grid-cols-3">
      {CATEGORIES.map(({ id, label, image }) => (
        <CategoryCardLink key={id} id={id}>
          <CategoryCard key={id} label={label} image={image} />
        </CategoryCardLink>
      ))}
    </div>
  );
}
