import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Treemap, RadialBarChart, RadialBar, Cell
} from 'recharts';

const ChartsDemo: React.FC = () => {
  // Sample data for different chart types
  const [activeTab, setActiveTab] = useState<
    'line' | 'area' | 'bar' | 'pie' | 'scatter' | 'radar' | 'composed' | 'treemap' | 'radialBar'
  >('line');

  const lineData = [
    { name: 'Jan', value: 400, value2: 240 },
    { name: 'Feb', value: 300, value2: 139 },
    { name: 'Mar', value: 200, value2: 980 },
    { name: 'Apr', value: 278, value2: 390 },
    { name: 'May', value: 189, value2: 480 },
    { name: 'Jun', value: 239, value2: 380 },
    { name: 'Jul', value: 349, value2: 430 },
  ];

  const areaData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const barData = [
    { name: 'Category A', value: 4000 },
    { name: 'Category B', value: 3000 },
    { name: 'Category C', value: 2000 },
    { name: 'Category D', value: 2780 },
    { name: 'Category E', value: 1890 },
    { name: 'Category F', value: 2390 },
  ];
  
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  
  const radarData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ];
  
  const composedData = [
    { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
    { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
    { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
    { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
    { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
    { name: 'Page F', uv: 1400, pv: 680, amt: 1700 },
  ];
  
  const treemapData = [
    {
      name: 'axis',
      children: [
        { name: 'Axes', size: 1302 },
        { name: 'Axis', size: 24593 },
        { name: 'AxisGridLine', size: 652 },
        { name: 'AxisLabel', size: 636 },
      ],
    },
    {
      name: 'controls',
      children: [
        { name: 'AnchorControl', size: 2138 },
        { name: 'ClickControl', size: 3824 },
        { name: 'Control', size: 1353 },
        { name: 'ControlList', size: 4665 },
      ],
    },
    {
      name: 'data',
      children: [
        { name: 'Data', size: 20544 },
        { name: 'DataList', size: 19788 },
        { name: 'DataSprite', size: 10349 },
        { name: 'EdgeSprite', size: 3301 },
      ],
    },
  ];
  
  const radialBarData = [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-butterfly-purple-400 to-butterfly-pink-400 text-transparent bg-clip-text">
        Recharts Demo
      </h1>
      
      <p className="mb-8 text-butterfly-blue-100">
        This page demonstrates various chart types available in Recharts, a composable charting library built with D3 for React applications.
        Recharts offers a wide variety of chart components that can be easily integrated into your CalcHub project.
      </p>
      
      {/* Chart Type Selection Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(['line', 'area', 'bar', 'pie', 'scatter', 'radar', 'composed', 'treemap', 'radialBar'] as const).map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === type 
                ? 'bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white' 
                : 'bg-butterfly-blue-800/50 text-butterfly-blue-200 hover:bg-butterfly-blue-700/60'
            }`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </button>
        ))}
      </div>
      
      {/* Chart Display Area */}
      <div className="glass-card">
        <h2 className="text-xl font-semibold mb-4 text-butterfly-purple-300">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Chart Example
        </h2>
        
        <div className="h-96 w-full">
          {activeTab === 'line' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Line charts display data as a series of points connected by straight lines. They're excellent for showing trends over time or continuous data.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Series 1"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 1 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value2"
                    name="Series 2"
                    stroke="#ec4899"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'area' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Area charts are line charts with the area below the line filled in. They're useful for visualizing volume and showing part-to-whole relationships over time.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    name="User Views"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    name="Page Views"
                    stackId="1"
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'bar' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Bar charts use rectangular bars to show comparisons among categories. They are ideal for comparing discrete data points across different categories.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Value"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'pie' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Pie charts display data as slices of a circle. They are useful for showing the proportional composition of a whole or the percentage distribution of categories.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0 ? '#8b5cf6' :
                          index === 1 ? '#ec4899' :
                          index === 2 ? '#3b82fe' :
                          '#10b981'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'scatter' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Scatter charts display data points on a two-dimensional graph. They are ideal for showing the relationship between two variables or identifying correlations.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" dataKey="x" name="X Value" stroke="#a78bfa" />
                  <YAxis type="number" dataKey="y" name="Y Value" stroke="#a78bfa" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Scatter
                    name="Data Points"
                    data={scatterData}
                    fill="#8b5cf6"
                    shape="circle"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'radar' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Radar charts display multivariate data as a two-dimensional chart with three or more quantitative variables. They're useful for showing performance metrics across multiple dimensions.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="subject" stroke="#a78bfa" />
                  <PolarRadiusAxis stroke="#a78bfa" />
                  <Radar
                    name="Student A"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Student B"
                    dataKey="B"
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'composed' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Composed charts combine multiple chart types (line, bar, area) in a single chart. They're useful for comparing different types of related data in the same visualization.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <ComposedChart
                  data={composedData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" scale="band" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    name="Amount"
                    fill="#10b981"
                    fillOpacity={0.3}
                    stroke="#10b981"
                  />
                  <Bar
                    dataKey="pv"
                    name="Page Views"
                    barSize={20}
                    fill="#8b5cf6"
                    fillOpacity={0.8}
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    name="User Views"
                    stroke="#ec4899"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'treemap' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Treemaps display hierarchical data as nested rectangles. The size of each rectangle represents the value of the data point, making it easy to see patterns and proportions.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <Treemap
                  data={treemapData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#1e3a8a"
                  fill="#8b5cf6"
                >
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                </Treemap>
              </ResponsiveContainer>
            </>
          )}
          
          {activeTab === 'radialBar' && (
            <>
              <p className="text-butterfly-blue-200 mb-4">
                Radial bar charts display data using concentric circles. They're useful for showing progress or completion of tasks, or comparing values across categories.
              </p>
              <ResponsiveContainer width="100%" height="80%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={10}
                  data={radialBarData}
                >
                  <RadialBar
                    background
                    dataKey="uv"
                    angleAxisId={0}
                    label={{ position: 'insideStart', fill: '#fff' }}
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={{ top: 0, right: 0 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
      
      {/* Implementation Details */}
      <div className="glass-card mt-8">
        <h2 className="text-xl font-semibold mb-4 text-butterfly-purple-300">
          Implementation Details
        </h2>
        
        <div className="bg-butterfly-blue-900/50 p-4 rounded-lg overflow-auto">
          <pre className="text-butterfly-blue-100 text-sm">
            {`
// Example code for creating a Line Chart with Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
];

const MyLineChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);
            `.trim()}
          </pre>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-butterfly-pink-300 mb-2">Key Features of Recharts:</h3>
          <ul className="list-disc list-inside space-y-1 text-butterfly-blue-200">
            <li>Composable chart components for building complex visualizations</li>
            <li>Responsive design that adapts to container size</li>
            <li>Customizable tooltips, legends, and axes</li>
            <li>Smooth animations and transitions</li>
            <li>SVG-based rendering for high-quality graphics</li>
            <li>Support for various chart types: line, area, bar, pie, scatter, and more</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-butterfly-pink-300 mb-2">Resources:</h3>
          <ul className="list-disc list-inside space-y-1 text-butterfly-blue-200">
            <li>
              <a 
                href="https://recharts.org/en-US/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-butterfly-purple-400 hover:text-butterfly-purple-300 underline"
              >
                Official Recharts Documentation
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/recharts/recharts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-butterfly-purple-400 hover:text-butterfly-purple-300 underline"
              >
                Recharts GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChartsDemo; 