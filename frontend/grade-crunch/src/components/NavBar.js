import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

function NavBar(){
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="site-title">Grade Crunch</Link> 
                  <ul className="flex">
                    <CustomLink to="/about" className=" hover:bg-gray-100 transition-colors p-5">About</CustomLink>
                    <CustomLink to="/contact" className=" hover:bg-gray-100 transition-colors p-5">Contact</CustomLink>
                    {/*conditional nav items based on auth status */}
                    {isAuthenticated ? (
                      <>
                        <CustomLink to="/dashboard" className=" hover:bg-gray-100 transition-colors p-5">Dashboard</CustomLink>
                        <span> Welcome, {user.username}!</span>
                        <button onClick={handleLogout}>Logout</button>
                      </>
                    ) : (
                      <>
                        <CustomLink to="/signup" className=" hover:bg-gray-100 transition-colors p-5">Sign Up</CustomLink>
                      </>
                    )}
                  </ul> 
              </div> 
            </div>
          </div>
        </nav>
    );
}

function CustomLink( {to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return(
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavBar;