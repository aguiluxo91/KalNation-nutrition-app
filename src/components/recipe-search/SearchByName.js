import { useEffect, useState } from "react";
import http from '../../services/recipes-services';
import Recipe from '../recipe/Recipe';
import ReactPaginate from "react-paginate";

function SearchByName({ minSearchChars }) {

    const [state, setState] = useState({
        recipes: [],
        totalResults: 0
    })

    const [search, setSearch] = useState({
        name: '',
        ingredients: ''
    })

    const [offset, setOffset] = useState(0)


    useEffect(() => {
        const { name, ingredients } = search;
        ingredients.split(' ').join(',')
        async function fetchRecipes() {
            const recipes = await http.get(`/recipes/complexSearch?query=${name}&includeIngredients=${ingredients}&number=10&offset=${offset}&apiKey=${process.env.REACT_APP_API_KEY}`)
            console.log(recipes)
            setState({
                recipes: recipes.results,
                totalResults: recipes.totalResults
            })
        }

        if (name.length || ingredients.length >= minSearchChars) fetchRecipes()

    }, [search, minSearchChars, offset])

    const handleChange = (event) => {
        const { value, name } = event.target;
        setSearch((search) => {
            return {
                ...search,
                [name]: value
            }
        });
    }

    const handlePageClick = (data) => {
        setOffset(data.selected * 10)
    }

    const { recipes, totalResults } = state;
    return (
        <>
            <div className="mt-1 relative rounded-md shadow-sm w-1/2">
                <input
                    value={search.name}
                    name="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-500 rounded-md my-2"
                    placeholder="Search by Name"
                    onChange={handleChange}
                />
                <input
                    value={search.ingredients}
                    name="ingredients"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-500 rounded-md my-2"
                    placeholder="Search by ingredients"
                    onChange={handleChange}
                />
            </div>
            {recipes.map((recipe, i) => <Recipe key={i} recipe={recipe} />)}
            {recipes.length > 0 && 
                <ReactPaginate
                    pageCount={Math.ceil(totalResults / 10)}
                    containerClassName={'bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 w-full'}
                    pageClassName={'flex-1 justify-around mx-1 hidden sm:flex'}
                    pageLinkClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'}
                    previousClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'}
                    nextClassName={'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'}
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                />}
        </>
    );

}

SearchByName.defaultProps = {
    minSearchChars: 3
}

export default SearchByName;