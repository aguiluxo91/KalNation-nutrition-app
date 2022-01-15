
import { Link } from 'react-router-dom';

function Recipe({ recipe }) {
    return (
        <div className="bg-white w-1/2 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none my-3 items-center">
            <div className="h-52 sm:h-full sm:w-60 rounded-xl bg-gray-200">
                <img src={recipe.image} alt={recipe.title} className="h-full rounded-2xl"/>
            </div>
            <div className="flex flex-col flex-1 sm:p-2">
                <div className="flex flex-1 flex-col gap-3">
                    <div className="bg-gray-200 w-full sm:h-full h-14 rounded-2xl flex items-center text-center justify-center">
                        <Link to={`/recipes/${recipe.id}`}><h1 className="font-bold p-1">{recipe.title}</h1></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recipe;