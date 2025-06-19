import Recipe from '@/types/recipe';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
    // obtain the query parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const cookingTime = searchParams.get("cookingTime");
    const servings = searchParams.get("servings");

    // obtain the path relative to package.json
    const filePath = path.join(process.cwd(), 'data', 'recipes.json');
    // read the contents of recipes.json
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data: Recipe[] = JSON.parse(fileContents);

    let filteredRecipes = data;

    // filter by ID
    if (id) filteredRecipes = filteredRecipes.filter(recipe => (id === recipe.id));

    // filter by name
    if (search) filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));

    // filter by cooking time (less than or equal)
    if (cookingTime) {
        const maxTime = Number(cookingTime);
        if (!isNaN(maxTime)) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                const extractedTime = recipe.cookingTime.match(/\d+/);
                const recipeTime = extractedTime ? Number(extractedTime[0]) : 0;
                return recipeTime <= maxTime;
            });
        }
    }

    // Filter by servings (exact match)
    if (servings) {
        const requiredServings = Number(servings);
        if (!isNaN(requiredServings)) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.servings === requiredServings);
        }
    }

    // return the data
    return Response.json(filteredRecipes);
}