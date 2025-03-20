import React, { useState, useEffect } from 'react';

interface UnitOption {
  name: string;
  value: string;
  conversion: number; // Conversion factor relative to base unit
}

interface UnitCategory {
  name: string;
  baseUnit: string;
  units: UnitOption[];
}

const UnitConverter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [recentConversions, setRecentConversions] = useState<string[]>([]);

  // Unit definitions
  const unitCategories: UnitCategory[] = [
    {
      name: 'length',
      baseUnit: 'meter',
      units: [
        { name: 'Millimeter (mm)', value: 'millimeter', conversion: 0.001 },
        { name: 'Centimeter (cm)', value: 'centimeter', conversion: 0.01 },
        { name: 'Meter (m)', value: 'meter', conversion: 1 },
        { name: 'Kilometer (km)', value: 'kilometer', conversion: 1000 },
        { name: 'Inch (in)', value: 'inch', conversion: 0.0254 },
        { name: 'Foot (ft)', value: 'foot', conversion: 0.3048 },
        { name: 'Yard (yd)', value: 'yard', conversion: 0.9144 },
        { name: 'Mile (mi)', value: 'mile', conversion: 1609.344 }
      ]
    },
    {
      name: 'mass',
      baseUnit: 'kilogram',
      units: [
        { name: 'Milligram (mg)', value: 'milligram', conversion: 0.000001 },
        { name: 'Gram (g)', value: 'gram', conversion: 0.001 },
        { name: 'Kilogram (kg)', value: 'kilogram', conversion: 1 },
        { name: 'Metric Ton (t)', value: 'ton', conversion: 1000 },
        { name: 'Ounce (oz)', value: 'ounce', conversion: 0.0283495 },
        { name: 'Pound (lb)', value: 'pound', conversion: 0.453592 }
      ]
    },
    {
      name: 'temperature',
      baseUnit: 'kelvin',
      units: [
        { name: 'Celsius (°C)', value: 'celsius', conversion: 1 },
        { name: 'Fahrenheit (°F)', value: 'fahrenheit', conversion: 1 },
        { name: 'Kelvin (K)', value: 'kelvin', conversion: 1 }
      ]
    },
    {
      name: 'time',
      baseUnit: 'second',
      units: [
        { name: 'Millisecond (ms)', value: 'millisecond', conversion: 0.001 },
        { name: 'Second (s)', value: 'second', conversion: 1 },
        { name: 'Minute (min)', value: 'minute', conversion: 60 },
        { name: 'Hour (h)', value: 'hour', conversion: 3600 },
        { name: 'Day (d)', value: 'day', conversion: 86400 },
        { name: 'Week (wk)', value: 'week', conversion: 604800 },
        { name: 'Month (30 days)', value: 'month', conversion: 2592000 },
        { name: 'Year (365 days)', value: 'year', conversion: 31536000 }
      ]
    },
    {
      name: 'area',
      baseUnit: 'square_meter',
      units: [
        { name: 'Square Millimeter (mm²)', value: 'square_millimeter', conversion: 0.000001 },
        { name: 'Square Centimeter (cm²)', value: 'square_centimeter', conversion: 0.0001 },
        { name: 'Square Meter (m²)', value: 'square_meter', conversion: 1 },
        { name: 'Hectare (ha)', value: 'hectare', conversion: 10000 },
        { name: 'Square Kilometer (km²)', value: 'square_kilometer', conversion: 1000000 },
        { name: 'Square Inch (in²)', value: 'square_inch', conversion: 0.00064516 },
        { name: 'Square Foot (ft²)', value: 'square_foot', conversion: 0.092903 },
        { name: 'Square Yard (yd²)', value: 'square_yard', conversion: 0.836127 },
        { name: 'Acre', value: 'acre', conversion: 4046.86 },
        { name: 'Square Mile (mi²)', value: 'square_mile', conversion: 2589988.11 }
      ]
    },
    {
      name: 'volume',
      baseUnit: 'cubic_meter',
      units: [
        { name: 'Cubic Centimeter (cm³)', value: 'cubic_centimeter', conversion: 0.000001 },
        { name: 'Milliliter (mL)', value: 'milliliter', conversion: 0.000001 },
        { name: 'Liter (L)', value: 'liter', conversion: 0.001 },
        { name: 'Cubic Meter (m³)', value: 'cubic_meter', conversion: 1 },
        { name: 'Gallon (US)', value: 'gallon_us', conversion: 0.00378541 },
        { name: 'Quart (US)', value: 'quart_us', conversion: 0.000946353 },
        { name: 'Pint (US)', value: 'pint_us', conversion: 0.000473176 },
        { name: 'Cup (US)', value: 'cup_us', conversion: 0.000236588 },
        { name: 'Fluid Ounce (US)', value: 'fluid_ounce_us', conversion: 0.0000295735 }
      ]
    },
    {
      name: 'speed',
      baseUnit: 'meter_per_second',
      units: [
        { name: 'Meter per Second (m/s)', value: 'meter_per_second', conversion: 1 },
        { name: 'Kilometer per Hour (km/h)', value: 'kilometer_per_hour', conversion: 0.277778 },
        { name: 'Mile per Hour (mph)', value: 'mile_per_hour', conversion: 0.44704 },
        { name: 'Foot per Second (ft/s)', value: 'foot_per_second', conversion: 0.3048 },
        { name: 'Knot (kn)', value: 'knot', conversion: 0.514444 }
      ]
    },
    {
      name: 'pressure',
      baseUnit: 'pascal',
      units: [
        { name: 'Pascal (Pa)', value: 'pascal', conversion: 1 },
        { name: 'Kilopascal (kPa)', value: 'kilopascal', conversion: 1000 },
        { name: 'Bar', value: 'bar', conversion: 100000 },
        { name: 'Atmosphere (atm)', value: 'atmosphere', conversion: 101325 },
        { name: 'Millimeter of Mercury (mmHg)', value: 'millimeter_mercury', conversion: 133.322 },
        { name: 'Inch of Mercury (inHg)', value: 'inch_mercury', conversion: 3386.39 },
        { name: 'Pound per Square Inch (psi)', value: 'psi', conversion: 6894.76 }
      ]
    },
    {
      name: 'energy',
      baseUnit: 'joule',
      units: [
        { name: 'Joule (J)', value: 'joule', conversion: 1 },
        { name: 'Kilojoule (kJ)', value: 'kilojoule', conversion: 1000 },
        { name: 'Calorie (cal)', value: 'calorie', conversion: 4.184 },
        { name: 'Kilocalorie (kcal)', value: 'kilocalorie', conversion: 4184 },
        { name: 'Watt-hour (Wh)', value: 'watt_hour', conversion: 3600 },
        { name: 'Kilowatt-hour (kWh)', value: 'kilowatt_hour', conversion: 3600000 },
        { name: 'Electronvolt (eV)', value: 'electronvolt', conversion: 1.602176634e-19 },
        { name: 'British Thermal Unit (BTU)', value: 'btu', conversion: 1055.06 }
      ]
    }
  ];

  // Initialize default units based on selected category
  useEffect(() => {
    const category = unitCategories.find(cat => cat.name === selectedCategory);
    if (category && category.units.length >= 2) {
      setFromUnit(category.units[0].value);
      setToUnit(category.units[1].value);
      setInputValue('');
      setResult('');
    }
  }, [selectedCategory]);

  // Convert between units
  const convertUnits = () => {
    if (!inputValue || !fromUnit || !toUnit) return;

    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setResult('Please enter a valid number');
      return;
    }

    const category = unitCategories.find(cat => cat.name === selectedCategory);
    if (!category) return;

    const fromUnitInfo = category.units.find(unit => unit.value === fromUnit);
    const toUnitInfo = category.units.find(unit => unit.value === toUnit);
    
    if (!fromUnitInfo || !toUnitInfo) return;

    let result: number;

    // Special case for temperature
    if (selectedCategory === 'temperature') {
      // Convert to Kelvin first (our base unit for temperature)
      let kelvinValue: number;
      
      if (fromUnit === 'celsius') {
        kelvinValue = numericValue + 273.15;
      } else if (fromUnit === 'fahrenheit') {
        kelvinValue = (numericValue - 32) * 5/9 + 273.15;
      } else { // kelvin
        kelvinValue = numericValue;
      }
      
      // Convert from Kelvin to target unit
      if (toUnit === 'celsius') {
        result = kelvinValue - 273.15;
      } else if (toUnit === 'fahrenheit') {
        result = (kelvinValue - 273.15) * 9/5 + 32;
      } else { // kelvin
        result = kelvinValue;
      }
    } else {
      // For other unit types, we use the conversion factors
      // Convert from source unit to base unit, then to target unit
      const valueInBaseUnit = numericValue * fromUnitInfo.conversion;
      result = valueInBaseUnit / toUnitInfo.conversion;
    }

    // Format result based on magnitude
    let formattedResult: string;
    if (Math.abs(result) < 0.0001 || Math.abs(result) > 10000) {
      formattedResult = result.toExponential(6);
    } else {
      formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
    }

    setResult(formattedResult);
    
    // Add to recent conversions
    const conversionString = `${numericValue} ${fromUnitInfo.name} = ${formattedResult} ${toUnitInfo.name}`;
    setRecentConversions(prev => [conversionString, ...prev.slice(0, 4)]);
  };

  // Swap the "from" and "to" units
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Unit Converter
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Unit selection */}
        <div className="space-y-6">
          {/* Category Selection */}
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">Select Category</h2>
            <div className="grid grid-cols-2 gap-2">
              {unitCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-butterfly-purple-500 text-white'
                      : 'bg-butterfly-blue-800/50 text-gray-300 hover:bg-butterfly-blue-700/50'
                  }`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Conversions */}
          {recentConversions.length > 0 && (
            <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
              <h2 className="text-xl font-semibold mb-4 text-white">Recent Conversions</h2>
              <ul className="space-y-2">
                {recentConversions.map((conversion, index) => (
                  <li key={index} className="text-gray-300 text-sm py-2 border-b border-butterfly-blue-700/30">
                    {conversion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right side - Conversion */}
        <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
          <h2 className="text-xl font-semibold mb-4 text-white">Convert</h2>
          
          <div className="space-y-4">
            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
              >
                {unitCategories
                  .find(cat => cat.name === selectedCategory)?.units
                  .map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.name}</option>
                  ))}
              </select>
            </div>
            
            {/* Value Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Value</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
                placeholder="Enter value"
              />
            </div>
            
            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-2 rounded-full bg-butterfly-blue-800/50 hover:bg-butterfly-blue-700/50 transition-colors duration-200"
                title="Swap units"
              >
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            
            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
              >
                {unitCategories
                  .find(cat => cat.name === selectedCategory)?.units
                  .map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.name}</option>
                  ))}
              </select>
            </div>
            
            {/* Convert Button */}
            <button
              onClick={convertUnits}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white font-medium transition-all duration-200 hover:from-butterfly-purple-600 hover:to-butterfly-pink-600"
            >
              Convert
            </button>
            
            {/* Result */}
            {result && (
              <div className="mt-4 p-4 bg-butterfly-blue-800/50 rounded-lg">
                <div className="text-sm text-gray-300">Result:</div>
                <div className="text-2xl font-bold text-white">{result}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter; 