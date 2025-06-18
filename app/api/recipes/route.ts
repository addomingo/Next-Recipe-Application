import Recipe from '@/types/recipe';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
    // obtain the query parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const search = searchParams.get("search");

    // obtain the path relative to package.json
    const filePath = path.join(process.cwd(), 'data', 'recipes.json');
    // read the contents of recipes.json
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data: Recipe[] = JSON.parse(fileContents);

    /* 
        First checks if there is an ID parameter, and returns the recipe corresponding to that id.
        If there is no ID parameter, it checks if there is a search parameter, and returns the recipe/s that includes the search string.
        If there are no parameters provided, it simply returns all the data.
    */
    const filteredRecipes = id 
        ? data.filter(recipe => (id === recipe.id))
        : search
            ? data.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
            : data;

    // return the data
    return Response.json(filteredRecipes);
}