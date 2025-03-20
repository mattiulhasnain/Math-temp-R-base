import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [isRadians, setIsRadians] = useState<boolean>(true);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorInput(key);
      } else if (key === '=' || key === 'Enter') {
        calculateResult();
      } else if (key === 'Escape') {
        clearDisplay();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === '.') {
        handleDecimalInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  const handleNumberInput = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperatorInput = (operator: string) => {
    setDisplay(prev => prev + operator);
  };

  const handleFunctionInput = (func: string) => {
    setDisplay(prev => prev === '0' ? `${func}(` : `${prev}${func}(`);
  };

  const handleDecimalInput = () => {
    const parts = display.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    
    if (!lastPart.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  };

  const handleBackspace = () => {
    setDisplay(prev => prev.length === 1 ? '0' : prev.substring(0, prev.length - 1));
  };

  const handleParenthesisInput = (parenthesis: string) => {
    setDisplay(prev => prev === '0' ? parenthesis : prev + parenthesis);
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const calculateResult = () => {
    try {
      let expression = display;
      
      // Replace special functions with mathjs equivalents
      expression = expression.replace(/sin\(/g, isRadians ? 'sin(' : 'sin(pi/180*');
      expression = expression.replace(/cos\(/g, isRadians ? 'cos(' : 'cos(pi/180*');
      expression = expression.replace(/tan\(/g, isRadians ? 'tan(' : 'tan(pi/180*');
      expression = expression.replace(/log\(/g, 'log10(');
      expression = expression.replace(/ln\(/g, 'log(');
      expression = expression.replace(/π/g, 'pi');
      expression = expression.replace(/√/g, 'sqrt');
      
      const result = math.evaluate(expression);
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      
      setHistory(prev => [...prev, `${display} = ${formattedResult}`]);
      setDisplay(formattedResult);
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => {
        setDisplay('0');
      }, 1000);
    }
  };

  const toggleAngleMode = () => {
    setIsRadians(prev => !prev);
  };

  const memoryStore = () => {
    try {
      const result = math.evaluate(display);
      setMemory(result);
    } catch (error) {
      // Handle error
    }
  };

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(prev => prev === '0' ? memory.toString() : prev + memory.toString());
    }
  };

  const memoryClear = () => {
    setMemory(null);
  };

  const memoryAdd = () => {
    try {
      const result = math.evaluate(display);
      setMemory(prev => prev !== null ? prev + result : result);
    } catch (error) {
      // Handle error
    }
  };

  const memorySubtract = () => {
    try {
      const result = math.evaluate(display);
      setMemory(prev => prev !== null ? prev - result : -result);
    } catch (error) {
      // Handle error
    }
  };

  const toggleHistoryPanel = () => {
    setShowHistory(prev => !prev);
  };

  const loadHistoryItem = (item: string) => {
    const value = item.split(' = ')[0];
    setDisplay(value);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* History Panel */}
        {showHistory && (
          <div className="md:col-span-1 bg-gray-800 p-4 rounded-xl overflow-y-auto h-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">History</h3>
              <button 
                className="text-sm text-gray-400 hover:text-white"
                onClick={clearHistory}
              >
                Clear
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-400 text-center mt-8">No history yet</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item, index) => (
                  <li 
                    key={index} 
                    className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => loadHistoryItem(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Calculator */}
        <div className={`${showHistory ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <button 
                  className={`text-sm ${isRadians ? 'text-indigo-400' : 'text-gray-400'} hover:text-indigo-300`}
                  onClick={toggleAngleMode}
                >
                  {isRadians ? 'RAD' : 'DEG'}
                </button>
                <button 
                  className="text-sm text-gray-400 hover:text-indigo-300"
                  onClick={toggleHistoryPanel}
                >
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>
              <div className="text-right bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <div className="text-3xl font-bold text-white">{display}</div>
              </div>
            </div>
            
            {/* Memory buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg text-sm"
                onClick={memoryClear}
              >
                MC
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg text-sm"
                onClick={memoryRecall}
              >
                MR
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg text-sm"
                onClick={memoryStore}
              >
                MS
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg text-sm"
                onClick={memoryAdd}
              >
                M+
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg text-sm"
                onClick={memorySubtract}
              >
                M-
              </button>
            </div>
            
            {/* Calculator buttons */}
            <div className="grid grid-cols-5 gap-2">
              {/* Row 1 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('sqrt')}
              >
                √
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleParenthesisInput('(')}
              >
                (
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleParenthesisInput(')')}
              >
                )
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={handleBackspace}
              >
                ⌫
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={clearDisplay}
              >
                AC
              </button>
              
              {/* Row 2 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('sin')}
              >
                sin
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('7')}
              >
                7
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('8')}
              >
                8
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('9')}
              >
                9
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('/')}
              >
                ÷
              </button>
              
              {/* Row 3 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('cos')}
              >
                cos
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('4')}
              >
                4
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('5')}
              >
                5
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('6')}
              >
                6
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('*')}
              >
                ×
              </button>
              
              {/* Row 4 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('tan')}
              >
                tan
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('1')}
              >
                1
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('2')}
              >
                2
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('3')}
              >
                3
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('-')}
              >
                -
              </button>
              
              {/* Row 5 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('log')}
              >
                log
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('0')}
              >
                0
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={handleDecimalInput}
              >
                .
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg"
                onClick={calculateResult}
              >
                =
              </button>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('+')}
              >
                +
              </button>
              
              {/* Row 6 */}
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleFunctionInput('ln')}
              >
                ln
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('^')}
              >
                x^y
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('3.14159')}
              >
                π
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleNumberInput('2.71828')}
              >
                e
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg"
                onClick={() => handleOperatorInput('%')}
              >
                %
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator; 