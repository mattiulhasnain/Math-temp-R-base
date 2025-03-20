import * as math from 'mathjs';

/**
 * Evaluates a mathematical expression with the given scope.
 * @param expression The expression to evaluate
 * @param scope The variable scope for the expression
 * @returns The result of the evaluation
 */
export const evaluateExpression = (expression: string): number => {
  try {
    return math.evaluate(expression);
  } catch (error) {
    throw new Error(`Invalid expression: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Formats a number to a specified number of decimal places.
 * @param value The number to format
 * @param decimals The number of decimal places (default: 2)
 * @returns The formatted number as a string
 */
export const formatNumber = (num: number, precision: number = 6): string => {
  if (Math.abs(num) < 0.0001 || Math.abs(num) > 10000) {
    return num.toExponential(precision);
  }
  return num.toFixed(precision).replace(/\.?0+$/, '');
};

/**
 * Generates an array of points for a function within a specified range.
 * @param func The function expression as a string
 * @param xMin The minimum x value
 * @param xMax The maximum x value
 * @param samples The number of samples to generate
 * @returns An array of points {x, y}
 */
export const generateFunctionPoints = (
  func: string, 
  xMin: number, 
  xMax: number, 
  samples: number
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const step = (xMax - xMin) / samples;
  
  for (let x = xMin; x <= xMax; x += step) {
    try {
      const y = evaluateExpression(func);
      if (Number.isFinite(y)) {
        points.push({ x, y });
      }
    } catch (error) {
      // Skip points that cause errors
    }
  }
  
  return points;
};

/**
 * Attempts to solve an equation for a specific variable.
 * Note: This is a simplified version as mathjs doesn't have a direct `solve` function
 * @param equation The equation to solve (e.g., "x^2 + 2*x - 3 = 0")
 * @param variable The variable to solve for (default: 'x')
 * @returns An array of solutions
 */
export const solveEquation = (equation: string, variable: string = 'x'): number[] => {
  try {
    // This is a simplified approach, not a general equation solver
    // In a real implementation, you would need to use numerical methods or a solver library
    
    // Handle equations with equals sign
    let expr = equation;
    if (equation.includes('=')) {
      const [leftSide, rightSide] = equation.split('=').map(side => side.trim());
      expr = `${leftSide} - (${rightSide})`;
    }
    
    // For linear equations in the form ax + b = 0
    if (expr.match(new RegExp(`^[^${variable}]*${variable}[^${variable}0-9]*[+-]?\\s*\\d+\\s*$`))) {
      const compiled = math.compile(expr);
      
      // Find x where f(x) = 0 using a simple approximation
      for (let x = -1000; x <= 1000; x += 0.1) {
        const value = compiled.evaluate({ [variable]: x });
        if (Math.abs(value) < 0.001) {
          return [parseFloat(x.toFixed(2))];
        }
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error solving equation:', error);
    return [];
  }
};

/**
 * Calculates the derivative of a function.
 * @param func The function to differentiate
 * @param variable The variable to differentiate with respect to (default: 'x')
 * @returns The derivative expression as a string
 */
export const calculateDerivative = (expression: string, variable: string): string => {
  try {
    const derivative = math.derivative(expression, variable);
    return derivative.toString();
  } catch (error) {
    throw new Error(`Could not calculate derivative: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Approximates the definite integral of a function over an interval.
 * Note: This is a simplified numerical integration as mathjs doesn't have a direct `integrate` function
 * @param func The function to integrate
 * @param lowerBound The lower bound of integration
 * @param upperBound The upper bound of integration
 * @param variable The variable to integrate with respect to (default: 'x')
 * @returns The approximate value of the definite integral
 */
export const calculateDefiniteIntegral = (
  expression: string,
  variable: string,
  lowerBound: number,
  upperBound: number
): number => {
  try {
    // Use Simpson's Rule for numerical integration
    const n = 1000; // Number of intervals (must be even)
    const h = (upperBound - lowerBound) / n;
    let sum = evaluateExpression(expression.replace(new RegExp(variable, 'g'), `(${lowerBound})`)) +
              evaluateExpression(expression.replace(new RegExp(variable, 'g'), `(${upperBound})`));
    
    // Add odd terms
    for (let i = 1; i < n; i += 2) {
      const x = lowerBound + i * h;
      sum += 4 * evaluateExpression(expression.replace(new RegExp(variable, 'g'), `(${x})`));
    }
    
    // Add even terms
    for (let i = 2; i < n; i += 2) {
      const x = lowerBound + i * h;
      sum += 2 * evaluateExpression(expression.replace(new RegExp(variable, 'g'), `(${x})`));
    }
    
    return (h / 3) * sum;
  } catch (error) {
    throw new Error(`Could not calculate integral: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees
 * @returns The angle in radians
 */
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Converts radians to degrees.
 * @param radians The angle in radians
 * @returns The angle in degrees
 */
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

/**
 * Generates prime numbers up to a specified limit.
 * @param limit The upper limit to generate primes to
 * @returns An array of prime numbers
 */
export const generatePrimes = (limit: number): number[] => {
  const sieve = Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;
  
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }
  
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }
  
  return primes;
};

/**
 * Checks if a number is prime.
 * @param n The number to check
 * @returns True if the number is prime, false otherwise
 */
export const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  
  return true;
};

/**
 * Calculates the greatest common divisor of two numbers.
 * @param a The first number
 * @param b The second number
 * @returns The greatest common divisor
 */
export const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

/**
 * Calculates the least common multiple of two numbers.
 * @param a The first number
 * @param b The second number
 * @returns The least common multiple
 */
export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
}; 