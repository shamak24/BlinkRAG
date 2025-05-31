import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Upload" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block bg-white rounded-full p-2 shadow">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#2563eb" />
              <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-white tracking-tight hover:text-yellow-300 transition-colors duration-200" title="Home Page" aria-label="Home Page">
            BlinkRAG
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white font-medium px-3 py-1 rounded hover:bg-white hover:text-blue-700 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 rounded hover:bg-blue-700 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M4 8h16M4 16h16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

  
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mx-2 mt-1 py-3 px-4 space-y-2 animate-fade-in-down">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-blue-700 font-semibold px-3 py-2 rounded hover:bg-blue-100 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
