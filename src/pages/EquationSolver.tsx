import React, { useState } from 'react';
import * as math from 'mathjs';

enum EquationType {
  Linear = 'Linear',
  Quadratic = 'Quadratic',
  Cubic = 'Cubic',
  System = 'System of Linear Equations'
}

const EquationSolver: React.FC = () => {
  const [equationType, setEquationType] = useState<EquationType>(EquationType.Linear);
  const [equation, setEquation] = useState<string>('');
  const [equation2, setEquation2] = useState<string>('');
  const [equation3, setEquation3] = useState<string>('');
  const [variable, setVariable] = useState<string>('x');
  const [variables, setVariables] = useState<string>('x,y');
  const [solutions, setSolutions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const solveLinearEquation = (eq: string, v: string): string[] => {
    try {
      setSteps([]);
      // Handle equations with equals sign
      let expression = eq;
      if (eq.includes('=')) {
        const [leftSide, rightSide] = eq.split('=').map(side => side.trim());
        expression = `${leftSide} - (${rightSide})`;
        setSteps(prev => [...prev, `Step 1: Move all terms to one side: ${expression} = 0`]);
      }

      // Parse to extract coefficients
      let processed = expression
        .replace(/\s+/g, '')
        .replace(new RegExp(`${v}`, 'g'), '1*' + v)
        .replace(new RegExp(`-(${v})`, 'g'), '-1*' + v);
      
      setSteps(prev => [...prev, `Step 2: Parse equation: ${processed}`]);

      // Simplify the expression
      const simplified = math.simplify(processed).toString();
      setSteps(prev => [...prev, `Step 3: Simplify: ${simplified}`]);

      // Extract coefficient of the variable and constant term
      let coefficient = 0;
      let constant = 0;

      // This is a simple parser for linear equations and may not work for all cases
      const terms = simplified.split(/(?=\+)|(?=-)/);
      
      terms.forEach(term => {
        if (term.includes(v)) {
          // Extract the coefficient of the variable
          const coeff = term.replace(v, '').replace('*', '');
          coefficient = coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
        } else {
          // Extract the constant term
          constant += parseFloat(term);
        }
      });

      setSteps(prev => [...prev, `Step 4: Identify coefficient of ${v}: ${coefficient}`]);
      setSteps(prev => [...prev, `Step 5: Identify constant term: ${constant}`]);

      if (coefficient === 0) {
        if (constant === 0) {
          setSteps(prev => [...prev, 'Step 6: The equation is satisfied by any value of x (Identity)']);
          return ['All real numbers (identity)'];
        } else {
          setSteps(prev => [...prev, 'Step 6: No solution exists (contradiction)']);
          return ['No solution (contradiction)'];
        }
      }

      // Solve for the variable
      const solution = -constant / coefficient;
      setSteps(prev => [...prev, `Step 6: Solve for ${v}: ${v} = ${solution}`]);
      
      return [solution.toString()];
    } catch (error) {
      console.error('Error solving linear equation:', error);
      setError('Error solving equation. Please check your input.');
      return [];
    }
  };

  const solveQuadraticEquation = (eq: string, v: string): string[] => {
    try {
      setSteps([]);
      // Handle equations with equals sign
      let expression = eq;
      if (eq.includes('=')) {
        const [leftSide, rightSide] = eq.split('=').map(side => side.trim());
        expression = `${leftSide} - (${rightSide})`;
        setSteps(prev => [...prev, `Step 1: Standard form: ${expression} = 0`]);
      }

      // Convert to standard form: ax^2 + bx + c = 0
      const simplified = math.simplify(expression).toString();
      setSteps(prev => [...prev, `Step 2: Simplify: ${simplified}`]);

      // Extract coefficients a, b, c
      // This is a simple approach and might not work for all cases
      let a = 0, b = 0, c = 0;
      const terms = simplified.split(/(?=\+)|(?=-)/);
      
      terms.forEach(term => {
        if (term.includes(`${v}^2`)) {
          a = parseFloat(term.replace(`${v}^2`, '').replace('*', ''));
        } else if (term.includes(v)) {
          b = parseFloat(term.replace(v, '').replace('*', ''));
        } else {
          c += parseFloat(term);
        }
      });

      setSteps(prev => [...prev, `Step 3: Identify coefficients: a=${a}, b=${b}, c=${c}`]);

      if (a === 0) {
        setSteps(prev => [...prev, `Step 4: Since a=0, this is a linear equation`]);
        return solveLinearEquation(eq, v);
      }

      // Calculate discriminant
      const discriminant = b * b - 4 * a * c;
      setSteps(prev => [...prev, `Step 4: Calculate discriminant: Δ = b² - 4ac = ${discriminant}`]);

      if (discriminant < 0) {
        setSteps(prev => [...prev, `Step 5: Discriminant is negative, so there are complex solutions`]);
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
        return [
          `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
          `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`
        ];
      } else if (discriminant === 0) {
        setSteps(prev => [...prev, `Step 5: Discriminant is zero, so there is one solution`]);
        const solution = -b / (2 * a);
        return [solution.toString()];
      } else {
        setSteps(prev => [...prev, `Step 5: Discriminant is positive, so there are two real solutions`]);
        const solution1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const solution2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        setSteps(prev => [...prev, `Step 6: Apply quadratic formula: x = (-b ± √Δ) / 2a`]);
        setSteps(prev => [...prev, `Step 7: First solution: x₁ = ${solution1}`]);
        setSteps(prev => [...prev, `Step 8: Second solution: x₂ = ${solution2}`]);
        return [solution1.toString(), solution2.toString()];
      }
    } catch (error) {
      console.error('Error solving quadratic equation:', error);
      setError('Error solving equation. Please check your input.');
      return [];
    }
  };

  const solveCubicEquation = (eq: string, v: string): string[] => {
    // This is a simplified approach that doesn't implement the full cubic formula
    try {
      setSteps([]);
      // Handle equations with equals sign
      let expression = eq;
      if (eq.includes('=')) {
        const [leftSide, rightSide] = eq.split('=').map(side => side.trim());
        expression = `${leftSide} - (${rightSide})`;
        setSteps(prev => [...prev, `Step 1: Standard form: ${expression} = 0`]);
      }

      // Numerical approach: find roots by sampling
      const compiled = math.compile(expression);
      
      setSteps(prev => [...prev, `Step 2: Looking for values of ${v} where the expression equals zero`]);

      // Find solutions numerically using bisection method
      const solutions: number[] = [];
      
      // Check for simple integer roots first
      for (let i = -20; i <= 20; i++) {
        const value = compiled.evaluate({ [v]: i });
        if (Math.abs(value) < 1e-10) {
          solutions.push(i);
          setSteps(prev => [...prev, `Step 3: Found a root at ${v} = ${i}`]);
        }
      }
      
      if (solutions.length > 0) {
        // If we found solutions, we can reduce the polynomial
        let reducedExpression = expression;
        solutions.forEach(sol => {
          reducedExpression = math.simplify(`(${reducedExpression}) / (${v} - ${sol})`).toString();
          setSteps(prev => [...prev, `Step 4: Reduced polynomial after removing root ${sol}: ${reducedExpression}`]);
        });
        
        // If there are still more roots to find (cubic should have 3 roots)
        if (solutions.length < 3) {
          setSteps(prev => [...prev, `Step 5: Looking for remaining roots in the reduced expression`]);
          // If we have a quadratic equation now, solve it
          if (solutions.length === 1) {
            const quadraticSolutions = solveQuadraticEquation(reducedExpression, v);
            solutions.push(...quadraticSolutions.map(s => parseFloat(s)));
          }
        }
      } else {
        setSteps(prev => [...prev, `Step 3: No simple integer roots found. Using numerical methods for approximation`]);
        // More complex numerical approach would be needed here
        setSteps(prev => [...prev, `Note: This is a simplified solver and may not find all roots for complex cubic equations`]);
      }
      
      return solutions.map(s => s.toString());
    } catch (error) {
      console.error('Error solving cubic equation:', error);
      setError('Error solving equation. Please check your input.');
      return [];
    }
  };

  const solveSystemOfEquations = (eq1: string, eq2: string, vars: string): string[] => {
    try {
      setSteps([]);
      const variables = vars.split(',').map(v => v.trim());
      
      if (variables.length !== 2) {
        setError('System solver currently supports exactly 2 variables.');
        return [];
      }
      
      const [x, y] = variables;
      
      // Parse equations to get them in the form: ax + by = c
      const equations: Array<{a: number, b: number, c: number}> = [];
      
      [eq1, eq2].forEach((eq, index) => {
        if (!eq.includes('=')) {
          throw new Error(`Equation ${index + 1} must contain an equals sign.`);
        }
        
        const [leftSide, rightSide] = eq.split('=').map(side => side.trim());
        const rearranged = `${leftSide} - (${rightSide})`;
        setSteps(prev => [...prev, `Step 1.${index + 1}: Rearrange equation ${index + 1}: ${rearranged} = 0`]);
        
        // Extract coefficients using mathjs and differentiation trick
        // Coefficient of x is derivative with respect to x evaluated at x=0, y=0
        const exprNode = math.parse(rearranged);
        
        // This is a simplified approach and may not work for all cases
        const derivativeX = math.derivative(rearranged, x);
        const derivativeY = math.derivative(rearranged, y);
        
        const a = derivativeX.evaluate({[x]: 0, [y]: 0});
        const b = derivativeY.evaluate({[x]: 0, [y]: 0});
        const c = -exprNode.evaluate({[x]: 0, [y]: 0}); // negative because we want the constant term on the right side
        
        equations.push({a, b, c});
        setSteps(prev => [...prev, `Step 2.${index + 1}: Extracted coefficients for equation ${index + 1}: ${a}${x} + ${b}${y} = ${c}`]);
      });
      
      // Solve the system using Cramer's rule
      const [eq1Coeffs, eq2Coeffs] = equations;
      
      const determinant = eq1Coeffs.a * eq2Coeffs.b - eq1Coeffs.b * eq2Coeffs.a;
      setSteps(prev => [...prev, `Step 3: Calculate determinant: ${determinant}`]);
      
      if (Math.abs(determinant) < 1e-10) {
        setSteps(prev => [...prev, `Step 4: Determinant is zero, checking for dependency or inconsistency`]);
        // Check if the system is consistent (has infinitely many solutions) or inconsistent (no solutions)
        const ratio1 = eq1Coeffs.a / eq2Coeffs.a;
        const ratio2 = eq1Coeffs.b / eq2Coeffs.b;
        const ratio3 = eq1Coeffs.c / eq2Coeffs.c;
        
        if (Math.abs(ratio1 - ratio2) < 1e-10 && Math.abs(ratio1 - ratio3) < 1e-10) {
          return [`Infinitely many solutions (dependent equations)`];
        } else {
          return [`No solutions (inconsistent equations)`];
        }
      }
      
      // Determinant is non-zero, unique solution exists
      const determinantX = eq1Coeffs.c * eq2Coeffs.b - eq1Coeffs.b * eq2Coeffs.c;
      const determinantY = eq1Coeffs.a * eq2Coeffs.c - eq1Coeffs.c * eq2Coeffs.a;
      
      const xSolution = determinantX / determinant;
      const ySolution = determinantY / determinant;
      
      setSteps(prev => [...prev, `Step 4: Calculate determinant for ${x}: ${determinantX}`]);
      setSteps(prev => [...prev, `Step 5: Calculate determinant for ${y}: ${determinantY}`]);
      setSteps(prev => [...prev, `Step 6: ${x} = determinant_${x} / determinant = ${xSolution}`]);
      setSteps(prev => [...prev, `Step 7: ${y} = determinant_${y} / determinant = ${ySolution}`]);
      
      return [`${x} = ${xSolution}`, `${y} = ${ySolution}`];
    } catch (error) {
      console.error('Error solving system of equations:', error);
      setError('Error solving system. Please check your input.');
      return [];
    }
  };

  const handleSolve = () => {
    setError(null);
    setSolutions([]);
    
    try {
      switch (equationType) {
        case EquationType.Linear:
          if (!equation.trim()) {
            setError('Please enter an equation');
            return;
          }
          setSolutions(solveLinearEquation(equation, variable));
          break;
        case EquationType.Quadratic:
          if (!equation.trim()) {
            setError('Please enter an equation');
            return;
          }
          setSolutions(solveQuadraticEquation(equation, variable));
          break;
        case EquationType.Cubic:
          if (!equation.trim()) {
            setError('Please enter an equation');
            return;
          }
          setSolutions(solveCubicEquation(equation, variable));
          break;
        case EquationType.System:
          if (!equation.trim() || !equation2.trim()) {
            setError('Please enter both equations');
            return;
          }
          setSolutions(solveSystemOfEquations(equation, equation2, variables));
          break;
        default:
          setError('Unknown equation type');
      }
    } catch (error) {
      console.error('Error solving equation:', error);
      setError('Error solving equation. Please check your input format.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Equation Solver</h1>
      
      {/* Equation Type Selection */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Equation Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(EquationType).map(type => (
            <button
              key={type}
              className={`px-4 py-3 rounded-md ${
                equationType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setEquationType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Enter Your Equation</h2>
        
        {equationType === EquationType.System ? (
          <>
            <div className="mb-4">
              <label className="label">Variables (comma-separated)</label>
              <input
                type="text"
                className="input w-full"
                value={variables}
                onChange={e => setVariables(e.target.value)}
                placeholder="e.g., x,y"
              />
            </div>
            <div className="mb-4">
              <label className="label">Equation 1</label>
              <input
                type="text"
                className="input w-full"
                value={equation}
                onChange={e => setEquation(e.target.value)}
                placeholder="e.g., 2x + 3y = 8"
              />
            </div>
            <div className="mb-4">
              <label className="label">Equation 2</label>
              <input
                type="text"
                className="input w-full"
                value={equation2}
                onChange={e => setEquation2(e.target.value)}
                placeholder="e.g., 4x - y = 10"
              />
            </div>
            {equationType === EquationType.System && equation3 !== undefined && (
              <div className="mb-4">
                <label className="label">Equation 3 (optional)</label>
                <input
                  type="text"
                  className="input w-full"
                  value={equation3}
                  onChange={e => setEquation3(e.target.value)}
                  placeholder="e.g., x + y + z = 6 (for 3 variables)"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="label">Variable</label>
              <input
                type="text"
                className="input w-full"
                value={variable}
                onChange={e => setVariable(e.target.value)}
                placeholder="e.g., x"
              />
            </div>
            <div className="mb-4">
              <label className="label">Equation</label>
              <input
                type="text"
                className="input w-full"
                value={equation}
                onChange={e => setEquation(e.target.value)}
                placeholder={
                  equationType === EquationType.Linear 
                    ? "e.g., 2x + 5 = 13" 
                    : equationType === EquationType.Quadratic 
                    ? "e.g., x^2 - 5x + 6 = 0"
                    : "e.g., x^3 - 6x^2 + 11x - 6 = 0"
                }
              />
            </div>
          </>
        )}
        
        <button
          className="btn-primary w-full py-3"
          onClick={handleSolve}
        >
          Solve
        </button>
      </div>
      
      {/* Result Area */}
      {(solutions.length > 0 || error) && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Solution</h2>
          
          {error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <div className="space-y-2">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-md">
                  {solution}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Steps Area */}
      {steps.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Solution Steps</h2>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-md">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Help Area */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Help & Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2 text-indigo-400">Linear Equations</h3>
            <p className="text-gray-300 mb-2">Examples: <code>2x + 5 = 13</code>, <code>4x - 7 = 9</code></p>
            <p className="text-gray-400">Form: <code>ax + b = c</code>, where a ≠ 0</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-indigo-400">Quadratic Equations</h3>
            <p className="text-gray-300 mb-2">Examples: <code>x^2 - 5x + 6 = 0</code>, <code>2x^2 + 4x - 3 = 0</code></p>
            <p className="text-gray-400">Form: <code>ax^2 + bx + c = 0</code>, where a ≠ 0</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-indigo-400">Cubic Equations</h3>
            <p className="text-gray-300 mb-2">Examples: <code>x^3 - 6x^2 + 11x - 6 = 0</code>, <code>x^3 - x = 0</code></p>
            <p className="text-gray-400">Form: <code>ax^3 + bx^2 + cx + d = 0</code>, where a ≠ 0</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-indigo-400">System of Linear Equations</h3>
            <p className="text-gray-300 mb-2">Examples: <code>2x + 3y = 8</code> and <code>4x - y = 10</code></p>
            <p className="text-gray-400">Form: Two or more linear equations with the same variables</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquationSolver; 