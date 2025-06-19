import { CircleX, SlidersHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface FilterProps {
    servings: number | "";
    setServings: Dispatch<SetStateAction<number | "">>;
    cookingTime: number | "";
    setCookingTime: Dispatch<SetStateAction<number | "">>;
    filterFunction: () => void;
}

export default function Filter({ servings, setServings, cookingTime, setCookingTime, filterFunction } : FilterProps) {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    return (
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
                    <h4 className="text-xs text-BlackText font-semibold mb-1">Maximum Cooking Time (minutes)</h4>
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
                                filterFunction();
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}