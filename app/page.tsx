import FeaturedRecipes from "@/components/FeaturedRecipes";
import RecipeGridView from "@/components/RecipeGridView";

async function getRecipes() {

}

export default function Home() {
  
  return (
    <div className="bg-MainBackground flex flex-col gap-5">
      <section className="h-screen flex flex-col items-center p-20">
        <h1 className="text-BlackText font-extrabold text-7xl">recipes</h1>
        <h3 className="text-BlackText font-bold text-lg">what would you like to cook today?</h3>
        <FeaturedRecipes />
      </section>
      <RecipeGridView />
  </div>
  );
}
