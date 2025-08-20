import { Link } from "react-router-dom";
import '../css/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to='/MovieApp'>Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to='/MovieApp'>Home</Link>
        <Link to='/MovieApp/favorites'>Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;