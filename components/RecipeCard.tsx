import Recipe from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={"/recipes/" + recipe.id}
      className="group w-64 flex flex-col justify-start items-center transition-transform duration-300 hover:scale-110"
    >
      <div className="relative w-48 h-48 -mb-20 z-10">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="rounded-full object-cover transition-transform duration-500 group-hover:animate-spinSlow"
        />
      </div>
      
      <div className="flex flex-col justify-between flex-grow w-full pt-24 pb-5 px-5 border-2 border-BlackText/25 rounded-lg bg-white">
        <h4 className="font-bold text-lg text-center leading-none">{recipe.name}</h4>
        <h6 className="text-xs text-center text-BlackText my-2 line-clamp-4">
          {recipe.instructions.join(" ")}
        </h6>
        <h5 className="text-md text-center">{recipe.servings} servings | {recipe.cookingTime}</h5>
      </div>
    </Link>
  );
}
