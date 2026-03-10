import { CATEGORIES } from "@/entities/article";
import { CategoryCard } from "@/entities/article";
import { CategoryCardLink } from "@/widgets/category-card-link";

export const CategoriesList = () => {
  return (
    <div className="grid grid-cols-2 gap-[36px] sm:grid-cols-3 lg:grid-cols-3">
      {CATEGORIES.map(({ id, label, image }) => (
        <CategoryCardLink key={id} id={id}>
          <CategoryCard key={id} label={label} image={image} />
        </CategoryCardLink>
      ))}
    </div>
  );
};
