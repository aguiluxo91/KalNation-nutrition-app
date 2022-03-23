import { useState } from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <>
            <nav className="bg-green-500 h-16 flex justify-between items-center relative shadow-lg text-white">
                <NavLink exact="true" to="/"><h1 className='pl-8 text-xl font-bold'>KalNation</h1></NavLink>

                <div className="px-4 cursor-pointer md:hidden" onClick={toggleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                <div className="pr-8 hidden md:block">
                    <NavLink exact="true" to="/" className={({ isActive }) => isActive ? "bg-green-600 p-2 mx-1 rounded" : "hover:bg-green-700 hover:rounded p-2 mx-1"} >Home</NavLink>
                    <NavLink exact="true" to="/recipes" className={({ isActive }) => isActive ? "bg-green-600 p-2 mx-1 rounded" : "hover:bg-green-700 hover:rounded p-2 mx-1"} >Recipes</NavLink>
                </div>
            </nav>
            {isOpen &&
                <div className="grid grid-rows-2 text-center items-center bg-green-300">
                <NavLink to="/" className="p-4" onClick={toggleOpen}>Home</NavLink>
                <NavLink to="/recipes" className="p-4" onClick={toggleOpen}>Recipes</NavLink>
            </div>
            }
            
        </>
    );
}

export default Navbar;