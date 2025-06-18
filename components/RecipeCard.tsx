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
        className="group w-64 relative flex flex-col items-center transition-transform duration-300 hover:scale-110"
    >
        <Image
            src={recipe.image}
            alt={recipe.name}
            width={192}
            height={192}
            className="rounded-full absolute transition-transform duration-500 group-hover:animate-spinSlow"
        />
        <div className="h-24"></div>
        <div className="w-full pt-24 px-5 border-2 border-BlackText/25 rounded-lg">
            <h4 className="pt-5">{recipe.name.toUpperCase()}</h4>
        </div>
    </Link>
  );
}