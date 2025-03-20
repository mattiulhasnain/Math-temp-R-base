import React, { useState } from 'react';

interface Formula {
  id: string;
  title: string;
  latex: string;
  description: string;
  categories: string[];
}

interface FormulaCategory {
  id: string;
  name: string;
  icon: string;
}

const Formulas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: FormulaCategory[] = [
    { id: 'all', name: 'All Formulas', icon: '📚' },
    { id: 'algebra', name: 'Algebra', icon: '🔢' },
    { id: 'geometry', name: 'Geometry', icon: '📐' },
    { id: 'trigonometry', name: 'Trigonometry', icon: '📏' },
    { id: 'calculus', name: 'Calculus', icon: '∫' },
    { id: 'statistics', name: 'Statistics & Probability', icon: '📊' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
  ];

  const formulas: Formula[] = [
    // Algebra
    {
      id: 'quadratic',
      title: 'Quadratic Formula',
      latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      description: 'Solves a quadratic equation in the form ax² + bx + c = 0',
      categories: ['algebra'],
    },
    {
      id: 'binomial-expansion',
      title: 'Binomial Expansion',
      latex: '(a + b)^n = \\sum_{k=0}^{n} {n \\choose k} a^{n-k} b^k',
      description: 'Expands expressions of the form (a + b)ⁿ',
      categories: ['algebra'],
    },
    
    // Geometry
    {
      id: 'circle-area',
      title: 'Circle Area',
      latex: 'A = \\pi r^2',
      description: 'Area of a circle with radius r',
      categories: ['geometry'],
    },
    {
      id: 'circle-circumference',
      title: 'Circle Circumference',
      latex: 'C = 2\\pi r',
      description: 'Circumference of a circle with radius r',
      categories: ['geometry'],
    },
    {
      id: 'sphere-volume',
      title: 'Sphere Volume',
      latex: 'V = \\frac{4}{3}\\pi r^3',
      description: 'Volume of a sphere with radius r',
      categories: ['geometry'],
    },
    {
      id: 'sphere-surface-area',
      title: 'Sphere Surface Area',
      latex: 'A = 4\\pi r^2',
      description: 'Surface area of a sphere with radius r',
      categories: ['geometry'],
    },
    
    // Trigonometry
    {
      id: 'pythagorean-theorem',
      title: 'Pythagorean Theorem',
      latex: 'a^2 + b^2 = c^2',
      description: 'Relationship between sides of a right triangle',
      categories: ['geometry', 'trigonometry'],
    },
    {
      id: 'law-of-sines',
      title: 'Law of Sines',
      latex: '\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}',
      description: 'Relates sides and angles in any triangle',
      categories: ['trigonometry'],
    },
    {
      id: 'law-of-cosines',
      title: 'Law of Cosines',
      latex: 'c^2 = a^2 + b^2 - 2ab\\cos C',
      description: 'Generalizes the Pythagorean theorem to any triangle',
      categories: ['trigonometry'],
    },
    
    // Calculus
    {
      id: 'power-rule',
      title: 'Power Rule (Differentiation)',
      latex: '\\frac{d}{dx}[x^n] = nx^{n-1}',
      description: 'Derivative of a variable raised to a power',
      categories: ['calculus'],
    },
    {
      id: 'product-rule',
      title: 'Product Rule',
      latex: '\\frac{d}{dx}[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
      description: 'Derivative of a product of two functions',
      categories: ['calculus'],
    },
    {
      id: 'chain-rule',
      title: 'Chain Rule',
      latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x)',
      description: 'Derivative of a composite function',
      categories: ['calculus'],
    },
    
    // Statistics
    {
      id: 'mean',
      title: 'Arithmetic Mean',
      latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
      description: 'Average of a set of values',
      categories: ['statistics'],
    },
    {
      id: 'variance',
      title: 'Variance',
      latex: '\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2',
      description: 'Measure of dispersion in a data set',
      categories: ['statistics'],
    },
    {
      id: 'standard-deviation',
      title: 'Standard Deviation',
      latex: '\\sigma = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2}',
      description: 'Square root of variance',
      categories: ['statistics'],
    },
    
    // Physics
    {
      id: 'newtons-second-law',
      title: 'Newton\'s Second Law',
      latex: 'F = ma',
      description: 'Force equals mass times acceleration',
      categories: ['physics'],
    },
    {
      id: 'einsteins-mass-energy',
      title: 'Einstein\'s Mass-Energy Equivalence',
      latex: 'E = mc^2',
      description: 'Energy equals mass times speed of light squared',
      categories: ['physics'],
    },
    {
      id: 'kinetic-energy',
      title: 'Kinetic Energy',
      latex: 'E_k = \\frac{1}{2}mv^2',
      description: 'Energy of a moving object',
      categories: ['physics'],
    },
  ];
  
  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = formula.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        formula.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || formula.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Load MathJax dynamically
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Trigger MathJax to render whenever filtered formulas change
  React.useEffect(() => {
    // Check if MathJax is loaded
    if ((window as any).MathJax) {
      // Tell MathJax to render the math
      (window as any).MathJax.typeset();
    }
  }, [filteredFormulas, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mathematical Formulas</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search formulas..."
              className="input w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <select
              className="input w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map(formula => (
            <div key={formula.id} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-3">{formula.title}</h2>
              <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center overflow-x-auto">
                <div className="text-lg text-white">{`\\(${formula.latex}\\)`}</div>
              </div>
              <p className="text-gray-300 mb-4">{formula.description}</p>
              <div className="flex flex-wrap gap-2">
                {formula.categories.map(cat => {
                  const category = categories.find(c => c.id === cat);
                  return (
                    <span 
                      key={cat} 
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {category?.icon} {category?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-2xl text-gray-400">No formulas match your search criteria</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the search box to find formulas by name or description</li>
          <li>Filter formulas by category using the dropdown or category buttons</li>
          <li>Click on a category tag to see all formulas in that category</li>
          <li>Formulas are rendered in mathematical notation for clarity</li>
        </ul>
      </div>
    </div>
  );
};

export default Formulas; 