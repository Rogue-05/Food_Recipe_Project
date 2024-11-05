import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const param = useParams();
  console.log("Params:", param); // Check if params are being captured correctly

  const { recepieDetailsData, setRecipeDetailsData, handleAddToFavourites, favouritesList } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true); // Start loading
        const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${param.id}`);
        const data = await resp.json();
        console.log("Fetched Data:", data); // Check API response structure

        if (data?.data) {
          setRecipeDetailsData(data.data);
        } else {
          setError("No recipe data found");
        }
      } catch (e) {
        console.log(e);
        setError("Failed to fetch recipe details");
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchRecipe();
  }, [param.id, setRecipeDetailsData]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if data is available
  if (!recepieDetailsData?.recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image Section */}
      <div className="h-96 overflow-hidden rounded-xl group">
        <img
          src={recepieDetailsData?.recipe?.image_url}
          className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          alt={recepieDetailsData?.recipe?.title}
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recepieDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recepieDetailsData?.recipe?.title}
        </h3>
        <div>
          <button
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inblock shadow-medium bg-black text-white"
            onClick={() => handleAddToFavourites(recepieDetailsData?.recipe)}
          >
            {
              favouritesList.findIndex((item) => item.id === recepieDetailsData?.recipe?.id) !== -1
                ? "Remove From favourites"
                : "Save To Favourites"
            }
          </button>

        </div>
        <div>
          <span className="text-2xl font-semibold text-black">Ingredients:</span>
          <ul className="flex flex-col gap-3">
            {recepieDetailsData?.recipe?.ingredients.map((i, index) => (
              <li key={index}>
                <span className="text-2xl font-semibold text-black">
                  {i.quantity} {i.unit}
                </span>
                <span className="text-2xl font-semibold text-black">{i.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
