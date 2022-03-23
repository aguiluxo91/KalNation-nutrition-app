import { useEffect, useState } from "react";
import http from '../../services/recipes-services';
import Recipe from '../recipe/Recipe';
import ReactPaginate from "react-paginate";
import recipesJson from '../../data/recipes.json'

function SearchByName({ minSearchChars }) {

    const [state, setState] = useState({
        recipes: recipesJson,
        totalResults: 0
    })

    const [search, setSearch] = useState({
        name: '',
        ingredients: ''
    })

    const [offset, setOffset] = useState(0)

    const { name, ingredients } = search;

    useEffect(() => {
        if (offset > 0) {
            fetchRecipes()
        }
    }, [offset, fetchRecipes])

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

    
    ingredients.split(' ').join(',')
    async function fetchRecipes() {
        const recipes = await http.get(`/recipes/complexSearch?query=${name}&includeIngredients=${ingredients}&number=10&offset=${offset}&apiKey=${process.env.REACT_APP_API_KEY}`)
        console.log(recipes)
        setState({
            recipes: recipes.results,
            totalResults: recipes.totalResults
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRecipes()
    }

    const { recipes, totalResults } = state;
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-1 relative w-1/4 rounded border-solid border-2 p-2">
                <input
                    value={search.name}
                    name="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-100 pl-3 pr-12 sm:text-sm border-gray-500 rounded-md my-3 shadow-md"
                    placeholder="Search by Name"
                    onChange={handleChange}
                />
                <input
                    value={search.ingredients}
                    name="ingredients"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-100 pl-3 pr-12 sm:text-sm border-gray-500 rounded-md my-3 shadow-md"
                    placeholder="Search by ingredients"
                    onChange={handleChange}
                />
                <button type="submit" className="mt-3 ml-3 rounded-full bg-green-500 hover:bg-green-600 hover:shadow-md px-3 text-white">Search</button>
            </form>
            {recipes.length > 0 &&
                <h1 className="font-bold my-7">{totalResults} Results</h1>
            }
            <div className="grid md:grid-cols-2 gap-3 w-3/4 mx-auto mb-20">
                {recipes.map((recipe, i) => (
                    <Recipe key={i} recipe={recipe} />
                ))}
            </div>

            {totalResults > 10 && 
                <ReactPaginate
                    pageCount={Math.ceil(totalResults / 10)}
                    containerClassName={'bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 w-2/5 mx-auto fixed inset-x-0 bottom-0 rounded-lg mb-2'}
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