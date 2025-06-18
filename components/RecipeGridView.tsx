"use client"
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Recipe from "@/types/recipe";

export default function RecipeGridView() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetch("/api/recipes")
        .then(res => res.json())
        .then(data => setRecipes(data));
    }, []);

    useEffect(() => {
        fetch(`/api/recipes?search=${search}`)
        .then(res => res.json())
        .then(data => setRecipes(data));
    }, [search]);

    return (
        <section className="h-screen flex flex-col items-center">
            <div className="flex flex-col gap-3">
                <h2 className="text-BlackText font-bold text-4xl">Have something in mind?</h2>
                <input 
                    type="text"
                    placeholder="Search for a recipe"
                    value={search}
                    onChange={(e) => (setSearch(e.target.value))}
                    className="px-2 py-1 border-2 border-BlackText/25 rounded-lg focus:outline-none"
                />
            </div>
            <div className="flex flex-row items-stretch justify-center gap-5 p-20 flex-wrap">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>
        </section>
    );
}