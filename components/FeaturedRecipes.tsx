"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RecipeFeature {
  id: string;
  name: string;
  image: string;
}

const featuredRecipes: RecipeFeature[] = [
    { id: "1", name: "Spaghetti Carbonara", image: "/images/feature/SpaghettiCarbonara.jpg"},
    { id: "2", name: "Chicken Teriyaki", image: "/images/feature/ChickenTeriyaki.jpg"},
    { id: "7", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"},
    { id: "8", name: "Roasted Butternut Squash Salad", image: "/images/feature/RoastedButternutSquashSalad.jpg"},
    { id: "9", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"}
];

export default function FeaturedRecipes() {
  const [recipeIndex, setRecipeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecipeIndex((prev) => (prev + 1) % featuredRecipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
        <div className="h-5/6 aspect-square overflow-hidden relative">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${recipeIndex * 100}%)` }}
            >
                {featuredRecipes.map((recipe) => (
                    <Link href={"/recipes/" + recipe.id} key={recipe.id} className="h-full aspect-square flex-shrink-0 relative">
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 w-full text-center bg-black/50 text-white py-2 text-sm">
                            {recipe.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        <div className="flex gap-3 justify-center mt-5">
            {featuredRecipes.map((_, index) => (
                <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === recipeIndex ? 'bg-BlackText/60' : 'bg-BlackText/25'
                    }`}
                    onClick={() => setRecipeIndex(index)}
                />
            ))}
        </div>
    </div>
  );
}