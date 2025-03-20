import React, { useState, useEffect, useCallback } from 'react';

const PrimeNumbers: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [rangeStart, setRangeStart] = useState<string>('1');
  const [rangeEnd, setRangeEnd] = useState<string>('100');
  const [count, setCount] = useState<string>('10');
  const [result, setResult] = useState<React.ReactNode | null>(null);
  const [activeTab, setActiveTab] = useState<'checker' | 'factorize' | 'list' | 'generator'>('checker');
  const [computing, setComputing] = useState<boolean>(false);
  const [computation, setComputation] = useState<{
    cancel: boolean;
    progress: number;
  }>({
    cancel: false,
    progress: 0
  });

  // Prime checker
  const checkPrime = useCallback((n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= n) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  }, []);

  // Prime factorization
  const primeFactorize = useCallback((n: number): number[] => {
    const factors: number[] = [];
    
    // Handle 2 separately
    while (n % 2 === 0) {
      factors.push(2);
      n = Math.floor(n / 2);
    }
    
    // Handle other factors
    for (let i = 3; i * i <= n; i += 2) {
      while (n % i === 0) {
        factors.push(i);
        n = Math.floor(n / i);
      }
    }
    
    // If n is a prime number greater than 2
    if (n > 2) {
      factors.push(n);
    }
    
    return factors;
  }, []);

  // Generate prime numbers in a range
  const generatePrimesInRange = useCallback((start: number, end: number): number[] => {
    const primes: number[] = [];
    setComputation(prev => ({ ...prev, cancel: false, progress: 0 }));
    
    // Ensure we have valid numbers
    start = Math.max(2, start);
    
    // Initialize progress tracking
    const total = end - start + 1;
    let processed = 0;
    
    // Check each number in the range
    for (let i = start; i <= end; i++) {
      // Check if computation should be cancelled
      if (computation.cancel) {
        break;
      }
      
      // Check if the number is prime
      if (checkPrime(i)) {
        primes.push(i);
      }
      
      // Update progress
      processed++;
      const progress = Math.floor((processed / total) * 100);
      setComputation(prev => ({ ...prev, progress }));
      
      // Yield to UI thread periodically
      if (processed % 1000 === 0) {
        // This would ideally be done with a setTimeout/Web Worker, but we'll simplify
      }
    }
    
    return primes;
  }, [checkPrime, computation.cancel]);

  // Generate n prime numbers
  const generateNPrimes = useCallback((n: number): number[] => {
    const primes: number[] = [];
    setComputation(prev => ({ ...prev, cancel: false, progress: 0 }));
    
    let num = 2;
    let count = 0;
    
    while (count < n) {
      // Check if computation should be cancelled
      if (computation.cancel) {
        break;
      }
      
      if (checkPrime(num)) {
        primes.push(num);
        count++;
        
        // Update progress
        const progress = Math.floor((count / n) * 100);
        setComputation(prev => ({ ...prev, progress }));
      }
      
      num++;
      
      // Yield to UI thread periodically
      if (num % 1000 === 0) {
        // This would ideally be done with a setTimeout/Web Worker, but we'll simplify
      }
    }
    
    return primes;
  }, [checkPrime, computation.cancel]);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setComputing(true);
    setResult(null);
    
    try {
      switch (activeTab) {
        case 'checker': {
          const num = parseInt(number);
          if (isNaN(num)) {
            setResult(<div className="text-red-500">Please enter a valid number</div>);
            return;
          }
          
          const isPrime = checkPrime(num);
          setResult(
            <div className={`text-xl font-bold ${isPrime ? 'text-green-500' : 'text-red-500'}`}>
              {num} is {isPrime ? 'a prime number' : 'not a prime number'}
            </div>
          );
          break;
        }
        
        case 'factorize': {
          const num = parseInt(number);
          if (isNaN(num) || num <= 0) {
            setResult(<div className="text-red-500">Please enter a positive integer</div>);
            return;
          }
          
          const factors = primeFactorize(num);
          
          // Group factors by count
          const grouped: Record<number, number> = {};
          factors.forEach(factor => {
            grouped[factor] = (grouped[factor] || 0) + 1;
          });
          
          // Build result display
          const factorization = Object.entries(grouped).map(([factor, count]) => {
            if (count === 1) return factor;
            return `${factor}^${count}`;
          }).join(' × ');
          
          setResult(
            <div>
              <div className="text-xl font-bold mb-2">
                {num} = {factorization}
              </div>
              <div className="text-gray-400">
                Prime factors: {factors.join(', ')}
              </div>
            </div>
          );
          break;
        }
        
        case 'list': {
          const start = parseInt(rangeStart);
          const end = parseInt(rangeEnd);
          
          if (isNaN(start) || isNaN(end) || start < 0 || end < start) {
            setResult(<div className="text-red-500">Please enter a valid range</div>);
            return;
          }
          
          // Run in a setTimeout to allow the UI to update
          setTimeout(() => {
            const primes = generatePrimesInRange(start, end);
            
            setResult(
              <div>
                <div className="text-xl font-bold mb-2">
                  Prime numbers between {start} and {end}:
                </div>
                <div className="bg-gray-700 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {primes.map(prime => (
                      <span key={prime} className="bg-indigo-600 text-white px-2 py-1 rounded">
                        {prime}
                      </span>
                    ))}
                  </div>
                  {primes.length === 0 && <div className="text-gray-400">No prime numbers found in this range</div>}
                </div>
                <div className="text-gray-400 mt-2">
                  Found {primes.length} prime numbers
                </div>
              </div>
            );
            setComputing(false);
          }, 0);
          
          // Don't set computing to false yet, we'll do it when the operation completes
          return;
        }
        
        case 'generator': {
          const n = parseInt(count);
          
          if (isNaN(n) || n <= 0) {
            setResult(<div className="text-red-500">Please enter a positive integer</div>);
            return;
          }
          
          // Run in a setTimeout to allow the UI to update
          setTimeout(() => {
            const primes = generateNPrimes(n);
            
            setResult(
              <div>
                <div className="text-xl font-bold mb-2">
                  First {n} prime numbers:
                </div>
                <div className="bg-gray-700 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {primes.map(prime => (
                      <span key={prime} className="bg-indigo-600 text-white px-2 py-1 rounded">
                        {prime}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
            setComputing(false);
          }, 0);
          
          // Don't set computing to false yet, we'll do it when the operation completes
          return;
        }
      }
    } catch (error) {
      setResult(<div className="text-red-500">An error occurred: {String(error)}</div>);
    }
    
    setComputing(false);
  }, [activeTab, number, rangeStart, rangeEnd, count, checkPrime, primeFactorize, generatePrimesInRange, generateNPrimes]);

  // Cancel computation if component unmounts
  useEffect(() => {
    return () => {
      setComputation(prev => ({ ...prev, cancel: true }));
    };
  }, []);

  // Handle cancel button
  const handleCancel = () => {
    setComputation(prev => ({ ...prev, cancel: true }));
  };

  // Render appropriate form based on active tab
  const renderForm = () => {
    switch (activeTab) {
      case 'checker':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium mb-1">
                Enter a number:
              </label>
              <input
                type="number"
                id="number"
                className="w-full rounded-lg bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={number}
                onChange={e => setNumber(e.target.value)}
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full"
              disabled={computing}
            >
              {computing ? 'Checking...' : 'Check if Prime'}
            </button>
          </form>
        );
      
      case 'factorize':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium mb-1">
                Enter a number to factorize:
              </label>
              <input
                type="number"
                id="number"
                className="w-full rounded-lg bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={number}
                onChange={e => setNumber(e.target.value)}
                min="2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full"
              disabled={computing}
            >
              {computing ? 'Factorizing...' : 'Find Prime Factors'}
            </button>
          </form>
        );
      
      case 'list':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rangeStart" className="block text-sm font-medium mb-1">
                  Start:
                </label>
                <input
                  type="number"
                  id="rangeStart"
                  className="w-full rounded-lg bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={rangeStart}
                  onChange={e => setRangeStart(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="rangeEnd" className="block text-sm font-medium mb-1">
                  End:
                </label>
                <input
                  type="number"
                  id="rangeEnd"
                  className="w-full rounded-lg bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={rangeEnd}
                  onChange={e => setRangeEnd(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full"
              disabled={computing}
            >
              {computing ? 'Generating...' : 'Generate Primes in Range'}
            </button>
            {computing && (
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span>Progress: {computation.progress}%</span>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-red-400 hover:text-red-300"
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${computation.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        );
      
      case 'generator':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="count" className="block text-sm font-medium mb-1">
                How many primes to generate:
              </label>
              <input
                type="number"
                id="count"
                className="w-full rounded-lg bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={count}
                onChange={e => setCount(e.target.value)}
                min="1"
                max="10000"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full"
              disabled={computing}
            >
              {computing ? 'Generating...' : 'Generate Prime Numbers'}
            </button>
            {computing && (
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span>Progress: {computation.progress}%</span>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-red-400 hover:text-red-300"
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${computation.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Prime Number Tools</h1>
      
      <div className="mb-6">
        <ul className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'checker', label: 'Prime Checker' },
            { id: 'factorize', label: 'Prime Factorization' },
            { id: 'list', label: 'Primes in Range' },
            { id: 'generator', label: 'Generate N Primes' }
          ].map(tab => (
            <li key={tab.id}>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {activeTab === 'checker' && 'Prime Number Checker'}
            {activeTab === 'factorize' && 'Prime Factorization'}
            {activeTab === 'list' && 'Find Primes in Range'}
            {activeTab === 'generator' && 'Generate Prime Numbers'}
          </h2>
          {renderForm()}
        </div>
        
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Result</h2>
          <div className="min-h-[200px]">
            {result ? (
              result
            ) : (
              <div className="text-gray-400 italic">
                {activeTab === 'checker' && 'Enter a number to check if it is prime'}
                {activeTab === 'factorize' && 'Enter a number to find its prime factors'}
                {activeTab === 'list' && 'Specify a range to find all prime numbers within it'}
                {activeTab === 'generator' && 'Specify how many prime numbers to generate'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">About Prime Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">What are Prime Numbers?</h3>
            <p className="text-gray-300">
              A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers.
              A natural number greater than 1 that is not prime is called a composite number.
            </p>
            <p className="text-gray-300 mt-2">
              For example, 5 is prime because the only ways of writing it as a product, 1 × 5 or 5 × 1,
              involve 5 itself. However, 6 is composite because it is the product of two smaller natural numbers: 2 × 3.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Interesting Facts</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>There are infinitely many prime numbers</li>
              <li>The only even prime number is 2</li>
              <li>The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to any given limit</li>
              <li>Prime numbers play a crucial role in computer security and cryptography</li>
              <li>The largest known prime number (as of 2023) has over 24 million digits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeNumbers; 