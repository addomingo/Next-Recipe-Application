"use client"

import { useEffect, useState } from "react";
import Recipe from "@/types/recipe";
import { useParams, notFound} from "next/navigation";
import RecipeDetails from "@/components/RecipeDetail";
import Spinner from "@/components/Spinner";

export default function RecipeDetailPage() {
    const params = useParams();
    const { id } = params; // obtain the ID string from the route
    const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/recipes?id=${id}`);
                const data = await response.json();

                if (data.length === 0) {
                    return;
                }

                setRecipeDetails(data[0]);
            } catch (err) {
                console.error("Failed to fetch recipe:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!recipeDetails) {
        return notFound();
    }

    return (
        <div className="flex flex-row gap-5 py-20 px-10 sm:px-20 md:px-40 bg-MainBackground">
            <RecipeDetails recipe={recipeDetails} />
        </div>
    );
}