import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Organize navigation items into groups
  const navGroups = [
    {
      id: 'calculators',
      label: 'Calculators',
      icon: '🧮',
      items: [
        { path: '/calculator', label: 'Basic Calculator' },
        { path: '/scientific-calculator', label: 'Scientific Calculator' },
        { path: '/equation-solver', label: 'Equation Solver' },
        { path: '/physics-calculator', label: 'Physics Calculator' },
      ]
    },
    {
      id: 'math-tools',
      label: 'Math Tools',
      icon: '📊',
      items: [
        { path: '/calculus', label: 'Calculus' },
        { path: '/graphing', label: 'Graphing' },
        { path: '/formulas', label: 'Formulas' },
        { path: '/math-tables', label: 'Math Tables' },
        { path: '/prime-numbers', label: 'Prime Numbers' },
      ]
    },
    {
      id: 'converters',
      label: 'Converters',
      icon: '🔄',
      items: [
        { path: '/unit-converter', label: 'Unit Converter' },
        { path: '/converter', label: 'Number Converter' },
        { path: '/morse-converter', label: 'Morse Code' },
      ]
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: '🔬',
      items: [
        { path: '/engineering-tools', label: 'Engineering Tools' },
        { path: '/interactive-geometry', label: 'Interactive Geometry' },
        { path: '/graph-theory', label: 'Graph Theory' },
        { path: '/charts-demo', label: 'Charts Demo' },
      ]
    },
    {
      id: 'misc',
      label: 'More',
      icon: '🦋',
      items: [
        { path: '/math-games', label: 'Math Games' },
        { path: '/about', label: 'About' },
        { path: '/faq', label: 'FAQ' },
        { path: '/contact', label: 'Contact' },
        { path: '/feedback', label: 'Feedback' },
        { path: '/ui-demo', label: 'UI Demo' },
      ]
    }
  ];

  // Simple standalone items
  const standaloneItems = [
    { path: '/', label: 'Home', icon: '🏠' },
  ];

  const mathTools = [
    { name: 'UI Demo', path: '/ui-demo' },
    { name: 'Charts Demo', path: '/charts-demo' },
    { name: 'Physics References', path: '/physics-references' }
  ];

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-butterfly-blue-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" onClick={closeDropdowns}>
              <div className="bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 p-1.5 rounded-lg mr-2 transition-all group-hover:from-butterfly-purple-600 group-hover:to-butterfly-pink-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527.213 1.028.589 1.405a.989.989 0 01.41.404l2.298-.996c.572-.247 1.23-.066 1.629.494.41-.55 1.090-.709 1.655-.424l2.33 1.005a.96.96 0 01.352-.249l2.547-1.093a1 1 0 000-1.84l-7-3z" />
                  <path d="M11.611 12.332A3.496 3.496 0 0110 15a3.49 3.49 0 01-1.605-2.665c-.422-.175-.895-.17-1.323.013a3.51 3.51 0 01-1.76 2.91 3.5 3.5 0 01-1.608-2.91c-.432-.185-.909-.187-1.332-.002A3.508 3.508 0 015.5 9.5a3.499 3.499 0 014-3.465 3.5 3.5 0 013.5 3.465c0 1.152-.55 2.176-1.404 2.828a1.79 1.79 0 00.015.004z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-butterfly-purple-100 bg-clip-text text-transparent">CalcHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Standalone items */}
            {standaloneItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path
                    ? 'nav-link-active'
                    : 'text-butterfly-blue-100 hover:text-white'
                }`}
                onClick={closeDropdowns}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* Dropdown groups */}
            {navGroups.map((group) => (
              <div key={group.id} className="relative">
                <button
                  className={`nav-link flex items-center ${
                    activeDropdown === group.id || group.items.some(item => location.pathname === item.path)
                      ? 'nav-link-active'
                      : 'text-butterfly-blue-100 hover:text-white'
                  }`}
                  onClick={() => toggleDropdown(group.id)}
                >
                  <span className="mr-1">{group.icon}</span>
                  {group.label}
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === group.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                {activeDropdown === group.id && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-butterfly-blue-900/90 backdrop-blur-md border border-butterfly-blue-700/50 z-10 overflow-hidden transition-all duration-300 animate-fadeIn">
                    <div className="py-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                            location.pathname === item.path
                              ? 'bg-butterfly-purple-600/20 text-white'
                              : 'text-butterfly-blue-200 hover:bg-butterfly-blue-800/50 hover:text-white'
                          }`}
                          onClick={closeDropdowns}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-butterfly-blue-200 hover:text-white hover:bg-butterfly-blue-800/50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-butterfly-blue-900/95 backdrop-blur-lg border-t border-butterfly-blue-800 animate-fadeDown">
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* Standalone items */}
            {standaloneItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-butterfly-purple-600/20 text-white'
                    : 'text-butterfly-blue-200 hover:bg-butterfly-blue-800/50 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* Group headers */}
            {navGroups.map((group) => (
              <div key={group.id}>
                <div className="px-3 py-2 text-xs font-semibold text-butterfly-pink-300 uppercase tracking-wider border-t border-butterfly-blue-700/50 mt-2 pt-2 flex items-center">
                  <span className="mr-2 text-lg">{group.icon}</span>
                  {group.label}
                </div>
                {/* Group items */}
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 pl-10 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-butterfly-purple-600/20 text-white'
                        : 'text-butterfly-blue-200 hover:bg-butterfly-blue-800/50 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 