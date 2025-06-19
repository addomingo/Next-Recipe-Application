"use client"
import Recipe from "@/types/recipe";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
    const router = useRouter();

  return (
    <div className="w-full">
        <section className="w-full relative flex flex-col items-start">
            <div className="h-[30rem] sm:h-[32rem] lg:h-[10rem] xl:h-[15rem] relative z-40">
                <button type="button" className="font-semibold text-lg" onClick={() => router.back()}>
                    ← GO BACK
                </button>
            </div>
            <h1 className="lg:max-w-[40%] xl:max-w-[50%] text-BlackText font-extrabold text-5xl md:text-6xl relative z-40">{recipe.name}</h1>
            <div className="absolute self-center top-10 sm:top-0 lg:right-0">
                <div className="h-[25rem] sm:h-[30rem] xl:h-[35rem] aspect-square relative">
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
            </div>
        </section>

        <section className="mt-8">
            <RecipeInformation servings={recipe.servings} cookingTime={recipe.cookingTime} />
            <div className="flex flex-col lg:flex-row mt-5 gap-10 relative z-99">
                <div className="flex flex-col gap-1 lg:max-w-[50%] xl:max-w-[30%]">
                    <h3 className="text-lg font-semibold">Ingredients</h3>
                    <ul className="list-disc pl-6">
                        { recipe.ingredients.map((ingredient, index) => 
                            <li key={index}>{ingredient}</li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-1 lg:max-w-[50%] xl:max-w-[70%]">
                    <h3 className="text-lg font-semibold">Instructions</h3>
                    { recipe.instructions.map((instruction, index) => 
                        <div key={index} className="flex gap-3 items-start bg-white/80 backdrop-blur-sm rounded p-3 shadow-md">
                            <div className="w-4 h-4 rounded-full flex-shrink-0 bg-black text-xs text-white flex items-center justify-center mt-1">{index + 1}</div>
                            <h4>{instruction}</h4>
                        </div>
                    )}
                </div>
            </div>
        </section>
    </div>
  );
}

interface RecipeInformationProps {
    servings: number;
    cookingTime: string;
}

function RecipeInformation({ servings, cookingTime }: RecipeInformationProps) {
    return (
        <div className="flex lg:max-w-[50%]">
            <div className="bg-BlackText/20 py-3 px-5 text-xl">Recipe <br /> Information</div>
            <div className="bg-BlackText/10 flex flex-grow justify-evenly items-center">
                <div className="flex flex-col items-center">
                    <h4 className="text-xl font-bold leading-none">{servings}</h4>
                    <h5>Servings</h5>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="text-xl font-bold leading-none">{cookingTime}</h4>
                    <h5>Cooking Time</h5>
                </div>
            </div>
        </div>
    );
}