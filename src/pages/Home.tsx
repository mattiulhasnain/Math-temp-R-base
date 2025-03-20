import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureCategories = [
    {
      title: "Calculators",
      icon: "✨",
      tools: [
        {
          title: 'Basic Calculator',
          description: 'Perform everyday calculations with our easy-to-use calculator.',
          icon: '🧮',
          link: '/calculator',
        },
        {
          title: 'Scientific Calculator',
          description: 'Advanced scientific calculator with trigonometric, logarithmic, and exponential functions.',
          icon: '🔬',
          link: '/scientific-calculator',
        },
        {
          title: 'Equation Solver',
          description: 'Solve complex equations and systems of equations step by step.',
          icon: '⚖️',
          link: '/equation-solver',
        },
      ]
    },
    {
      title: "Visualization Tools",
      icon: "📊",
      tools: [
        {
          title: 'Interactive Graphing',
          description: 'Visualize mathematical functions and data with our powerful graphing tool.',
          icon: '📈',
          link: '/graphing',
        },
        {
          title: 'Interactive Geometry',
          description: 'Create and explore geometric shapes with real-time measurements and calculations.',
          icon: '📐',
          link: '/interactive-geometry',
        },
        {
          title: 'Graph Theory',
          description: 'Visualize and analyze graphs, networks, and apply graph algorithms.',
          icon: '🕸️',
          link: '/graph-theory',
        },
      ]
    },
    {
      title: "Reference Tools",
      icon: "📚",
      tools: [
        {
          title: 'Math Formulas',
          description: 'Comprehensive collection of mathematical formulas across various disciplines.',
          icon: '📋',
          link: '/formulas',
        },
        {
          title: 'Math Tables',
          description: 'Quick reference tables for common mathematical functions and values.',
          icon: '📊',
          link: '/math-tables',
        },
        {
          title: 'Calculus Tools',
          description: 'Tools for derivatives, integrals, limits, and series.',
          icon: '∫',
          link: '/calculus',
        },
      ]
    },
    {
      title: "Specialized Tools",
      icon: "🛠️",
      tools: [
        {
          title: 'Prime Numbers',
          description: 'Explore prime numbers, check primality, and factorize numbers.',
          icon: '🔢',
          link: '/prime-numbers',
        },
        {
          title: 'Unit Converter',
          description: 'Convert between different units of measurement across various categories.',
          icon: '🔄',
          link: '/converter',
        },
        {
          title: 'Morse Code Converter',
          description: 'Translate text to Morse code and vice versa with audio playback.',
          icon: '📡',
          link: '/morse-converter',
        },
      ]
    },
  ];

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM0MzQ2NTYiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        </div>
        
        <div ref={heroRef} className="relative z-10 text-center px-6">
          <div className="inline-block mb-4 bg-indigo-900/30 backdrop-blur-sm px-6 py-2 rounded-full border border-indigo-800/50 text-indigo-300 font-medium">
            Version 4.0 · Made with ❤️ by Math Enthusiasts
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Advanced Mathematics <br className="hidden sm:block" />Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Your comprehensive platform for mathematical calculations, graphing, and learning.
            From basic arithmetic to advanced calculus, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link to="/calculator" className="btn-primary flex-1 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Get Started
            </Link>
            <Link to="/math-games" className="btn-secondary flex-1 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18a4 4 0 11-8 0 4 4 0 018 0zM7 18a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              Try Math Games
            </Link>
          </div>
          
          {/* Scroll indicator */}
          <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Mathematical Tools", value: "15+", icon: "🧰" },
              { label: "Different Formulas", value: "500+", icon: "📋" },
              { label: "Calculations Per Day", value: "100K+", icon: "🚀" },
              { label: "Happy Users", value: "50K+", icon: "🎉" },
            ].map((stat, i) => (
              <div key={i} className="glass-card text-center glow-bg p-6">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section className="py-16 px-6" key={categoryIndex}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div className="bg-indigo-600/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center text-3xl mr-4 border border-indigo-600/20">
                {category.icon}
              </div>
              <h2 className="section-title text-4xl">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.tools.map((tool, toolIndex) => (
                <Link
                  key={toolIndex}
                  to={tool.link}
                  className="group"
                >
                  <div className="card h-full group-hover:bg-gradient-to-br group-hover:from-gray-800 group-hover:to-gray-900 flex flex-col">
                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 border border-indigo-500/30">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors duration-300">{tool.title}</h3>
                    <p className="text-gray-400 flex-grow">{tool.description}</p>
                    <div className="flex justify-end mt-4">
                      <div className="text-indigo-400 group-hover:text-indigo-300 flex items-center transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                        Explore
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="glass-card glow-bg max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who use CalcHub to enhance their mathematical skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/scientific-calculator" className="btn-primary flex-1 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Try Scientific Calculator
            </Link>
            <Link to="/graphing" className="btn-secondary flex-1 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Explore Graphing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 