import { Link } from "react-router"
function NavBar(){
    return (
        <div>
            <Link to="/">Home </Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}

export default NavBar