
import { Link } from 'react-router-dom';

function Recipe({ recipe }) {
    return (

        <Link to={`/recipes/${recipe.id}`}>
            <div className='bg-white rounded-2xl shadow-lg text-xl'>
                <img src={recipe.image} alt={recipe.title} className='w-full'/>
                <div>
                    <h1 className='font-bold p-3'>{recipe.title}</h1>
                </div>
            </div>
        </Link>
    );
}

export default Recipe;

