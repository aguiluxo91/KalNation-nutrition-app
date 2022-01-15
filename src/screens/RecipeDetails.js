import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../services/recipes-services";


function RecipeDetails() {

    const [state, setState] = useState({
        recipe: {}
    })

    const params = useParams();

    useEffect(() => {

        async function fetchRecipe() {
            const { id } = params;
            const recipe = await http.get(`/recipes/${id}/card?apiKey=${process.env.REACT_APP_API_KEY}`)
            if (!isUnmounted) setState({ recipe })
        }
        let isUnmounted = false;

        fetchRecipe()

        return () => isUnmounted = true;

    }, [params])

    const { recipe } = state;

    return (
        <>
            <h1 className="font-bold text-2xl my-3">Recipe details:</h1>
            <img src={recipe.url} alt="recipe" className="shadow-lg p-2 mb-4"/>
        </>
    );
}

export default RecipeDetails;