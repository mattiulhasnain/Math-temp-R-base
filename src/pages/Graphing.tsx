import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import * as math from 'mathjs';

// Register Chart.js components
Chart.register(...registerables);

interface Function {
  expression: string;
  color: string;
  visible: boolean;
}

interface DataPoint {
  x: number;
  y: number;
}

const defaultColors = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

const Graphing: React.FC = () => {
  const [functions, setFunctions] = useState<Function[]>([
    { expression: 'sin(x)', color: defaultColors[0], visible: true }
  ]);
  const [newFunction, setNewFunction] = useState<string>('');
  const [xMin, setXMin] = useState<number>(-10);
  const [xMax, setXMax] = useState<number>(10);
  const [yMin, setYMin] = useState<number>(-10);
  const [yMax, setYMax] = useState<number>(10);
  const [samples, setSamples] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (chartContainer.current) {
      renderChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functions, xMin, xMax, yMin, yMax, samples]);

  const renderChart = () => {
    const ctx = chartContainer.current?.getContext('2d');
    if (!ctx) return;

    const step = (xMax - xMin) / samples;
    const datasets = functions
      .filter(f => f.visible)
      .map(func => {
        const data: DataPoint[] = [];
        for (let x = xMin; x <= xMax; x += step) {
          try {
            const scope = { x };
            const y = math.evaluate(func.expression, scope);
            
            // Only add points within y range
            if (y >= yMin && y <= yMax) {
              data.push({ x, y });
            }
          } catch (e) {
            // Skip points that cause errors
          }
        }
        return {
          label: func.expression,
          data,
          borderColor: func.color,
          backgroundColor: 'transparent',
          tension: 0.4
        };
      });

    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            min: xMin,
            max: xMax,
            grid: {
              color: 'rgba(200, 200, 200, 0.1)'
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            min: yMin,
            max: yMax,
            grid: {
              color: 'rgba(200, 200, 200, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const point = context.raw as DataPoint;
                return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
              }
            }
          }
        }
      }
    });
  };

  const handleAddFunction = () => {
    if (!newFunction.trim()) {
      setError('Please enter a function');
      return;
    }

    setError(null);
    try {
      // Test the function with a sample value
      math.evaluate(newFunction, { x: 1 });
      
      setFunctions([
        ...functions,
        {
          expression: newFunction,
          color: defaultColors[functions.length % defaultColors.length],
          visible: true
        }
      ]);
      setNewFunction('');
    } catch (e) {
      setError('Invalid function. Please check your syntax.');
    }
  };

  const handleRemoveFunction = (index: number) => {
    const newFunctions = [...functions];
    newFunctions.splice(index, 1);
    setFunctions(newFunctions);
  };

  const handleToggleVisibility = (index: number) => {
    const newFunctions = [...functions];
    newFunctions[index].visible = !newFunctions[index].visible;
    setFunctions(newFunctions);
  };

  const handleChangeColor = (index: number, color: string) => {
    const newFunctions = [...functions];
    newFunctions[index].color = color;
    setFunctions(newFunctions);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Function Grapher</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 bg-gray-800 p-4 rounded-xl">
          <div className="mb-6">
            <label className="label">Add New Function</label>
            <div className="flex">
              <input
                type="text"
                value={newFunction}
                onChange={(e) => setNewFunction(e.target.value)}
                placeholder="e.g., sin(x)"
                className="input flex-grow"
              />
              <button
                onClick={handleAddFunction}
                className="ml-2 btn-primary"
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mb-6">
            <label className="label">X Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label text-xs">Min</label>
                <input
                  type="number"
                  value={xMin}
                  onChange={(e) => setXMin(Number(e.target.value))}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label text-xs">Max</label>
                <input
                  type="number"
                  value={xMax}
                  onChange={(e) => setXMax(Number(e.target.value))}
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="label">Y Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label text-xs">Min</label>
                <input
                  type="number"
                  value={yMin}
                  onChange={(e) => setYMin(Number(e.target.value))}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label text-xs">Max</label>
                <input
                  type="number"
                  value={yMax}
                  onChange={(e) => setYMax(Number(e.target.value))}
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="label">Samples (Quality)</label>
            <input
              type="range"
              min="50"
              max="500"
              value={samples}
              onChange={(e) => setSamples(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-400">{samples}</div>
          </div>

          <div className="mb-6">
            <label className="label">Functions</label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2">
              {functions.map((func, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-700 p-2 rounded"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={func.visible}
                      onChange={() => handleToggleVisibility(index)}
                      className="mr-2"
                    />
                    <input
                      type="color"
                      value={func.color}
                      onChange={(e) => handleChangeColor(index, e.target.value)}
                      className="mr-2 w-6 h-6 rounded-full border-0 bg-transparent"
                    />
                    <span className="text-sm">{func.expression}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFunction(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="lg:col-span-3 bg-gray-800 p-4 rounded-xl">
          <div className="h-[600px]">
            <canvas ref={chartContainer}></canvas>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Usage Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Enter functions using standard mathematical notation (e.g., <code>sin(x)</code>, <code>x^2</code>, <code>sqrt(x)</code>).</li>
          <li>You can use constants like <code>pi</code> and <code>e</code>.</li>
          <li>Available functions: sin, cos, tan, sqrt, log (base 10), ln (natural log), abs, etc.</li>
          <li>Adjust the X and Y ranges to zoom in/out of specific regions.</li>
          <li>Increase the sample count for smoother curves (may affect performance).</li>
        </ul>
      </div>
    </div>
  );
};

export default Graphing; 