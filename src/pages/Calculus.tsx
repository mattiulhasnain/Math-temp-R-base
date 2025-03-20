import React, { useState } from 'react';
import * as math from 'mathjs';
import { calculateDerivative, calculateDefiniteIntegral, formatNumber } from '../utils/mathFunctions';

type CalculusFunction = 'derivative' | 'integral' | 'limit';

const Calculus: React.FC = () => {
  const [function1, setFunction1] = useState<string>('x^2');
  const [variable, setVariable] = useState<string>('x');
  const [lowerBound, setLowerBound] = useState<string>('0');
  const [upperBound, setUpperBound] = useState<string>('1');
  const [limitPoint, setLimitPoint] = useState<string>('0');
  const [approach, setApproach] = useState<string>('both');
  const [selectedFunction, setSelectedFunction] = useState<CalculusFunction>('derivative');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const calculateResult = () => {
    setError(null);
    setSteps([]);
    try {
      switch (selectedFunction) {
        case 'derivative':
          handleDerivative();
          break;
        case 'integral':
          handleIntegral();
          break;
        case 'limit':
          handleLimit();
          break;
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
      setResult('');
    }
  };

  const handleDerivative = () => {
    setSteps([`Finding the derivative of f(${variable}) = ${function1} with respect to ${variable}`]);
    
    try {
      const result = calculateDerivative(function1, variable);
      setSteps(prev => [
        ...prev,
        `Apply differentiation rules to ${function1}`,
        `The derivative is: ${result}`
      ]);
      setResult(result);
    } catch (error) {
      throw new Error(`Could not calculate derivative: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleIntegral = () => {
    const lower = parseFloat(lowerBound);
    const upper = parseFloat(upperBound);
    
    if (isNaN(lower) || isNaN(upper)) {
      throw new Error('Please enter valid numeric bounds');
    }
    
    setSteps([
      `Finding the definite integral of f(${variable}) = ${function1}`,
      `Limits of integration: from ${lowerBound} to ${upperBound}`
    ]);
    
    try {
      const result = calculateDefiniteIntegral(function1, variable, lower, upper);
      setSteps(prev => [
        ...prev,
        `Apply numerical integration over [${lowerBound}, ${upperBound}]`,
        `The definite integral is approximately: ${formatNumber(result, 6)}`
      ]);
      setResult(formatNumber(result, 6));
    } catch (error) {
      throw new Error(`Could not calculate integral: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleLimit = () => {
    const point = parseFloat(limitPoint);
    
    if (isNaN(point)) {
      throw new Error('Please enter a valid limit point');
    }
    
    setSteps([
      `Finding the limit of f(${variable}) = ${function1} as ${variable} approaches ${limitPoint}`,
      `Approach direction: ${approach === 'both' ? 'both sides' : approach === 'left' ? 'from left' : 'from right'}`
    ]);
    
    try {
      // For demonstration, we'll use a simple substitution approach for limits
      // In a real-world application, you might need more sophisticated methods
      
      const epsilon = 1e-10;
      let resultValue: number;
      
      if (approach === 'left' || approach === 'both') {
        const leftValue = math.evaluate(function1, { [variable]: point - epsilon });
        setSteps(prev => [...prev, `Left-side approach: f(${point - epsilon}) ≈ ${leftValue}`]);
        
        if (approach === 'left') {
          resultValue = leftValue;
        }
      }
      
      if (approach === 'right' || approach === 'both') {
        const rightValue = math.evaluate(function1, { [variable]: point + epsilon });
        setSteps(prev => [...prev, `Right-side approach: f(${point + epsilon}) ≈ ${rightValue}`]);
        
        if (approach === 'right') {
          resultValue = rightValue;
        }
      }
      
      if (approach === 'both') {
        const leftValue = math.evaluate(function1, { [variable]: point - epsilon });
        const rightValue = math.evaluate(function1, { [variable]: point + epsilon });
        
        if (Math.abs(leftValue - rightValue) > 1e-6) {
          setSteps(prev => [...prev, `Warning: Left and right limits differ, limit may not exist`]);
          setResult('Limit may not exist');
          return;
        }
        
        resultValue = (leftValue + rightValue) / 2;
      } else {
        resultValue = math.evaluate(function1, { [variable]: approach === 'left' ? point - epsilon : point + epsilon });
      }
      
      setSteps(prev => [...prev, `The limit as ${variable} → ${limitPoint} is: ${formatNumber(resultValue, 6)}`]);
      setResult(formatNumber(resultValue, 6));
    } catch (error) {
      throw new Error(`Could not calculate limit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calculus Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          className={`p-3 rounded-lg ${
            selectedFunction === 'derivative' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedFunction('derivative')}
        >
          Derivative
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedFunction === 'integral' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedFunction('integral')}
        >
          Definite Integral
        </button>
        <button
          className={`p-3 rounded-lg ${
            selectedFunction === 'limit' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedFunction('limit')}
        >
          Limit
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <div className="mb-4">
          <label className="label">Function f({variable})</label>
          <input
            type="text"
            value={function1}
            onChange={(e) => setFunction1(e.target.value)}
            className="input w-full"
            placeholder="e.g., x^2 + 3*x - 1"
          />
        </div>
        
        <div className="mb-4">
          <label className="label">Variable</label>
          <input
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="input w-full"
            placeholder="e.g., x"
          />
        </div>
        
        {selectedFunction === 'integral' && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Lower Bound</label>
              <input
                type="text"
                value={lowerBound}
                onChange={(e) => setLowerBound(e.target.value)}
                className="input w-full"
                placeholder="e.g., 0"
              />
            </div>
            <div>
              <label className="label">Upper Bound</label>
              <input
                type="text"
                value={upperBound}
                onChange={(e) => setUpperBound(e.target.value)}
                className="input w-full"
                placeholder="e.g., 1"
              />
            </div>
          </div>
        )}
        
        {selectedFunction === 'limit' && (
          <div className="mb-4">
            <div className="mb-4">
              <label className="label">Point (as {variable} approaches)</label>
              <input
                type="text"
                value={limitPoint}
                onChange={(e) => setLimitPoint(e.target.value)}
                className="input w-full"
                placeholder="e.g., 0"
              />
            </div>
            <div>
              <label className="label">Approach Direction</label>
              <select
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                className="input w-full"
              >
                <option value="both">Both sides</option>
                <option value="left">From left</option>
                <option value="right">From right</option>
              </select>
            </div>
          </div>
        )}
        
        <button
          onClick={calculateResult}
          className="btn-primary w-full"
        >
          Calculate
        </button>
      </div>
      
      {error && (
        <div className="bg-red-900 p-4 rounded-xl shadow-lg mb-6 text-white">
          {error}
        </div>
      )}
      
      {result && !error && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <div className="p-4 bg-gray-700 rounded-lg overflow-x-auto">
            <pre className="text-lg">{result}</pre>
          </div>
        </div>
      )}
      
      {steps.length > 0 && !error && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Steps</h2>
          <div className="p-4 bg-gray-700 rounded-lg">
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-300">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use standard mathematical notation (e.g., x^2 for x², sin(x) for sine)</li>
          <li>For multiplication, use the * symbol (e.g., 2*x not 2x)</li>
          <li>Available functions: sin, cos, tan, sqrt, log (base 10), ln (natural log), etc.</li>
          <li>For derivatives, specify the function and variable to differentiate with respect to</li>
          <li>For definite integrals, provide the function, variable, and integration bounds</li>
          <li>For limits, enter the function, variable, point of approach, and direction</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculus; 