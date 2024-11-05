import { GlobalContext } from "../../context";
import RecipeItem from "../../components/RecipeItem";
import { useContext } from "react";

export default function Favourites(){
  const { favouritesList } = useContext(GlobalContext);

  console.log("Recipe List in home:", favouritesList); // Log the recipe list


  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {Array.isArray(favouritesList) && favouritesList.length > 0 ? (
       favouritesList.map((item,index) => {
          console.log("Recipe Item:", item); // Log each recipe item
          return <RecipeItem item={item} key={index}/>; // No key used here
        })
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added.
          </p>
        </div>
      )}
    </div>
  );
}