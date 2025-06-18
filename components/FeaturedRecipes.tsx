// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface RecipeFeature {
//     id: string;
//     name: string;
//     image: string;
// }

// interface SlideshowProps {
//     prev: RecipeFeature;
//     curr: RecipeFeature;
//     next: RecipeFeature;
// }

// export default function FeaturedRecipes(){
//     const featuredRecipes: RecipeFeature[] = [
//         { id: "5", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"},
//         { id: "6", name: "Roasted Butternut Squash Salad", image: "/images/feature/RoastedButternutSquashSalad.jpg"},
//         { id: "5", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"},
//         { id: "6", name: "Roasted Butternut Squash Salad", image: "/images/feature/RoastedButternutSquashSalad.jpg"},
//         { id: "5", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"}
//     ];
//     const [slideshow, setSlideshow] = useState<SlideshowProps>({
//         prev: featuredRecipes[(featuredRecipes.length - 1)],
//         curr: featuredRecipes[(featuredRecipes.length - featuredRecipes.length)],
//         next: featuredRecipes[(featuredRecipes.length - (featuredRecipes.length - 1))],
//     });
//     const [index, setIndex] = useState(0);
//     const [isMoving, setIsMoving] = useState(false);

//     useEffect(() => {
//         // change current index every 3 seconds
//         const interval = setInterval(() => {
//             setIsMoving(true);
//             setIndex((prevIndex) => (prevIndex + 1) % featuredRecipes.length);
//             setIsMoving(false);
//         }, 3000);

//         return () => clearInterval(interval); // clean up on unmount
//     }, [featuredRecipes.length]);

//     useEffect(() => {
//         // update the slideshow content
//         setSlideshow({
//             prev: featuredRecipes[(index - 1 + featuredRecipes.length) % featuredRecipes.length],
//             curr: featuredRecipes[index],
//             next: featuredRecipes[(index + 1) % featuredRecipes.length],
//         });
//     }, [index]);

//     return (
//         <div className="h-full aspect-square bg-black relative flex justify-center">
//             <div className="flex gap-20 h-full justify-center absolute">
//                 <div 
//                     className="h-5/6 aspect-square relative transition-transform duration-700 ease-in-out"
//                     style={{ transform: `${isMoving? 'translateX(-100%)' : 'translateX(0)'}` }}
//                 >
//                     <Image
//                         src={slideshow.prev.image}
//                         alt={slideshow.prev.name}
//                         fill
//                         className="object-cover"
//                     />
//                 </div>
//                 <div 
//                     className="h-5/6 aspect-square relative transition-transform duration-700 ease-in-out"
//                     style={{ transform: `${isMoving? 'translateX(-100%)' : 'translateX(0)'}` }}
//                 >
//                     <Image
//                         src={slideshow.curr.image}
//                         alt={slideshow.curr.name}
//                         fill
//                         className="object-cover"
//                     />
//                 </div>
//                 <div 
//                     className="h-5/6 aspect-square relative transition-transform duration-700 ease-in-out"
//                     style={{ transform: `${isMoving? 'translateX(-100%)' : 'translateX(0)'}` }}
//                 >
//                     <Image
//                         src={slideshow.next.image}
//                         alt={slideshow.next.name}
//                         fill
//                         className="object-cover"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

import Image from "next/image";
import { useEffect, useState } from "react";

interface RecipeFeature {
  id: string;
  name: string;
  image: string;
}

const featuredRecipes: RecipeFeature[] = [
    { id: "5", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"},
    { id: "6", name: "Roasted Butternut Squash Salad", image: "/images/feature/RoastedButternutSquashSalad.jpg"},
    { id: "7", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"},
    { id: "8", name: "Roasted Butternut Squash Salad", image: "/images/feature/RoastedButternutSquashSalad.jpg"},
    { id: "9", name: "Vegan Potstickers", image: "/images/feature/VeganPotstickers.jpg"}
];

export default function FeaturedRecipes() {
  const [recipeIndex, setRecipeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecipeIndex((prev) => (prev + 1) % featuredRecipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
        <div className="h-5/6 aspect-square overflow-hidden relative">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${recipeIndex * 100}%)` }}
            >
                {featuredRecipes.map((recipe) => (
                    <div key={recipe.id} className="h-full aspect-square flex-shrink-0 relative">
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 w-full text-center bg-black/50 text-white py-2 text-sm">
                            {recipe.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex gap-3 justify-center mt-5">
            {featuredRecipes.map((_, index) => (
                <div
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === recipeIndex ? 'bg-BlackText/60' : 'bg-BlackText/25'
                    }`}
                />
            ))}
        </div>
    </div>
  );
}