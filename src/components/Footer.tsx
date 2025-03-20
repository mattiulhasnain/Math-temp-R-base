import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24">
      {/* Divider with glow effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-12 -mt-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-butterfly-blue-900 h-12"></div>
        <div className="absolute left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-butterfly-pink-400 to-transparent rounded-full blur-sm top-6"></div>
      </div>
      
      <div className="bg-butterfly-blue-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527.213 1.028.589 1.405a.989.989 0 01.41.404l2.298-.996c.572-.247 1.23-.066 1.629.494.41-.55 1.090-.709 1.655-.424l2.33 1.005a.96.96 0 01.352-.249l2.547-1.093a1 1 0 000-1.84l-7-3z" />
                    <path d="M11.611 12.332A3.496 3.496 0 0110 15a3.49 3.49 0 01-1.605-2.665c-.422-.175-.895-.17-1.323.013a3.51 3.51 0 01-1.76 2.91 3.5 3.5 0 01-1.608-2.91c-.432-.185-.909-.187-1.332-.002A3.508 3.508 0 015.5 9.5a3.499 3.499 0 014-3.465 3.5 3.5 0 013.5 3.465c0 1.152-.55 2.176-1.404 2.828a1.79 1.79 0 00.015.004z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-butterfly-purple-100 bg-clip-text text-transparent">CalcHub</h3>
              </div>
              <p className="text-butterfly-blue-100 leading-relaxed">
                Advanced mathematics made simple. Your comprehensive platform for calculations, graphing, and learning.
              </p>
              
              <div className="mt-6 flex space-x-4">
                <a href="https://github.com/mattiulhasnain/" className="text-butterfly-blue-300 hover:text-butterfly-purple-300 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-butterfly-blue-300 hover:text-butterfly-purple-300 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              {/* Developer Information */}
              <div className="mt-6 p-4 bg-butterfly-blue-800/30 rounded-lg border border-butterfly-blue-700/50">
                <h3 className="text-md font-semibold mb-2 text-butterfly-pink-300">Developer Information</h3>
                <p className="text-butterfly-blue-200 text-sm">Developer: Mattiul Hasnain</p>
                <p className="text-butterfly-blue-200 text-sm">
                  <a href="https://github.com/mattiulhasnain/" target="_blank" rel="noopener noreferrer" className="hover:text-butterfly-purple-300 transition-colors">
                    GitHub: mattiulhasnain
                  </a>
                </p>
                <p className="text-butterfly-blue-200 text-sm">
                  <a href="mailto:m.mattiulhasnain@gmail.com" className="hover:text-butterfly-purple-300 transition-colors">
                    Email: m.mattiulhasnain@gmail.com
                  </a>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-butterfly-pink-300">Calculators</h3>
              <ul className="space-y-3">
                <li><Link to="/calculator" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Basic Calculator
                </Link></li>
                <li><Link to="/scientific-calculator" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Scientific Calculator
                </Link></li>
                <li><Link to="/equation-solver" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Equation Solver
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-butterfly-purple-300">Tools & Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/calculus" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Calculus
                </Link></li>
                <li><Link to="/graphing" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Graphing
                </Link></li>
                <li><Link to="/formulas" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Formulas
                </Link></li>
                <li><Link to="/math-tables" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Math Tables
                </Link></li>
                <li><Link to="/interactive-geometry" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Interactive Geometry
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-butterfly-green-300">More</h3>
              <ul className="space-y-3">
                <li><Link to="/graph-theory" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Graph Theory
                </Link></li>
                <li><Link to="/prime-numbers" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Prime Numbers
                </Link></li>
                <li><Link to="/unit-converter" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Unit Converter
                </Link></li>
                <li><Link to="/morse-converter" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Morse Code
                </Link></li>
                <li><Link to="/math-games" className="text-butterfly-blue-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2 text-xs">→</span>Math Games
                </Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-butterfly-blue-800/50 text-center">
            <p className="text-butterfly-blue-300">&copy; {new Date().getFullYear()} CalcHub. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-butterfly-blue-300 hover:text-butterfly-purple-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-butterfly-blue-300 hover:text-butterfly-purple-300 transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-butterfly-blue-300 hover:text-butterfly-purple-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 