import { Link, useLocation } from "react-router"
function NavBar(){
    const location = useLocation()
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="text-xl font-semibold">
                    Blog App
                </Link>
                <div className="flex items-center gap-2">
                    <button
                        className={location.pathname === "/" ? " rounded-sm px-4 py-2 border-white bg-black text-white bold " : " rounded-sm px-4 py-2 border-black bg-white text-black bold "}
                    >
                        <Link to="/">Home </Link>
                    </button>
                    <button
                         className={location.pathname === "/profile" ? " rounded-sm px-4 py-2 border-white bg-black text-white bold " : " rounded-sm px-4 py-2 border-black bg-white text-black bold "}
                    >
                        <Link to="/profile">Profile</Link>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default NavBar