import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow mb-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">BlinkRAG</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link to="/upload" className="text-blue-600 hover:underline">Upload</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:underline">
            Dashboard
          </Link>
          <Link to="/upload" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:underline">
            Upload
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
