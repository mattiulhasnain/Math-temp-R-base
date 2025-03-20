import React, { useState } from 'react';
import { evaluateExpression, formatNumber } from '../utils/mathFunctions';

type CalculatorType = 'kinematics' | 'forces' | 'energy' | 'waves';

interface PhysicsFormula {
  name: string;
  formula: string;
  variables: { [key: string]: string };
    unit: string;
}

const PhysicsCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('kinematics');
  const [selectedFormula, setSelectedFormula] = useState<string>('');
  const [variables, setVariables] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formulas: { [K in CalculatorType]: PhysicsFormula[] } = {
    kinematics: [
      {
        name: 'Final Velocity',
        formula: 'v = u + at',
        variables: {
          v: 'Final velocity (m/s)',
          u: 'Initial velocity (m/s)',
          a: 'Acceleration (m/s²)',
          t: 'Time (s)'
        },
        unit: 'm/s'
      },
      {
        name: 'Distance',
        formula: 's = ut + (1/2)at²',
        variables: {
          s: 'Distance (m)',
          u: 'Initial velocity (m/s)',
          a: 'Acceleration (m/s²)',
          t: 'Time (s)'
        },
        unit: 'm'
      }
    ],
    forces: [
      {
        name: "Newton's Second Law",
    formula: 'F = ma',
        variables: {
          F: 'Force (N)',
          m: 'Mass (kg)',
          a: 'Acceleration (m/s²)'
        },
        unit: 'N'
      },
      {
        name: 'Weight',
        formula: 'W = mg',
        variables: {
          W: 'Weight (N)',
          m: 'Mass (kg)',
          g: 'Gravitational acceleration (m/s²)'
        },
        unit: 'N'
      }
    ],
    energy: [
  {
    name: 'Kinetic Energy',
        formula: 'KE = (1/2)mv²',
        variables: {
          KE: 'Kinetic Energy (J)',
          m: 'Mass (kg)',
          v: 'Velocity (m/s)'
        },
        unit: 'J'
  },
  {
    name: 'Potential Energy',
    formula: 'PE = mgh',
        variables: {
          PE: 'Potential Energy (J)',
          m: 'Mass (kg)',
          g: 'Gravitational acceleration (m/s²)',
          h: 'Height (m)'
        },
        unit: 'J'
      }
    ],
    waves: [
  {
    name: 'Wave Speed',
        formula: 'v = fλ',
        variables: {
          v: 'Wave speed (m/s)',
          f: 'Frequency (Hz)',
          λ: 'Wavelength (m)'
        },
        unit: 'm/s'
      },
      {
        name: 'Wave Period',
        formula: 'T = 1/f',
        variables: {
          T: 'Period (s)',
          f: 'Frequency (Hz)'
        },
        unit: 's'
      }
    ]
  };

  const handleCalculatorTypeChange = (type: CalculatorType) => {
    setCalculatorType(type);
    setSelectedFormula('');
    setVariables({});
    setResult('');
    setError(null);
  };

  const handleFormulaChange = (formulaName: string) => {
    setSelectedFormula(formulaName);
    setVariables({});
    setResult('');
    setError(null);
  };

  const handleVariableChange = (variable: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const calculateResult = () => {
    const formula = formulas[calculatorType].find(f => f.name === selectedFormula);
    if (!formula) return;

    try {
      // Convert formula string to evaluatable expression
      let expression = formula.formula.split('=')[1].trim();
      
      // Replace variables with values
      Object.keys(formula.variables).forEach(variable => {
        if (!variables[variable]) {
          throw new Error(`Please enter a value for ${formula.variables[variable]}`);
        }
        expression = expression.replace(new RegExp(variable, 'g'), variables[variable]);
      });

      const result = evaluateExpression(expression);
      setResult(`${formatNumber(result)} ${formula.unit}`);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Physics Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Calculator Type Selection */}
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">Select Category</h2>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(formulas) as CalculatorType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleCalculatorTypeChange(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    calculatorType === type
                      ? 'bg-butterfly-purple-500 text-white'
                      : 'bg-butterfly-blue-800/50 text-gray-300 hover:bg-butterfly-blue-700/50'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
        </div>

          {/* Formula Selection */}
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">Select Formula</h2>
            <div className="space-y-2">
              {formulas[calculatorType].map((formula) => (
                <button
                  key={formula.name}
                  onClick={() => handleFormulaChange(formula.name)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    selectedFormula === formula.name
                      ? 'bg-butterfly-purple-500 text-white'
                      : 'bg-butterfly-blue-800/50 text-gray-300 hover:bg-butterfly-blue-700/50'
                  }`}
                >
                  <div className="font-medium">{formula.name}</div>
                  <div className="text-sm opacity-75">{formula.formula}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
          <h2 className="text-xl font-semibold mb-4 text-white">Calculate</h2>
          
          {selectedFormula ? (
            <div className="space-y-6">
              {/* Variables Input */}
              <div className="space-y-4">
                {Object.entries(formulas[calculatorType]
                  .find(f => f.name === selectedFormula)?.variables || {})
                  .map(([variable, description]) => (
                    <div key={variable}>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {description}
              </label>
                <input
                  type="number"
                        value={variables[variable] || ''}
                        onChange={(e) => handleVariableChange(variable, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
                        placeholder="Enter value"
                        step="any"
                      />
            </div>
          ))}
        </div>

              {/* Calculate Button */}
        <button
          onClick={calculateResult}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white font-medium transition-all duration-200 hover:from-butterfly-purple-600 hover:to-butterfly-pink-600"
        >
          Calculate
        </button>

              {/* Result */}
              {result && (
                <div className="mt-4 p-4 bg-butterfly-blue-800/50 rounded-lg">
                  <div className="text-sm text-gray-300">Result:</div>
                  <div className="text-2xl font-bold text-white">{result}</div>
          </div>
        )}

              {/* Error */}
              {error && (
                <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
                  {error}
            </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              Select a formula to start calculating
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicsCalculator; 