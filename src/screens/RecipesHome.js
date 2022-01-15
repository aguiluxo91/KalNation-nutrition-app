import SearchByName from '../components/recipe-search/SearchByName';

function RecipesHome() { 

    return (
        <>
            <h1 className="text-3xl font-bold mt-3">Search your Recipes by Name or Ingredients</h1>
            <SearchByName />
        </>
    );
}

export default RecipesHome;