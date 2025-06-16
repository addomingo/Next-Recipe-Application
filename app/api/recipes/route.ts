import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    // obtain the path relative to package.json
    const filePath = path.join(process.cwd(), 'data', 'recipes.json');
    // read the contents of recipes.json
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // return the data
    return Response.json(data)
}