import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="w-64 flex flex-col justify-center items-center overflow-hidden rounded-lg border border-gray-200 shadow-lg p-4 bg-white">
      <img 
        src={item?.image_url || 'fallback-image-url.jpg'} 
        alt="Recipe item" 
        className="block w-full h-40 object-cover rounded-md mb-3" 
      />
      <div className="text-center">
        <span className="text-sm text-gray-500 font-medium">{item?.publisher}</span>
        <h3 className="font-bold text-lg mt-2 mb-4 text-black">{item?.title}</h3>
        <Link 
          to={`/recipe-item/${item.id}`}
          className="text-sm py-2 px-4 rounded bg-black text-white uppercase font-semibold tracking-wide inline-block"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
