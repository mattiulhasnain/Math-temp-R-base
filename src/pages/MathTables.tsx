import React, { useState } from 'react';

type TableType = 'multiplication' | 'addition' | 'trigonometry' | 'powers' | 'logarithms' | 'fibonacci';

const MathTables: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<TableType>('multiplication');
  const [multiplierRange, setMultiplierRange] = useState<number>(12);
  const [multiplicandRange, setMultiplicandRange] = useState<number>(12);
  const [addendRange, setAddendRange] = useState<number>(20);
  const [augendRange, setAugendRange] = useState<number>(20);
  const [powerBase, setPowerBase] = useState<number>(2);
  const [powerRange, setPowerRange] = useState<number>(10);
  const [logBase, setLogBase] = useState<number>(10);
  const [logRange, setLogRange] = useState<number>(10);
  const [fibonacciCount, setFibonacciCount] = useState<number>(20);
  
  const generateMultiplicationTable = () => {
    const rows: React.ReactElement[] = [];
    
    // Header row
    const headerRow: React.ReactElement[] = [<th key="empty" className="bg-gray-700 p-2"></th>];
    for (let j = 1; j <= multiplicandRange; j++) {
      headerRow.push(
        <th key={`header-${j}`} className="bg-indigo-600 p-2 text-center">{j}</th>
      );
    }
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (let i = 1; i <= multiplierRange; i++) {
      const cells: React.ReactElement[] = [
        <th key={`row-${i}`} className="bg-indigo-600 p-2 text-center">{i}</th>
      ];
      
      for (let j = 1; j <= multiplicandRange; j++) {
        cells.push(
          <td key={`${i}-${j}`} className="p-2 text-center border border-gray-700">{i * j}</td>
        );
      }
      
      rows.push(<tr key={`row-${i}`}>{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  const generateAdditionTable = () => {
    const rows: React.ReactElement[] = [];
    
    // Header row
    const headerRow: React.ReactElement[] = [<th key="empty" className="bg-gray-700 p-2"></th>];
    for (let j = 1; j <= addendRange; j++) {
      headerRow.push(
        <th key={`header-${j}`} className="bg-indigo-600 p-2 text-center">{j}</th>
      );
    }
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (let i = 1; i <= augendRange; i++) {
      const cells: React.ReactElement[] = [
        <th key={`row-${i}`} className="bg-indigo-600 p-2 text-center">{i}</th>
      ];
      
      for (let j = 1; j <= addendRange; j++) {
        cells.push(
          <td key={`${i}-${j}`} className="p-2 text-center border border-gray-700">{i + j}</td>
        );
      }
      
      rows.push(<tr key={`row-${i}`}>{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  const generateTrigonometryTable = () => {
    const angles = [0, 15, 30, 45, 60, 75, 90, 120, 135, 150, 180, 270, 360];
    const rows: React.ReactElement[] = [];
    
    // Function to format the value to 4 decimal places
    const formatValue = (value: number): string => {
      return value.toFixed(4);
    };
    
    // Header row
    const headerRow: React.ReactElement[] = [
      <th key="angle" className="bg-indigo-600 p-2 text-center">Angle (°)</th>,
      <th key="sin" className="bg-indigo-600 p-2 text-center">sin</th>,
      <th key="cos" className="bg-indigo-600 p-2 text-center">cos</th>,
      <th key="tan" className="bg-indigo-600 p-2 text-center">tan</th>,
    ];
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (const angle of angles) {
      const radians = angle * (Math.PI / 180);
      const sin = Math.sin(radians);
      const cos = Math.cos(radians);
      const tan = angle === 90 || angle === 270 ? 'undefined' : formatValue(Math.tan(radians));
      
      const cells: React.ReactElement[] = [
        <td key={`angle-${angle}`} className="p-2 text-center font-bold">{angle}°</td>,
        <td key={`sin-${angle}`} className="p-2 text-center">{formatValue(sin)}</td>,
        <td key={`cos-${angle}`} className="p-2 text-center">{formatValue(cos)}</td>,
        <td key={`tan-${angle}`} className="p-2 text-center">{tan}</td>,
      ];
      
      rows.push(<tr key={`angle-${angle}`} className="border-b border-gray-700">{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  const generatePowersTable = () => {
    const rows: React.ReactElement[] = [];
    
    // Header row
    const headerRow: React.ReactElement[] = [
      <th key="exponent" className="bg-indigo-600 p-2 text-center">n</th>,
      <th key="power" className="bg-indigo-600 p-2 text-center">{powerBase}<sup>n</sup></th>,
      <th key="sqrt" className="bg-indigo-600 p-2 text-center">√n</th>,
      <th key="cbrt" className="bg-indigo-600 p-2 text-center">∛n</th>,
    ];
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (let i = 1; i <= powerRange; i++) {
      const power = Math.pow(powerBase, i);
      const sqrt = Math.sqrt(i);
      const cbrt = Math.cbrt(i);
      
      const cells: React.ReactElement[] = [
        <td key={`n-${i}`} className="p-2 text-center font-bold">{i}</td>,
        <td key={`power-${i}`} className="p-2 text-center">{power.toLocaleString()}</td>,
        <td key={`sqrt-${i}`} className="p-2 text-center">{sqrt.toFixed(4)}</td>,
        <td key={`cbrt-${i}`} className="p-2 text-center">{cbrt.toFixed(4)}</td>,
      ];
      
      rows.push(<tr key={`n-${i}`} className="border-b border-gray-700">{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  const generateLogarithmsTable = () => {
    const rows: React.ReactElement[] = [];
    
    // Header row
    const headerRow: React.ReactElement[] = [
      <th key="n" className="bg-indigo-600 p-2 text-center">n</th>,
      <th key="log" className="bg-indigo-600 p-2 text-center">log<sub>{logBase}</sub>(n)</th>,
      <th key="ln" className="bg-indigo-600 p-2 text-center">ln(n)</th>,
      <th key="log2" className="bg-indigo-600 p-2 text-center">log<sub>2</sub>(n)</th>,
    ];
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (let i = 1; i <= logRange; i++) {
      const log = Math.log(i) / Math.log(logBase);
      const ln = Math.log(i);
      const log2 = Math.log2(i);
      
      const cells: React.ReactElement[] = [
        <td key={`n-${i}`} className="p-2 text-center font-bold">{i}</td>,
        <td key={`log-${i}`} className="p-2 text-center">{log.toFixed(4)}</td>,
        <td key={`ln-${i}`} className="p-2 text-center">{ln.toFixed(4)}</td>,
        <td key={`log2-${i}`} className="p-2 text-center">{log2.toFixed(4)}</td>,
      ];
      
      rows.push(<tr key={`n-${i}`} className="border-b border-gray-700">{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  const generateFibonacciTable = () => {
    const fibonacci: number[] = [0, 1];
    for (let i = 2; i < fibonacciCount; i++) {
      fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
    }
    
    const rows: React.ReactElement[] = [];
    
    // Header row
    const headerRow: React.ReactElement[] = [
      <th key="index" className="bg-indigo-600 p-2 text-center">n</th>,
      <th key="fibonacci" className="bg-indigo-600 p-2 text-center">F(n)</th>,
      <th key="ratio" className="bg-indigo-600 p-2 text-center">F(n) / F(n-1)</th>,
    ];
    rows.push(<tr key="header">{headerRow}</tr>);
    
    // Data rows
    for (let i = 0; i < fibonacci.length; i++) {
      const ratio = i > 1 ? (fibonacci[i] / fibonacci[i-1]).toFixed(8) : 'N/A';
      
      const cells: React.ReactElement[] = [
        <td key={`index-${i}`} className="p-2 text-center font-bold">{i}</td>,
        <td key={`fibonacci-${i}`} className="p-2 text-center">{fibonacci[i].toLocaleString()}</td>,
        <td key={`ratio-${i}`} className="p-2 text-center">{ratio}</td>,
      ];
      
      rows.push(<tr key={`index-${i}`} className="border-b border-gray-700">{cells}</tr>);
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mathematical Tables</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'multiplication'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('multiplication')}
        >
          Multiplication
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'addition'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('addition')}
        >
          Addition
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'trigonometry'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('trigonometry')}
        >
          Trigonometry
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'powers'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('powers')}
        >
          Powers & Roots
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'logarithms'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('logarithms')}
        >
          Logarithms
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTable === 'fibonacci'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTable('fibonacci')}
        >
          Fibonacci
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        {/* Controls for each table type */}
        {selectedTable === 'multiplication' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Multiplication Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Rows (Multiplier)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={multiplierRange}
                  onChange={(e) => setMultiplierRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{multiplierRange}</div>
              </div>
              <div>
                <label className="label">Columns (Multiplicand)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={multiplicandRange}
                  onChange={(e) => setMultiplicandRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{multiplicandRange}</div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTable === 'addition' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Addition Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Rows (Augend)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={augendRange}
                  onChange={(e) => setAugendRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{augendRange}</div>
              </div>
              <div>
                <label className="label">Columns (Addend)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={addendRange}
                  onChange={(e) => setAddendRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{addendRange}</div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTable === 'powers' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Powers & Roots Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Base</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={powerBase}
                  onChange={(e) => setPowerBase(parseInt(e.target.value) || 2)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label">Range</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={powerRange}
                  onChange={(e) => setPowerRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{powerRange}</div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTable === 'logarithms' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Logarithms Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Log Base</label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={logBase}
                  onChange={(e) => setLogBase(parseInt(e.target.value) || 10)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label">Range</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={logRange}
                  onChange={(e) => setLogRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-400">{logRange}</div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTable === 'trigonometry' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Trigonometric Functions</h2>
            <p className="text-gray-300 mb-4">
              Table of common trigonometric function values in degrees.
            </p>
          </div>
        )}
        
        {selectedTable === 'fibonacci' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Fibonacci Sequence</h2>
            <div>
              <label className="label">Number of Terms</label>
              <input
                type="range"
                min="3"
                max="50"
                value={fibonacciCount}
                onChange={(e) => setFibonacciCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm text-gray-400">{fibonacciCount}</div>
            </div>
          </div>
        )}
        
        {/* Render the selected table */}
        <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          {selectedTable === 'multiplication' && generateMultiplicationTable()}
          {selectedTable === 'addition' && generateAdditionTable()}
          {selectedTable === 'trigonometry' && generateTrigonometryTable()}
          {selectedTable === 'powers' && generatePowersTable()}
          {selectedTable === 'logarithms' && generateLogarithmsTable()}
          {selectedTable === 'fibonacci' && generateFibonacciTable()}
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">About Mathematical Tables</h2>
        
        {selectedTable === 'multiplication' && (
          <div className="text-gray-300">
            <p className="mb-3">
              Multiplication tables are fundamental tools for learning and practicing multiplication facts. They show the products of pairs of numbers, arranged in a grid format.
            </p>
            <p>
              Learning these tables helps develop calculation skills and number sense, forming the foundation for more advanced mathematical concepts like division, fractions, and algebra.
            </p>
          </div>
        )}
        
        {selectedTable === 'addition' && (
          <div className="text-gray-300">
            <p className="mb-3">
              Addition tables show the sums of pairs of numbers, arranged in a grid format. They are useful for learning and practicing basic addition facts.
            </p>
            <p>
              Mastering addition is essential for all mathematical operations and forms the basis for understanding number relationships and patterns.
            </p>
          </div>
        )}
        
        {selectedTable === 'trigonometry' && (
          <div className="text-gray-300">
            <p className="mb-3">
              Trigonometric tables provide values for sine, cosine, and tangent functions at various angles. Historically, these tables were essential for navigation, astronomy, and engineering before calculators.
            </p>
            <p>
              Modern applications include computer graphics, signal processing, physics simulations, and engineering designs.
            </p>
          </div>
        )}
        
        {selectedTable === 'powers' && (
          <div className="text-gray-300">
            <p className="mb-3">
              Power tables show the results of raising a base number to various exponents. They also include common roots like square roots and cube roots.
            </p>
            <p>
              These values are used in area and volume calculations, exponential growth modeling, and many scientific applications.
            </p>
          </div>
        )}
        
        {selectedTable === 'logarithms' && (
          <div className="text-gray-300">
            <p className="mb-3">
              Logarithm tables show the logarithm values of numbers in different bases. Before calculators, these tables were essential for complex calculations involving multiplication, division, powers, and roots.
            </p>
            <p>
              Logarithms remain important in modern applications like information theory, statistics, acoustics, and solving exponential equations.
            </p>
          </div>
        )}
        
        {selectedTable === 'fibonacci' && (
          <div className="text-gray-300">
            <p className="mb-3">
              The Fibonacci sequence is a series where each number is the sum of the two preceding ones, usually starting with 0 and 1. The sequence appears throughout nature, art, and architecture.
            </p>
            <p>
              The ratio between consecutive Fibonacci numbers approaches the golden ratio (approximately 1.618), a value that appears in many natural and artistic contexts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathTables; 