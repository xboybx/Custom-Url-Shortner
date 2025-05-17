import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinkClasses = ({ isActive }) => 
    `px-4 py-2 font-medium transition-colors ${
      isActive 
        ? 'text-blue-600 font-semibold' 
        : 'text-gray-700 hover:text-blue-600'
    }`

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">LinkMint</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/links" className={navLinkClasses}>
              My Links
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="flex flex-col space-y-2 pb-4">
              <NavLink 
                to="/" 
                className={navLinkClasses} 
                end
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/links" 
                className={navLinkClasses}
                onClick={() => setIsOpen(false)}
              >
                My Links
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar