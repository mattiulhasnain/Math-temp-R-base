import React, { useState, useEffect } from 'react';

interface ConversionCategory {
  id: string;
  name: string;
  units: { id: string; name: string; toBase: number; fromBase: number }[];
}

const Converter: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [category, setCategory] = useState<string>('length');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  // Array of recent conversions
  const [history, setHistory] = useState<{ from: string; to: string; value: string; result: string; category: string }[]>([]);

  // Define conversion categories and their units
  const categories: ConversionCategory[] = [
    {
      id: 'length',
      name: 'Length',
      units: [
        { id: 'mm', name: 'Millimeter (mm)', toBase: 0.001, fromBase: 1000 },
        { id: 'cm', name: 'Centimeter (cm)', toBase: 0.01, fromBase: 100 },
        { id: 'm', name: 'Meter (m)', toBase: 1, fromBase: 1 },
        { id: 'km', name: 'Kilometer (km)', toBase: 1000, fromBase: 0.001 },
        { id: 'in', name: 'Inch (in)', toBase: 0.0254, fromBase: 39.3701 },
        { id: 'ft', name: 'Foot (ft)', toBase: 0.3048, fromBase: 3.28084 },
        { id: 'yd', name: 'Yard (yd)', toBase: 0.9144, fromBase: 1.09361 },
        { id: 'mi', name: 'Mile (mi)', toBase: 1609.34, fromBase: 0.000621371 }
      ]
    },
    {
      id: 'mass',
      name: 'Mass',
      units: [
        { id: 'mg', name: 'Milligram (mg)', toBase: 0.000001, fromBase: 1000000 },
        { id: 'g', name: 'Gram (g)', toBase: 0.001, fromBase: 1000 },
        { id: 'kg', name: 'Kilogram (kg)', toBase: 1, fromBase: 1 },
        { id: 't', name: 'Metric Ton (t)', toBase: 1000, fromBase: 0.001 },
        { id: 'oz', name: 'Ounce (oz)', toBase: 0.0283495, fromBase: 35.274 },
        { id: 'lb', name: 'Pound (lb)', toBase: 0.453592, fromBase: 2.20462 },
        { id: 'st', name: 'Stone (st)', toBase: 6.35029, fromBase: 0.157473 },
        { id: 'ukt', name: 'UK Ton', toBase: 1016.05, fromBase: 0.000984207 }
      ]
    },
    {
      id: 'temperature',
      name: 'Temperature',
      units: [
        { id: 'c', name: 'Celsius (°C)', toBase: 1, fromBase: 1 },
        { id: 'f', name: 'Fahrenheit (°F)', toBase: 1, fromBase: 1 },
        { id: 'k', name: 'Kelvin (K)', toBase: 1, fromBase: 1 }
      ]
    },
    {
      id: 'area',
      name: 'Area',
      units: [
        { id: 'mm2', name: 'Square Millimeter (mm²)', toBase: 0.000001, fromBase: 1000000 },
        { id: 'cm2', name: 'Square Centimeter (cm²)', toBase: 0.0001, fromBase: 10000 },
        { id: 'm2', name: 'Square Meter (m²)', toBase: 1, fromBase: 1 },
        { id: 'ha', name: 'Hectare (ha)', toBase: 10000, fromBase: 0.0001 },
        { id: 'km2', name: 'Square Kilometer (km²)', toBase: 1000000, fromBase: 0.000001 },
        { id: 'in2', name: 'Square Inch (in²)', toBase: 0.00064516, fromBase: 1550 },
        { id: 'ft2', name: 'Square Foot (ft²)', toBase: 0.092903, fromBase: 10.7639 },
        { id: 'ac', name: 'Acre (ac)', toBase: 4046.86, fromBase: 0.000247105 },
        { id: 'mi2', name: 'Square Mile (mi²)', toBase: 2589988.11, fromBase: 3.861e-7 }
      ]
    },
    {
      id: 'volume',
      name: 'Volume',
      units: [
        { id: 'ml', name: 'Milliliter (ml)', toBase: 0.000001, fromBase: 1000000 },
        { id: 'l', name: 'Liter (L)', toBase: 0.001, fromBase: 1000 },
        { id: 'm3', name: 'Cubic Meter (m³)', toBase: 1, fromBase: 1 },
        { id: 'in3', name: 'Cubic Inch (in³)', toBase: 0.0000163871, fromBase: 61023.7 },
        { id: 'ft3', name: 'Cubic Foot (ft³)', toBase: 0.0283168, fromBase: 35.3147 },
        { id: 'gal', name: 'US Gallon (gal)', toBase: 0.00378541, fromBase: 264.172 },
        { id: 'ukgal', name: 'UK Gallon', toBase: 0.00454609, fromBase: 219.969 }
      ]
    },
    {
      id: 'speed',
      name: 'Speed',
      units: [
        { id: 'mps', name: 'Meters per Second (m/s)', toBase: 1, fromBase: 1 },
        { id: 'kph', name: 'Kilometers per Hour (km/h)', toBase: 0.277778, fromBase: 3.6 },
        { id: 'mph', name: 'Miles per Hour (mph)', toBase: 0.44704, fromBase: 2.23694 },
        { id: 'kt', name: 'Knot (kt)', toBase: 0.514444, fromBase: 1.94384 }
      ]
    },
    {
      id: 'time',
      name: 'Time',
      units: [
        { id: 'ms', name: 'Millisecond (ms)', toBase: 0.001, fromBase: 1000 },
        { id: 's', name: 'Second (s)', toBase: 1, fromBase: 1 },
        { id: 'min', name: 'Minute (min)', toBase: 60, fromBase: 0.0166667 },
        { id: 'h', name: 'Hour (h)', toBase: 3600, fromBase: 0.000277778 },
        { id: 'd', name: 'Day (d)', toBase: 86400, fromBase: 0.0000115741 },
        { id: 'wk', name: 'Week (wk)', toBase: 604800, fromBase: 0.00000165344 },
        { id: 'mo', name: 'Month (30 days)', toBase: 2592000, fromBase: 3.8052e-7 },
        { id: 'yr', name: 'Year (365 days)', toBase: 31536000, fromBase: 3.171e-8 }
      ]
    },
    {
      id: 'data',
      name: 'Data',
      units: [
        { id: 'b', name: 'Bit (b)', toBase: 0.125, fromBase: 8 },
        { id: 'B', name: 'Byte (B)', toBase: 1, fromBase: 1 },
        { id: 'KB', name: 'Kilobyte (KB)', toBase: 1024, fromBase: 0.0009765625 },
        { id: 'MB', name: 'Megabyte (MB)', toBase: 1048576, fromBase: 9.5367e-7 },
        { id: 'GB', name: 'Gigabyte (GB)', toBase: 1073741824, fromBase: 9.3132e-10 },
        { id: 'TB', name: 'Terabyte (TB)', toBase: 1099511627776, fromBase: 9.0949e-13 }
      ]
    },
    {
      id: 'pressure',
      name: 'Pressure',
      units: [
        { id: 'pa', name: 'Pascal (Pa)', toBase: 1, fromBase: 1 },
        { id: 'hpa', name: 'Hectopascal (hPa)', toBase: 100, fromBase: 0.01 },
        { id: 'kpa', name: 'Kilopascal (kPa)', toBase: 1000, fromBase: 0.001 },
        { id: 'mpa', name: 'Megapascal (MPa)', toBase: 1000000, fromBase: 0.000001 },
        { id: 'bar', name: 'Bar', toBase: 100000, fromBase: 0.00001 },
        { id: 'atm', name: 'Atmosphere (atm)', toBase: 101325, fromBase: 0.00000986923 },
        { id: 'mmhg', name: 'mmHg', toBase: 133.322, fromBase: 0.00750062 },
        { id: 'psi', name: 'PSI', toBase: 6894.76, fromBase: 0.000145038 }
      ]
    }
  ];

  // Special handling for temperature conversions
  const convertTemperature = (value: number, from: string, to: string): number => {
    let result = 0;
    
    // Convert to Celsius first
    if (from === 'f') {
      // (°F - 32) × 5/9 = °C
      value = (value - 32) * 5/9;
    } else if (from === 'k') {
      // K - 273.15 = °C
      value = value - 273.15;
    }
    
    // Now convert from Celsius to the target unit
    if (to === 'c') {
      result = value;
    } else if (to === 'f') {
      // (°C × 9/5) + 32 = °F
      result = (value * 9/5) + 32;
    } else if (to === 'k') {
      // °C + 273.15 = K
      result = value + 273.15;
    }
    
    return result;
  };

  // Set initial units based on category
  useEffect(() => {
    const currentCategory = categories.find(c => c.id === category);
    if (currentCategory && currentCategory.units.length > 0) {
      setFromUnit(currentCategory.units[0].id);
      setToUnit(currentCategory.units.length > 1 ? currentCategory.units[1].id : currentCategory.units[0].id);
    }
  }, [category]);

  const handleConvert = () => {
    if (!value || !fromUnit || !toUnit) {
      setResult('Please provide all fields');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Please enter a valid number');
      return;
    }

    const currentCategory = categories.find(c => c.id === category);
    if (!currentCategory) {
      setResult('Category not found');
      return;
    }

    // Find conversion units
    const fromUnitData = currentCategory.units.find(u => u.id === fromUnit);
    const toUnitData = currentCategory.units.find(u => u.id === toUnit);

    if (!fromUnitData || !toUnitData) {
      setResult('Unit not found');
      return;
    }

    let calculatedResult: number;
    
    // Special handling for temperature
    if (category === 'temperature') {
      calculatedResult = convertTemperature(numValue, fromUnit, toUnit);
    } else {
      // For other units, convert to base unit then to target unit
      const valueInBaseUnit = numValue * fromUnitData.toBase;
      calculatedResult = valueInBaseUnit * toUnitData.fromBase;
    }

    // Format the result based on the precision needed
    let formattedResult: string;
    if (Math.abs(calculatedResult) < 0.000001 || Math.abs(calculatedResult) >= 1000000) {
      formattedResult = calculatedResult.toExponential(6);
    } else {
      // Determine significant digits based on the input value's precision
      const inputPrecision = value.includes('.') ? 
        value.split('.')[1].length : 
        0;
      
      formattedResult = calculatedResult.toFixed(Math.max(inputPrecision, 6));
      // Remove trailing zeros after decimal point
      formattedResult = formattedResult.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    }

    // Set the result
    setResult(formattedResult);

    // Add to history
    const fromUnitName = fromUnitData.name.split(' ')[0];
    const toUnitName = toUnitData.name.split(' ')[0];
    setHistory(prev => [{
      from: fromUnitName,
      to: toUnitName,
      value: value,
      result: formattedResult,
      category: currentCategory.name
    }, ...prev.slice(0, 9)]); // Keep only the 10 most recent conversions
  };

  const handleClear = () => {
    setValue('');
    setResult('');
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    
    // If we already have a result, swap the input and result
    if (result) {
      setValue(result);
      handleConvert();
    }
  };

  const loadFromHistory = (item: { from: string; to: string; value: string; result: string; category: string }) => {
    // Find the category
    const cat = categories.find(c => c.name === item.category)?.id || 'length';
    setCategory(cat);
    
    // Find the units in the category
    const currentCategory = categories.find(c => c.id === cat);
    if (currentCategory) {
      const from = currentCategory.units.find(u => u.name.startsWith(item.from))?.id || '';
      const to = currentCategory.units.find(u => u.name.startsWith(item.to))?.id || '';
      
      setTimeout(() => {
        setFromUnit(from);
        setToUnit(to);
        setValue(item.value);
        setResult(item.result);
      }, 0);
    }
  };

  // Get current category
  const currentCategory = categories.find(c => c.id === category);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Unit Converter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Category Selection */}
        <div className="md:col-span-1 bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    category === cat.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Converter */}
        <div className="md:col-span-4 bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {currentCategory ? currentCategory.name : 'Length'} Converter
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input value */}
              <div>
                <label htmlFor="fromValue" className="label">Value</label>
                <input
                  id="fromValue"
                  type="text"
                  className="input w-full"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              
              {/* Result */}
              <div>
                <label htmlFor="toValue" className="label">Result</label>
                <input
                  id="toValue"
                  type="text"
                  className="input w-full"
                  value={result}
                  readOnly
                  placeholder="Result"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* From unit */}
              <div>
                <label htmlFor="fromUnit" className="label">From</label>
                <select
                  id="fromUnit"
                  className="input w-full"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {currentCategory?.units.map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Swap button */}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
                  onClick={handleSwap}
                  title="Swap units"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
              
              {/* To unit */}
              <div>
                <label htmlFor="toUnit" className="label">To</label>
                <select
                  id="toUnit"
                  className="input w-full"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {currentCategory?.units.map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Buttons */}
              <div className="flex space-x-2">
                <button
                  className="btn-primary flex-1"
                  onClick={handleConvert}
                >
                  Convert
                </button>
                <button
                  className="btn-secondary flex-1"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Section */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Conversions</h2>
          <button
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showHistory && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">From</th>
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Value</th>
                  <th className="px-4 py-2 text-left">Result</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="px-4 py-2">{item.category}</td>
                      <td className="px-4 py-2">{item.from}</td>
                      <td className="px-4 py-2">{item.to}</td>
                      <td className="px-4 py-2">{item.value}</td>
                      <td className="px-4 py-2">{item.result}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-indigo-400 hover:text-indigo-300"
                          onClick={() => loadFromHistory(item)}
                        >
                          Load
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-2 text-center text-gray-400">
                      No conversion history yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Formula explanation */}
      <div className="mt-6 bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">About Unit Conversion</h2>
        <p className="text-gray-300 mb-4">
          Unit conversion is the process of changing a value from one unit of measurement to another. 
          This tool supports a wide range of conversions across multiple categories including
          length, mass, temperature, area, volume, speed, time, data, and pressure.
        </p>
        
        {category === 'temperature' && (
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Temperature Conversion Formulas:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Celsius to Fahrenheit: (°C × 9/5) + 32 = °F</li>
              <li>Fahrenheit to Celsius: (°F - 32) × 5/9 = °C</li>
              <li>Celsius to Kelvin: °C + 273.15 = K</li>
              <li>Kelvin to Celsius: K - 273.15 = °C</li>
              <li>Fahrenheit to Kelvin: (°F - 32) × 5/9 + 273.15 = K</li>
              <li>Kelvin to Fahrenheit: (K - 273.15) × 9/5 + 32 = °F</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter; 