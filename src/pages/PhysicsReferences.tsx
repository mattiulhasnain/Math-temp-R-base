import React, { useState } from 'react';

interface PhysicsConstant {
  symbol: string;
  name: string;
  value: string;
  unit: string;
  description: string;
}

interface MathSymbol {
  symbol: string;
  name: string;
  category: string;
  description: string;
}

const PhysicsReferences: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constants' | 'symbols'>('constants');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const physicsConstants: PhysicsConstant[] = [
    {
      symbol: 'c',
      name: 'Speed of Light',
      value: '299,792,458',
      unit: 'm/s',
      description: 'The speed of light in vacuum, a fundamental physical constant.'
    },
    {
      symbol: 'G',
      name: 'Gravitational Constant',
      value: '6.674 × 10⁻¹¹',
      unit: 'N⋅m²/kg²',
      description: 'Universal gravitational constant appearing in Newton\'s law of universal gravitation.'
    },
    {
      symbol: 'h',
      name: 'Planck Constant',
      value: '6.626 × 10⁻³⁴',
      unit: 'J⋅s',
      description: 'Quantum of electromagnetic action relating a photon\'s energy to its frequency.'
    },
    {
      symbol: 'e',
      name: 'Elementary Charge',
      value: '1.602 × 10⁻¹⁹',
      unit: 'C',
      description: 'Magnitude of electric charge carried by a proton or electron.'
    },
    {
      symbol: 'kB',
      name: 'Boltzmann Constant',
      value: '1.381 × 10⁻²³',
      unit: 'J/K',
      description: 'Relates temperature to particle energy in ideal gases.'
    },
    {
      symbol: 'NA',
      name: 'Avogadro Constant',
      value: '6.022 × 10²³',
      unit: 'mol⁻¹',
      description: 'Number of constituent particles in one mole of substance.'
    },
    {
      symbol: 'me',
      name: 'Electron Mass',
      value: '9.109 × 10⁻³¹',
      unit: 'kg',
      description: 'Rest mass of an electron.'
    },
    {
      symbol: 'mp',
      name: 'Proton Mass',
      value: '1.673 × 10⁻²⁷',
      unit: 'kg',
      description: 'Rest mass of a proton.'
    }
  ];

  const mathSymbols: MathSymbol[] = [
    // Greek Letters
    {
      symbol: 'α',
      name: 'Alpha',
      category: 'Greek Letters',
      description: 'Often used for angles, coefficients, or significance levels.'
    },
    {
      symbol: 'β',
      name: 'Beta',
      category: 'Greek Letters',
      description: 'Often used for angles or regression coefficients.'
    },
    {
      symbol: 'π',
      name: 'Pi',
      category: 'Greek Letters',
      description: 'Ratio of circumference to diameter of a circle.'
    },
    // Operators
    {
      symbol: '∑',
      name: 'Sigma',
      category: 'Operators',
      description: 'Summation of a sequence.'
    },
    {
      symbol: '∫',
      name: 'Integral',
      category: 'Operators',
      description: 'Integration operator.'
    },
    {
      symbol: '∂',
      name: 'Partial Derivative',
      category: 'Operators',
      description: 'Partial differentiation operator.'
    },
    // Logic Symbols
    {
      symbol: '∀',
      name: 'For All',
      category: 'Logic',
      description: 'Universal quantifier.'
    },
    {
      symbol: '∃',
      name: 'Exists',
      category: 'Logic',
      description: 'Existential quantifier.'
    },
    {
      symbol: '⇒',
      name: 'Implies',
      category: 'Logic',
      description: 'Logical implication.'
    }
  ];

  const categories = ['all', ...new Set(mathSymbols.map(s => s.category))];

  const filteredConstants = physicsConstants.filter(constant =>
    constant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    constant.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSymbols = mathSymbols.filter(symbol =>
    (selectedCategory === 'all' || symbol.category === selectedCategory) &&
    (symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-butterfly-pink-300 to-butterfly-purple-300 text-transparent bg-clip-text">
        Physics References
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('constants')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === 'constants'
              ? 'bg-butterfly-purple-500 text-white'
              : 'bg-butterfly-blue-800/50 text-butterfly-blue-200 hover:bg-butterfly-blue-700/50'
          }`}
        >
          Physics Constants
        </button>
        <button
          onClick={() => setActiveTab('symbols')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === 'symbols'
              ? 'bg-butterfly-purple-500 text-white'
              : 'bg-butterfly-blue-800/50 text-butterfly-blue-200 hover:bg-butterfly-blue-700/50'
          }`}
        >
          Mathematical Symbols
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-butterfly-blue-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-400"
        />
        
        {activeTab === 'symbols' && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white focus:outline-none focus:ring-2 focus:ring-butterfly-purple-400"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        {activeTab === 'constants' ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-butterfly-blue-800/50">
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Value</th>
                <th className="px-4 py-3 text-left">Unit</th>
                <th className="px-4 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredConstants.map((constant, index) => (
                <tr
                  key={constant.symbol}
                  className={`border-t border-butterfly-blue-700/30 ${
                    index % 2 === 0 ? 'bg-butterfly-blue-900/30' : 'bg-butterfly-blue-800/30'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-butterfly-purple-300">{constant.symbol}</td>
                  <td className="px-4 py-3">{constant.name}</td>
                  <td className="px-4 py-3 font-mono">{constant.value}</td>
                  <td className="px-4 py-3 font-mono text-butterfly-pink-300">{constant.unit}</td>
                  <td className="px-4 py-3 text-butterfly-blue-200">{constant.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-butterfly-blue-800/50">
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredSymbols.map((symbol, index) => (
                <tr
                  key={`${symbol.symbol}-${symbol.name}`}
                  className={`border-t border-butterfly-blue-700/30 ${
                    index % 2 === 0 ? 'bg-butterfly-blue-900/30' : 'bg-butterfly-blue-800/30'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-2xl text-butterfly-purple-300">{symbol.symbol}</td>
                  <td className="px-4 py-3">{symbol.name}</td>
                  <td className="px-4 py-3 text-butterfly-pink-300">{symbol.category}</td>
                  <td className="px-4 py-3 text-butterfly-blue-200">{symbol.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PhysicsReferences; 