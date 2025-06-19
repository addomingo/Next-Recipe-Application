"use client"

import { useEffect, useState } from "react";
import Recipe from "@/types/recipe";
import { useParams} from "next/navigation";
import Image from "next/image";
import RecipeDetails from "@/components/RecipeDetail";

export default function RecipeDetailPage() {
    const params = useParams();
    const { id } = params; // obtain the ID string from the route
    const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);

    useEffect(() => {
        fetch(`/api/recipes?id=${id}`)
        .then(res => res.json())
        .then(data => setRecipeDetails(data[0]));
    }, []);

    if (!recipeDetails) {
        return <p className="p-20">Loading recipe...</p>; // or a spinner
    }

    return (
        <div className="flex flex-row gap-5 py-20 px-10 sm:px-20 md:px-40 bg-MainBackground">
            <RecipeDetails recipe={recipeDetails} />
        </div>
    );
}