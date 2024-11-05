import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/RecipeItem";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  console.log("Recipe List in home:", recipeList); // Log the recipe list

  if (loading) return <div>Loading...</div>; // This should show when loading is true

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {Array.isArray(recipeList) && recipeList.length > 0 ? (
        recipeList.map((item,index) => {
          console.log("Recipe Item:", item); // Log each recipe item
          return <RecipeItem item={item} key={index}/>; // No key used here
        })
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show, please search for something.
          </p>
        </div>
      )}
    </div>
  );
}
