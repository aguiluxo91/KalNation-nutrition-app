import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from './components/navbar/Navbar';
import Home from './screens/Home';
import RecipeDetails from "./screens/RecipeDetails";
import RecipesHome from "./screens/RecipesHome";

function App() {
  return (
    <Router>
      <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/recipes" element={<RecipesHome/>} />
            <Route path="/recipes/:id" element={<RecipeDetails/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
