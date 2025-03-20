import React, { useState, useEffect } from 'react';

interface HistoryItem {
  calculation: string;
  result: string;
  timestamp: Date;
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    // Load memory from localStorage if available
    const savedMemory = localStorage.getItem('calculatorMemory');
    if (savedMemory) {
      setMemory(parseFloat(savedMemory));
    }
    
    // Load history from localStorage if available
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string timestamps back to Date objects
        const processedHistory = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(processedHistory);
      } catch (e) {
        console.error('Error parsing history from localStorage', e);
      }
    }
  }, []);

  // Save memory to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('calculatorMemory', memory.toString());
  }, [memory]);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const inputDot = () => {
    if (!/\./.test(display)) {
      setDisplay(display + '.');
      setWaitingForOperand(false);
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const addToHistory = (calculation: string, result: string) => {
    const newHistoryItem: HistoryItem = {
      calculation,
      result,
      timestamp: new Date()
    };
    
    // Limit history to last 10 items
    const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    let newExpression = '';

    if (previousValue === null) {
      setPreviousValue(display);
      newExpression = display + (nextOperator === '=' ? '' : ` ${nextOperator} `);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue: number;
      const prevExpression = expression || previousValue;

      newExpression = prevExpression + (prevExpression.endsWith(' ') ? '' : ' ') + display;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      const formattedNewValue = Number.isInteger(newValue) 
        ? newValue.toString() 
        : newValue.toFixed(8).replace(/\.?0+$/, '');

      setPreviousValue(formattedNewValue);
      setDisplay(formattedNewValue);

      if (nextOperator === '=') {
        addToHistory(newExpression, formattedNewValue);
        newExpression = '';
      } else {
        newExpression = formattedNewValue + ` ${nextOperator} `;
      }
    }

    setExpression(newExpression);
    setWaitingForOperand(true);
    setOperation(nextOperator === '=' ? null : nextOperator);
  };

  // Memory functions
  const memoryRecall = () => {
    setDisplay(memory.toString());
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let { key } = event;
    
    if (key === 'Enter') key = '=';
    
    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(key);
    } else if (key === '.') {
      event.preventDefault();
      inputDot();
    } else if (key === 'Backspace') {
      event.preventDefault();
      if (display !== '0') {
        setDisplay(display.substring(0, display.length - 1) || '0');
      }
    } else if (key === 'Escape') {
      event.preventDefault();
      if (display !== '0') {
        clearDisplay();
      } else {
        clearAll();
      }
    } else if (key === '+' || key === '-' || key === '×' || key === '*' || key === '÷' || key === '/') {
      event.preventDefault();
      if (key === '*') key = '×';
      if (key === '/') key = '÷';
      performOperation(key);
    } else if (key === '=' || key === 'Enter') {
      event.preventDefault();
      if (operation) {
        performOperation('=');
      }
    }
  };

  // Format date for history display
  const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
        Basic Calculator
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <div 
            className="card shadow-indigo-500/10 border-indigo-500/20" 
            onKeyDown={handleKeyDown} 
            tabIndex={0}
          >
            {/* Expression Display */}
            <div className="mb-1 text-right text-gray-400 text-sm h-6 overflow-hidden">
              {expression}
            </div>
            
            {/* Main Display */}
            <div className="mb-6 text-right bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm shadow-inner">
              <div className="text-4xl font-bold text-white break-all overflow-x-auto">{display}</div>
            </div>
            
            {/* Memory Display */}
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {memory !== 0 && (
                  <span className="bg-gray-700/50 px-2 py-1 rounded">M: {memory}</span>
                )}
              </div>
              <button 
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
            
            {/* Memory Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <button 
                className="bg-gray-700/70 hover:bg-gray-600 text-gray-300 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                onClick={memoryClear}
              >
                MC
              </button>
              <button 
                className="bg-gray-700/70 hover:bg-gray-600 text-gray-300 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                onClick={memoryRecall}
              >
                MR
              </button>
              <button 
                className="bg-gray-700/70 hover:bg-gray-600 text-gray-300 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                onClick={memoryAdd}
              >
                M+
              </button>
              <button 
                className="bg-gray-700/70 hover:bg-gray-600 text-gray-300 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                onClick={memorySubtract}
              >
                M-
              </button>
            </div>
            
            {/* Calculator Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <button 
                className="bg-gray-600/80 hover:bg-gray-500 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                onClick={clearAll}
              >
                AC
              </button>
              <button 
                className="bg-gray-600/80 hover:bg-gray-500 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                onClick={toggleSign}
              >
                +/-
              </button>
              <button 
                className="bg-gray-600/80 hover:bg-gray-500 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                onClick={inputPercent}
              >
                %
              </button>
              <button 
                className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => performOperation('÷')}
              >
                ÷
              </button>
              
              {[7, 8, 9].map(num => (
                <button 
                  key={num} 
                  className="bg-gray-700/80 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                  onClick={() => inputDigit(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button 
                className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => performOperation('×')}
              >
                ×
              </button>
              
              {[4, 5, 6].map(num => (
                <button 
                  key={num} 
                  className="bg-gray-700/80 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                  onClick={() => inputDigit(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button 
                className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => performOperation('-')}
              >
                -
              </button>
              
              {[1, 2, 3].map(num => (
                <button 
                  key={num} 
                  className="bg-gray-700/80 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                  onClick={() => inputDigit(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button 
                className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => performOperation('+')}
              >
                +
              </button>
              
              <button 
                className="bg-gray-700/80 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105 col-span-2"
                onClick={() => inputDigit('0')}
              >
                0
              </button>
              <button 
                className="bg-gray-700/80 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-inner transition-all duration-200 hover:scale-105"
                onClick={inputDot}
              >
                .
              </button>
              <button 
                className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-4 rounded-lg text-lg shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => performOperation('=')}
              >
                =
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400 text-center">
              <p>Tip: You can use your keyboard for input</p>
            </div>
          </div>
        </div>
        
        {/* History Panel */}
        <div className={`${showHistory ? 'block' : 'hidden lg:block'}`}>
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-indigo-400">Calculation History</h3>
              <button 
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                onClick={clearHistory}
                disabled={history.length === 0}
              >
                Clear
              </button>
            </div>
            
            {history.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {history.map((item, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1">{formatDate(item.timestamp)}</div>
                    <div className="text-sm text-gray-300">{item.calculation}</div>
                    <div className="text-right font-bold text-lg">{item.result}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No calculations yet</p>
                <p className="text-sm mt-2">Your calculation history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 