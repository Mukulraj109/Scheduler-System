import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-2xl font-bold" to="/">
          Scheduler
        </Link>
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label htmlFor="menu-toggle" className="text-white cursor-pointer md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </label>
        <div className="hidden md:flex space-x-4">
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" to="/">
            Home
          </Link>
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" to="/admin">
            Admin
          </Link>
        </div>
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            <Link className="text-white py-2 px-4 hover:bg-gray-700 rounded-md" to="/">
              Home
            </Link>
            <Link className="text-white py-2 px-4 hover:bg-gray-700 rounded-md" to="/admin">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
