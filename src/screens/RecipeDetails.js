import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../services/recipes-services";


function RecipeDetails() {

    const [state, setState] = useState({
        recipe: {}
    })

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRecipe() {
            const { id } = params;
            try {
                const recipe = await http.get(`/recipes/${id}/card?apiKey=${process.env.REACT_APP_API_KEY}`)
                if (!isUnmounted) setState({ recipe })
            } catch {
                navigate('/recipes')
            }
        }
        let isUnmounted = false;

        fetchRecipe()

        return () => isUnmounted = true;

    }, [params])

    const { recipe } = state;

    return (
        <>
            <h1 className="font-bold text-2xl my-3">Recipe details:</h1>
            <img src={recipe.url} alt="recipe" className="shadow-lg p-2 mb-4 w-full"/>
        </>
    );
}

export default RecipeDetails;