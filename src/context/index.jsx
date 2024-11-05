import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recepieDetailsData, setRecipeDetailsData] = useState(null);
  const [favouritesList, setFavouritesList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
      const data = await res.json();

      if (data?.data?.recipes) { // Corrected key from 'recepies' to 'recipes'
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchParam('');
        navigate('/');
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }


  };

  function handleAddToFavourites(getCurrentItem) {
    console.log(getCurrentItem)
    let cpy = [...favouritesList];
    const index = cpy.findIndex(i => i.id === getCurrentItem.id)
    if (index === -1) {
      cpy.push(getCurrentItem);
    } else {
      cpy.splice(index);
    }

    setFavouritesList(cpy);
  }

  return (
    <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit, loading, recipeList, recepieDetailsData, setRecipeDetailsData, handleAddToFavourites, favouritesList }}>
      {children}
    </GlobalContext.Provider>
  );
}
