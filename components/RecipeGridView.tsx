"use client"
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Recipe from "@/types/recipe";
import { CircleX, Search, SlidersHorizontal, X } from "lucide-react";
import Spinner from "./Spinner";

export default function RecipeGridView() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    // filters
    const [servings, setServings] = useState<number | "">("");
    const [cookingTime, setCookingTime] = useState<number | "">("");

    useEffect(() => {
        fetch("/api/recipes")
        .then(res => res.json())
        .then(data => setRecipes(data));
    }, []);

    useEffect(() => {
        handleFiltering();
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
                    </div>
                    {/* filter button and popup */}
                    <div className="relative">
                        <button 
                            className="flex gap-2 items-center bg-BlackText px-2 py-1 rounded-lg text-white font-medium"
                            onClick={() => setFilterVisible((prev) => !prev)}
                        >
                            <SlidersHorizontal size={18} />
                            Filter
                        </button>
                        {filterVisible && (
                            <div className="absolute top-full right-0 md:left-0 mt-2 w-64 bg-white border-2 border-BlackText/25 rounded-lg shadow-lg z-50 p-4">
                                <X className="text-BlackText place-self-end cursor-pointer" size={18} onClick={() => setFilterVisible(false)}/>
                                {/* cooking time */}
                                <h4 className="text-xs text-BlackText font-semibold mb-1">Maximum Cooking Time</h4>
                                <div className="flex gap-2 border border-BlackText/25 px-2 py-1 rounded-lg justify-between items-center">
                                    <input 
                                        type="number" 
                                        value={cookingTime}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setCookingTime(val === "" ? "" : Number(val));
                                        }}
                                        placeholder="e.g. 30"
                                        className="mr-2 focus:outline-none w-24 flex-grow"
                                    />
                                    <button onClick={() => (setCookingTime(""))}><CircleX size={18} className="text-gray-500 hover:text-BlackText"/></button>
                                </div>
                                {/* servings */}
                                <h4 className="text-xs text-BlackText font-semibold mt-3 mb-1">No. of Servings</h4>
                                <div className="flex gap-2 border border-BlackText/25 px-2 py-1 rounded-lg justify-between items-center">
                                    <input 
                                        type="number" 
                                        value={servings}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setServings(val === "" ? "" : Number(val));
                                        }}
                                        placeholder="e.g. 2"
                                        className="mr-2 focus:outline-none w-24 flex-grow"
                                    />
                                    <button onClick={() => (setServings(""))}><CircleX size={18} className="text-gray-500 hover:text-BlackText"/></button>
                                </div>
                                {/* clear filters and apply filters buttons */}
                                <div className="mt-3 flex gap-2 justify-end">
                                    <button className="bg-white text-sm px-3 py-1 rounded-lg border border-BlackText text-BlackText font-medium" 
                                        onClick={() => {
                                            setCookingTime("");
                                            setServings("");
                                        }}
                                    >
                                        Clear
                                    </button>
                                    <button className="bg-BlackText text-sm px-3 py-1 rounded-lg text-white font-medium" 
                                        onClick={() => {
                                            setFilterVisible(false);
                                            handleFiltering();
                                        }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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