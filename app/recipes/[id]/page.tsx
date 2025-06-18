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
        <div className="flex flex-row gap-5 py-20 px-40 bg-MainBackground">
            {/* <div key={recipeDetails.id} className="flex flex-col justify-between border p-5">
                <Image
                    src={recipeDetails.image}
                    alt={recipeDetails.name}
                    width={16}
                    height={16}
                />
                <h2>{recipeDetails.name}</h2>
                <p>{recipeDetails.cookingTime}</p>
            </div> */}
            <RecipeDetails recipe={recipeDetails} />
        </div>
    );
}