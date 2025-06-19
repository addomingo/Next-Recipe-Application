"use client"
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Recipe from "@/types/recipe";
import { CircleX, Search } from "lucide-react";
import Spinner from "./Spinner";
import Filter from "./Filter";

export default function RecipeGridView() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");
    
    const [loading, setLoading] = useState(true);

    // filters
    const [servings, setServings] = useState<number | "">("");
    const [cookingTime, setCookingTime] = useState<number | "">("");

    useEffect(() => {
        handleFiltering();
        // since we this function is just reused and should run once on page mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleFiltering();
        // since we this function is just reused
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    

    const handleFiltering = async() => {
        setLoading(true);
        try {
            const response = await fetch(`/api/recipes?search=${search}&cookingTime=${cookingTime}&servings=${servings}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch recipes`);
            }
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            console.error("Error fetching recipes:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="h-screen flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-BlackText font-bold text-3xl sm:text-4xl">Have something in mind?</h2>
                <div className="flex gap-2">
                    {/* search bar */}
                    <div className="flex items-center gap-2 px-2 py-1 border-2 border-BlackText/25 rounded-lg">
                        <Search size={20} className="text-gray-500"/>
                        <input 
                            type="text"
                            placeholder="Search for a recipe"
                            value={search}
                            onChange={(e) => (setSearch(e.target.value))}
                            className="focus:outline-none"
                        />
                        <button onClick={() => (setSearch(""))}><CircleX size={18} className="text-gray-500 hover:text-BlackText"/></button>
                    </div>
                    {/* filter button and popup */}
                    <Filter 
                        servings={servings} 
                        setServings={setServings}
                        cookingTime={cookingTime}
                        setCookingTime={setCookingTime}
                        filterFunction={handleFiltering}
                    />
                </div>
            </div>
            <div className="flex-grow">
                { loading &&
                    <div className="pt-10">
                        <Spinner />
                    </div>
                }
                <div className="flex flex-row items-stretch justify-center gap-5 pt-10 pb-20 px-20 flex-wrap">
                    { recipes.length === 0 ? 
                        <h1>No recipes found.</h1>
                        :
                        recipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}