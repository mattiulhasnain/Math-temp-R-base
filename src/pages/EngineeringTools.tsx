import React, { useState } from 'react';
import { formatNumber } from '../utils/mathFunctions';

type ToolType = 'ohms-law' | 'stress-strain' | 'beam-calculator' | 'unit-converter';

interface ConversionCategory {
  id: string;
  name: string;
  units: { id: string; name: string; toBase: number; fromBase: number }[];
}

const EngineeringTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType>('ohms-law');
  
  // Ohm's Law Calculator
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');
  
  // Stress and Strain Calculator
  const [force, setForce] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [stress, setStress] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [deltaLength, setDeltaLength] = useState<string>('');
  const [strain, setStrain] = useState<string>('');
  const [youngsModulus, setYoungsModulus] = useState<string>('');
  
  // Beam Calculator
  const [beamLoad, setBeamLoad] = useState<string>('');
  const [beamLength, setBeamLength] = useState<string>('');
  const [beamInertia, setBeamInertia] = useState<string>('');
  const [beamModulus, setBeamModulus] = useState<string>('');
  const [beamDeflection, setBeamDeflection] = useState<string>('');
  const [beamStress, setBeamStress] = useState<string>('');
  
  // Unit Converter
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [conversionResult, setConversionResult] = useState<string>('');
  const [conversionCategory, setConversionCategory] = useState<string>('length');
  
  const conversionCategories: ConversionCategory[] = [
    {
      id: 'length',
      name: 'Length',
      units: [
        { id: 'm', name: 'Meter (m)', toBase: 1, fromBase: 1 },
        { id: 'cm', name: 'Centimeter (cm)', toBase: 0.01, fromBase: 100 },
        { id: 'mm', name: 'Millimeter (mm)', toBase: 0.001, fromBase: 1000 },
        { id: 'km', name: 'Kilometer (km)', toBase: 1000, fromBase: 0.001 },
        { id: 'in', name: 'Inch (in)', toBase: 0.0254, fromBase: 39.3701 },
        { id: 'ft', name: 'Foot (ft)', toBase: 0.3048, fromBase: 3.28084 },
        { id: 'yd', name: 'Yard (yd)', toBase: 0.9144, fromBase: 1.09361 },
        { id: 'mi', name: 'Mile (mi)', toBase: 1609.34, fromBase: 0.000621371 },
      ],
    },
    {
      id: 'mass',
      name: 'Mass',
      units: [
        { id: 'kg', name: 'Kilogram (kg)', toBase: 1, fromBase: 1 },
        { id: 'g', name: 'Gram (g)', toBase: 0.001, fromBase: 1000 },
        { id: 'mg', name: 'Milligram (mg)', toBase: 0.000001, fromBase: 1000000 },
        { id: 'ton', name: 'Metric Ton (t)', toBase: 1000, fromBase: 0.001 },
        { id: 'lb', name: 'Pound (lb)', toBase: 0.453592, fromBase: 2.20462 },
        { id: 'oz', name: 'Ounce (oz)', toBase: 0.0283495, fromBase: 35.274 },
      ],
    },
    {
      id: 'temperature',
      name: 'Temperature',
      units: [
        { id: 'c', name: 'Celsius (°C)', toBase: 1, fromBase: 1 },
        { id: 'f', name: 'Fahrenheit (°F)', toBase: 0, fromBase: 0 }, // Special handling
        { id: 'k', name: 'Kelvin (K)', toBase: 0, fromBase: 0 }, // Special handling
      ],
    },
    {
      id: 'pressure',
      name: 'Pressure',
      units: [
        { id: 'pa', name: 'Pascal (Pa)', toBase: 1, fromBase: 1 },
        { id: 'kpa', name: 'Kilopascal (kPa)', toBase: 1000, fromBase: 0.001 },
        { id: 'mpa', name: 'Megapascal (MPa)', toBase: 1000000, fromBase: 0.000001 },
        { id: 'bar', name: 'Bar', toBase: 100000, fromBase: 0.00001 },
        { id: 'psi', name: 'PSI', toBase: 6894.76, fromBase: 0.000145038 },
        { id: 'atm', name: 'Atmosphere (atm)', toBase: 101325, fromBase: 9.86923e-6 },
      ],
    },
  ];
  
  const calculateOhmsLaw = (solveFor: 'voltage' | 'current' | 'resistance' | 'power') => {
    try {
      const v = voltage ? parseFloat(voltage) : null;
      const i = current ? parseFloat(current) : null;
      const r = resistance ? parseFloat(resistance) : null;
      const p = power ? parseFloat(power) : null;
      
      switch (solveFor) {
        case 'voltage':
          if (i && r) {
            setVoltage(formatNumber(i * r));
            setPower(formatNumber(i * i * r));
          } else if (p && i) {
            setVoltage(formatNumber(p / i));
            setResistance(formatNumber(p / (i * i)));
          } else if (p && r) {
            setVoltage(formatNumber(Math.sqrt(p * r)));
            setCurrent(formatNumber(Math.sqrt(p / r)));
          }
          break;
        case 'current':
          if (v && r) {
            setCurrent(formatNumber(v / r));
            setPower(formatNumber(v * v / r));
          } else if (p && v) {
            setCurrent(formatNumber(p / v));
            setResistance(formatNumber(v * v / p));
          } else if (p && r) {
            setCurrent(formatNumber(Math.sqrt(p / r)));
            setVoltage(formatNumber(Math.sqrt(p * r)));
          }
          break;
        case 'resistance':
          if (v && i) {
            setResistance(formatNumber(v / i));
            setPower(formatNumber(v * i));
          } else if (p && i) {
            setResistance(formatNumber(p / (i * i)));
            setVoltage(formatNumber(p / i));
          } else if (p && v) {
            setResistance(formatNumber(v * v / p));
            setCurrent(formatNumber(p / v));
          }
          break;
        case 'power':
          if (v && i) {
            setPower(formatNumber(v * i));
            setResistance(formatNumber(v / i));
          } else if (v && r) {
            setPower(formatNumber(v * v / r));
            setCurrent(formatNumber(v / r));
          } else if (i && r) {
            setPower(formatNumber(i * i * r));
            setVoltage(formatNumber(i * r));
          }
          break;
      }
    } catch (error) {
      console.error('Error calculating Ohm\'s Law', error);
    }
  };
  
  const calculateStressStrain = (solveFor: 'stress' | 'strain' | 'modulus') => {
    try {
      const f = force ? parseFloat(force) : null;
      const a = area ? parseFloat(area) : null;
      const s = stress ? parseFloat(stress) : null;
      const l = length ? parseFloat(length) : null;
      const dl = deltaLength ? parseFloat(deltaLength) : null;
      const e = strain ? parseFloat(strain) : null;
      const ym = youngsModulus ? parseFloat(youngsModulus) : null;
      
      switch (solveFor) {
        case 'stress':
          if (f && a) {
            setStress(formatNumber(f / a));
            if (e) {
              setYoungsModulus(formatNumber((f / a) / e));
            }
          } else if (ym && e) {
            setStress(formatNumber(ym * e));
            if (a) {
              setForce(formatNumber(ym * e * a));
            }
          }
          break;
        case 'strain':
          if (dl && l) {
            setStrain(formatNumber(dl / l));
            if (s) {
              setYoungsModulus(formatNumber(s / (dl / l)));
            }
          } else if (s && ym) {
            setStrain(formatNumber(s / ym));
            if (l) {
              setDeltaLength(formatNumber((s / ym) * l));
            }
          }
          break;
        case 'modulus':
          if (s && e) {
            setYoungsModulus(formatNumber(s / e));
          }
          break;
      }
    } catch (error) {
      console.error('Error calculating Stress and Strain', error);
    }
  };
  
  const calculateBeam = () => {
    try {
      const load = parseFloat(beamLoad);
      const length = parseFloat(beamLength);
      const inertia = parseFloat(beamInertia);
      const modulus = parseFloat(beamModulus);
      
      if (isNaN(load) || isNaN(length) || isNaN(inertia) || isNaN(modulus)) {
        return;
      }
      
      // Simple beam with uniform load
      // Maximum deflection at center
      const maxDeflection = (5 * load * Math.pow(length, 4)) / (384 * modulus * inertia);
      setBeamDeflection(formatNumber(maxDeflection));
      
      // Maximum bending stress
      const maxMoment = (load * Math.pow(length, 2)) / 8;
      const maxStress = (maxMoment * (length / 2)) / inertia;
      setBeamStress(formatNumber(maxStress));
    } catch (error) {
      console.error('Error calculating Beam', error);
    }
  };
  
  const convertUnit = () => {
    try {
      const value = parseFloat(fromValue);
      if (isNaN(value)) {
        setConversionResult('');
        return;
      }
      
      const category = conversionCategories.find(c => c.id === conversionCategory);
      if (!category) {
        setConversionResult('Invalid category');
        return;
      }
      
      const fromUnitInfo = category.units.find(u => u.id === fromUnit);
      const toUnitInfo = category.units.find(u => u.id === toUnit);
      
      if (!fromUnitInfo || !toUnitInfo) {
        setConversionResult('Invalid unit selection');
        return;
      }
      
      // Special handling for temperature
      if (category.id === 'temperature') {
        let result: number;
        
        if (fromUnit === 'c' && toUnit === 'f') {
          result = (value * 9/5) + 32;
        } else if (fromUnit === 'c' && toUnit === 'k') {
          result = value + 273.15;
        } else if (fromUnit === 'f' && toUnit === 'c') {
          result = (value - 32) * 5/9;
        } else if (fromUnit === 'f' && toUnit === 'k') {
          result = (value - 32) * 5/9 + 273.15;
        } else if (fromUnit === 'k' && toUnit === 'c') {
          result = value - 273.15;
        } else if (fromUnit === 'k' && toUnit === 'f') {
          result = (value - 273.15) * 9/5 + 32;
        } else { // Same unit
          result = value;
        }
        
        setConversionResult(formatNumber(result));
      } else {
        // For other categories, convert to base unit then to target unit
        const baseValue = value * fromUnitInfo.toBase;
        const result = baseValue * toUnitInfo.fromBase;
        setConversionResult(formatNumber(result));
      }
    } catch (error) {
      console.error('Error converting units', error);
      setConversionResult('Conversion error');
    }
  };
  
  const resetValues = () => {
    switch (selectedTool) {
      case 'ohms-law':
        setVoltage('');
        setCurrent('');
        setResistance('');
        setPower('');
        break;
      case 'stress-strain':
        setForce('');
        setArea('');
        setStress('');
        setLength('');
        setDeltaLength('');
        setStrain('');
        setYoungsModulus('');
        break;
      case 'beam-calculator':
        setBeamLoad('');
        setBeamLength('');
        setBeamInertia('');
        setBeamModulus('');
        setBeamDeflection('');
        setBeamStress('');
        break;
      case 'unit-converter':
        setFromValue('');
        setConversionResult('');
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Engineering Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          className={`p-3 rounded-lg ${
            selectedTool === 'ohms-law'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTool('ohms-law')}
        >
          Ohm's Law
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTool === 'stress-strain'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTool('stress-strain')}
        >
          Stress & Strain
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTool === 'beam-calculator'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTool('beam-calculator')}
        >
          Beam Calculator
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedTool === 'unit-converter'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedTool('unit-converter')}
        >
          Unit Converter
        </button>
      </div>
      
      {/* Ohm's Law Calculator */}
      {selectedTool === 'ohms-law' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Ohm's Law Calculator</h2>
          <p className="text-gray-300 mb-4">
            Calculate voltage, current, resistance, and power using Ohm's Law (V = IR) and the power formula (P = VI).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Voltage (V)</label>
              <input
                type="text"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="input w-full"
                placeholder="Enter voltage in volts"
              />
            </div>
            <div>
              <label className="label">Current (I)</label>
              <input
                type="text"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="input w-full"
                placeholder="Enter current in amps"
              />
            </div>
            <div>
              <label className="label">Resistance (R)</label>
              <input
                type="text"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="input w-full"
                placeholder="Enter resistance in ohms"
              />
            </div>
            <div>
              <label className="label">Power (P)</label>
              <input
                type="text"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="input w-full"
                placeholder="Enter power in watts"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <button
              onClick={() => calculateOhmsLaw('voltage')}
              className="btn-primary"
            >
              Calculate V
            </button>
            <button
              onClick={() => calculateOhmsLaw('current')}
              className="btn-primary"
            >
              Calculate I
            </button>
            <button
              onClick={() => calculateOhmsLaw('resistance')}
              className="btn-primary"
            >
              Calculate R
            </button>
            <button
              onClick={() => calculateOhmsLaw('power')}
              className="btn-primary"
            >
              Calculate P
            </button>
          </div>
          
          <button
            onClick={resetValues}
            className="btn-secondary w-full mt-2"
          >
            Reset Values
          </button>
          
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Formulas</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>V = I × R (Voltage = Current × Resistance)</li>
              <li>I = V ÷ R (Current = Voltage ÷ Resistance)</li>
              <li>R = V ÷ I (Resistance = Voltage ÷ Current)</li>
              <li>P = V × I (Power = Voltage × Current)</li>
              <li>P = I² × R (Power = Current² × Resistance)</li>
              <li>P = V² ÷ R (Power = Voltage² ÷ Resistance)</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Stress and Strain Calculator */}
      {selectedTool === 'stress-strain' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Stress and Strain Calculator</h2>
          <p className="text-gray-300 mb-4">
            Calculate stress, strain, and Young's modulus for materials under load.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Force (F)</label>
              <input
                type="text"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                className="input w-full"
                placeholder="Enter force in newtons"
              />
            </div>
            <div>
              <label className="label">Area (A)</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input w-full"
                placeholder="Enter area in square meters"
              />
            </div>
            <div>
              <label className="label">Stress (σ)</label>
              <input
                type="text"
                value={stress}
                onChange={(e) => setStress(e.target.value)}
                className="input w-full"
                placeholder="Enter stress in pascals"
              />
            </div>
            <div>
              <label className="label">Original Length (L)</label>
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="input w-full"
                placeholder="Enter length in meters"
              />
            </div>
            <div>
              <label className="label">Change in Length (ΔL)</label>
              <input
                type="text"
                value={deltaLength}
                onChange={(e) => setDeltaLength(e.target.value)}
                className="input w-full"
                placeholder="Enter change in length in meters"
              />
            </div>
            <div>
              <label className="label">Strain (ε)</label>
              <input
                type="text"
                value={strain}
                onChange={(e) => setStrain(e.target.value)}
                className="input w-full"
                placeholder="Enter strain (unitless)"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Young's Modulus (E)</label>
              <input
                type="text"
                value={youngsModulus}
                onChange={(e) => setYoungsModulus(e.target.value)}
                className="input w-full"
                placeholder="Enter Young's modulus in pascals"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => calculateStressStrain('stress')}
              className="btn-primary"
            >
              Calculate Stress
            </button>
            <button
              onClick={() => calculateStressStrain('strain')}
              className="btn-primary"
            >
              Calculate Strain
            </button>
            <button
              onClick={() => calculateStressStrain('modulus')}
              className="btn-primary"
            >
              Calculate Young's Modulus
            </button>
          </div>
          
          <button
            onClick={resetValues}
            className="btn-secondary w-full mt-2"
          >
            Reset Values
          </button>
          
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Formulas</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>σ = F ÷ A (Stress = Force ÷ Area)</li>
              <li>ε = ΔL ÷ L (Strain = Change in Length ÷ Original Length)</li>
              <li>E = σ ÷ ε (Young's Modulus = Stress ÷ Strain)</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Beam Calculator */}
      {selectedTool === 'beam-calculator' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Beam Calculator</h2>
          <p className="text-gray-300 mb-4">
            Calculate deflection and stress in a simply supported beam with uniform load.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Load (w)</label>
              <input
                type="text"
                value={beamLoad}
                onChange={(e) => setBeamLoad(e.target.value)}
                className="input w-full"
                placeholder="Enter load in N/m"
              />
            </div>
            <div>
              <label className="label">Length (L)</label>
              <input
                type="text"
                value={beamLength}
                onChange={(e) => setBeamLength(e.target.value)}
                className="input w-full"
                placeholder="Enter length in meters"
              />
            </div>
            <div>
              <label className="label">Moment of Inertia (I)</label>
              <input
                type="text"
                value={beamInertia}
                onChange={(e) => setBeamInertia(e.target.value)}
                className="input w-full"
                placeholder="Enter moment of inertia in m⁴"
              />
            </div>
            <div>
              <label className="label">Elastic Modulus (E)</label>
              <input
                type="text"
                value={beamModulus}
                onChange={(e) => setBeamModulus(e.target.value)}
                className="input w-full"
                placeholder="Enter elastic modulus in Pa"
              />
            </div>
            <div>
              <label className="label">Maximum Deflection</label>
              <input
                type="text"
                value={beamDeflection}
                className="input w-full"
                readOnly
                placeholder="Calculated deflection"
              />
            </div>
            <div>
              <label className="label">Maximum Bending Stress</label>
              <input
                type="text"
                value={beamStress}
                className="input w-full"
                readOnly
                placeholder="Calculated stress"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={calculateBeam}
              className="btn-primary"
            >
              Calculate
            </button>
            <button
              onClick={resetValues}
              className="btn-secondary"
            >
              Reset Values
            </button>
          </div>
          
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Formulas</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Maximum Deflection = (5wL⁴) ÷ (384EI)</li>
              <li>Maximum Bending Moment = (wL²) ÷ 8</li>
              <li>Maximum Bending Stress = (M × c) ÷ I</li>
              <li>where c is the distance from neutral axis to extreme fiber</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Unit Converter */}
      {selectedTool === 'unit-converter' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Unit Converter</h2>
          <p className="text-gray-300 mb-4">
            Convert between different units of measurement.
          </p>
          
          <div className="mb-4">
            <label className="label">Category</label>
            <select
              className="input w-full"
              value={conversionCategory}
              onChange={(e) => {
                setConversionCategory(e.target.value);
                const category = conversionCategories.find(c => c.id === e.target.value);
                if (category && category.units.length > 0) {
                  setFromUnit(category.units[0].id);
                  setToUnit(category.units.length > 1 ? category.units[1].id : category.units[0].id);
                }
              }}
            >
              {conversionCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">From</label>
              <div className="flex">
                <input
                  type="text"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="input flex-1 rounded-r-none"
                  placeholder="Enter value"
                />
                <select
                  className="input rounded-l-none border-l-0"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {conversionCategories.find(c => c.id === conversionCategory)?.units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="label">To</label>
              <div className="flex">
                <input
                  type="text"
                  value={conversionResult}
                  className="input flex-1 rounded-r-none"
                  readOnly
                  placeholder="Conversion result"
                />
                <select
                  className="input rounded-l-none border-l-0"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {conversionCategories.find(c => c.id === conversionCategory)?.units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={convertUnit}
              className="btn-primary"
            >
              Convert
            </button>
            <button
              onClick={resetValues}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Enter values in the appropriate input fields for the selected tool</li>
          <li>Use decimal notation (e.g., 10.5) rather than fractions</li>
          <li>Make sure to use consistent units within each calculator</li>
          <li>Ohm's Law works for DC circuits and approximations for AC circuits</li>
          <li>Stress-strain calculations assume linear elastic behavior</li>
          <li>Beam calculations assume simple supports and uniform loading</li>
        </ul>
      </div>
    </div>
  );
};

export default EngineeringTools; 