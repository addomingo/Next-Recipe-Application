import Recipe from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {

  return (
    <Link href={"/recipes/" + recipe.id}>
        <Image
            src={recipe.image}
            alt={recipe.name}
            width={16}
            height={16}
        />
        <h4>{recipe.name.toUpperCase()}</h4>
    </Link>
  );
}