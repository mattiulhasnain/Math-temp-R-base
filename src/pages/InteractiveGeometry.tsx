import React, { useState, useRef, useEffect } from 'react';

type ShapeType = 'line' | 'circle' | 'rectangle' | 'triangle' | 'polygon' | 'text';
type DrawingMode = 'draw' | 'move' | 'erase';

interface Point {
  x: number;
  y: number;
}

interface Shape {
  id: string;
  type: ShapeType;
  points: Point[];
  color: string;
  filled: boolean;
  strokeWidth: number;
  text?: string;
}

const InteractiveGeometry: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentShape, setCurrentShape] = useState<Partial<Shape> | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('draw');
  const [shapeType, setShapeType] = useState<ShapeType>('line');
  const [color, setColor] = useState<string>('#3B82F6');
  const [filled, setFilled] = useState<boolean>(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [text, setText] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [measurements, setMeasurements] = useState<{[key: string]: string}>({});
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvasCtxRef.current = ctx;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Redraw all shapes when component mounts or shapes change
    drawShapes();
  }, [shapes]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Save current dimensions
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      // Update canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Scale shapes proportionally
      const scaleX = canvas.width / oldWidth;
      const scaleY = canvas.height / oldHeight;
      
      setShapes(shapes.map(shape => ({
        ...shape,
        points: shape.points.map(point => ({
          x: point.x * scaleX,
          y: point.y * scaleY
        }))
      })));
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [shapes]);
  
  const drawShapes = () => {
    const ctx = canvasCtxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all shapes
    shapes.forEach(shape => {
      drawShape(ctx, shape);
      
      // Highlight selected shape
      if (shape.id === selectedShape) {
        ctx.strokeStyle = '#FF9800';
        ctx.lineWidth = 2;
        
        // Draw selection handles
        shape.points.forEach(point => {
          ctx.fillStyle = '#FF9800';
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw bounding box
        if (shape.points.length > 1) {
          const minX = Math.min(...shape.points.map(p => p.x)) - 5;
          const minY = Math.min(...shape.points.map(p => p.y)) - 5;
          const maxX = Math.max(...shape.points.map(p => p.x)) + 5;
          const maxY = Math.max(...shape.points.map(p => p.y)) + 5;
          
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.rect(minX, minY, maxX - minX, maxY - minY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    });
  };
  
  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.strokeStyle = shape.color;
    ctx.fillStyle = shape.color;
    ctx.lineWidth = shape.strokeWidth;
    
    switch (shape.type) {
      case 'line':
        if (shape.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        ctx.lineTo(shape.points[1].x, shape.points[1].y);
        ctx.stroke();
        break;
      
      case 'circle':
        if (shape.points.length < 2) return;
        const center = shape.points[0];
        const radiusPoint = shape.points[1];
        const radius = Math.sqrt(
          Math.pow(radiusPoint.x - center.x, 2) + 
          Math.pow(radiusPoint.y - center.y, 2)
        );
        
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        if (shape.filled) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
        break;
      
      case 'rectangle':
        if (shape.points.length < 2) return;
        const start = shape.points[0];
        const end = shape.points[1];
        const width = end.x - start.x;
        const height = end.y - start.y;
        
        if (shape.filled) {
          ctx.fillRect(start.x, start.y, width, height);
        } else {
          ctx.strokeRect(start.x, start.y, width, height);
        }
        break;
      
      case 'triangle':
        if (shape.points.length < 3) return;
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        ctx.lineTo(shape.points[1].x, shape.points[1].y);
        ctx.lineTo(shape.points[2].x, shape.points[2].y);
        ctx.closePath();
        
        if (shape.filled) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
        break;
      
      case 'polygon':
        if (shape.points.length < 3) return;
        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }
        
        ctx.closePath();
        
        if (shape.filled) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
        break;
      
      case 'text':
        if (!shape.text || shape.points.length < 1) return;
        ctx.font = '16px Arial';
        ctx.fillStyle = shape.color;
        ctx.fillText(shape.text, shape.points[0].x, shape.points[0].y);
        break;
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    switch (drawingMode) {
      case 'draw':
        setIsDrawing(true);
        
        // Start a new shape
        const id = Date.now().toString();
        const newShape: Partial<Shape> = {
          id,
          type: shapeType,
          points: [{ x, y }],
          color,
          filled,
          strokeWidth,
          text: shapeType === 'text' ? text : undefined
        };
        
        setCurrentShape(newShape);
        break;
      
      case 'move':
        // Check if clicked on a shape
        for (const shape of shapes) {
          if (isPointInShape(x, y, shape)) {
            setSelectedShape(shape.id);
            return;
          }
        }
        setSelectedShape(null);
        break;
      
      case 'erase':
        // Check if clicked on a shape to erase
        const updatedShapes = shapes.filter(shape => !isPointInShape(x, y, shape));
        if (updatedShapes.length !== shapes.length) {
          setShapes(updatedShapes);
          // Clear measurements if any shape was deleted
          setMeasurements({});
        }
        break;
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentShape) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update preview based on shape type
    switch (currentShape.type) {
      case 'line':
      case 'circle':
      case 'rectangle':
        setCurrentShape({
          ...currentShape,
          points: [currentShape.points![0], { x, y }]
        });
        break;
      
      case 'triangle':
        if (currentShape.points!.length === 1) {
          setCurrentShape({
            ...currentShape,
            points: [...currentShape.points!, { x, y }]
          });
        } else if (currentShape.points!.length === 2) {
          setCurrentShape({
            ...currentShape,
            points: [currentShape.points![0], currentShape.points![1], { x, y }]
          });
        }
        break;
      
      case 'polygon':
        // Show preview of next segment
        const tempShape = { ...currentShape };
        if (tempShape.points!.length > 1) {
          tempShape.points = [
            ...tempShape.points!.slice(0, -1),
            { x, y }
          ];
        } else {
          tempShape.points = [...tempShape.points!, { x, y }];
        }
        setCurrentShape(tempShape);
        break;
      
      case 'text':
        // Text doesn't need mouse move handling
        break;
    }
    
    // Redraw canvas with preview
    drawShapes();
    if (currentShape && currentShape.points && currentShape.points.length > 0) {
      const ctx = canvasCtxRef.current;
      if (ctx && currentShape.points) {
        drawShape(ctx, currentShape as Shape);
      }
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentShape) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    switch (currentShape.type) {
      case 'line':
      case 'circle':
      case 'rectangle':
        // Complete the shape with two points
        const shape: Shape = {
          ...currentShape as Shape,
          points: [currentShape.points![0], { x, y }]
        };
        setShapes([...shapes, shape]);
        setCurrentShape(null);
        setIsDrawing(false);
        break;
      
      case 'triangle':
        if (currentShape.points!.length < 2) {
          // Add second point
          setCurrentShape({
            ...currentShape,
            points: [...currentShape.points!, { x, y }]
          });
        } else {
          // Complete triangle with third point
          const shape: Shape = {
            ...currentShape as Shape,
            points: [...currentShape.points!, { x, y }]
          };
          setShapes([...shapes, shape]);
          setCurrentShape(null);
          setIsDrawing(false);
        }
        break;
      
      case 'polygon':
        // Add new point, double click to finish
        setCurrentShape({
          ...currentShape,
          points: [...currentShape.points!, { x, y }]
        });
        break;
      
      case 'text':
        const textShape: Shape = {
          ...currentShape as Shape,
          points: [{ x, y }]
        };
        setShapes([...shapes, textShape]);
        setCurrentShape(null);
        setIsDrawing(false);
        break;
    }
  };
  
  const handleDoubleClick = () => {
    // Complete polygon
    if (currentShape && currentShape.type === 'polygon' && currentShape.points!.length >= 3) {
      const polygon: Shape = {
        ...currentShape as Shape,
        points: [...currentShape.points!]
      };
      setShapes([...shapes, polygon]);
      setCurrentShape(null);
      setIsDrawing(false);
    }
  };
  
  const isPointInShape = (x: number, y: number, shape: Shape): boolean => {
    // Simple hit-testing logic
    switch (shape.type) {
      case 'line':
        return isPointNearLine(x, y, shape.points[0], shape.points[1], 5);
      
      case 'circle':
        const center = shape.points[0];
        const radiusPoint = shape.points[1];
        const radius = Math.sqrt(
          Math.pow(radiusPoint.x - center.x, 2) + 
          Math.pow(radiusPoint.y - center.y, 2)
        );
        const distance = Math.sqrt(
          Math.pow(x - center.x, 2) + 
          Math.pow(y - center.y, 2)
        );
        return distance <= radius + 5 && distance >= radius - 5;
      
      case 'rectangle':
        const start = shape.points[0];
        const end = shape.points[1];
        return (
          x >= Math.min(start.x, end.x) - 5 &&
          x <= Math.max(start.x, end.x) + 5 &&
          y >= Math.min(start.y, end.y) - 5 &&
          y <= Math.max(start.y, end.y) + 5
        );
      
      case 'triangle':
      case 'polygon':
        return shape.points.some((point, i) => {
          const nextPoint = shape.points[(i + 1) % shape.points.length];
          return isPointNearLine(x, y, point, nextPoint, 5);
        });
      
      case 'text':
        const textPoint = shape.points[0];
        return (
          x >= textPoint.x - 5 &&
          x <= textPoint.x + 100 &&
          y >= textPoint.y - 20 &&
          y <= textPoint.y + 5
        );
      
      default:
        return false;
    }
  };
  
  const isPointNearLine = (
    x: number, 
    y: number, 
    start: Point, 
    end: Point, 
    threshold: number
  ): boolean => {
    const A = x - start.x;
    const B = y - start.y;
    const C = end.x - start.x;
    const D = end.y - start.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = dot / lenSq;
    
    let xx, yy;
    
    if (param < 0) {
      xx = start.x;
      yy = start.y;
    } else if (param > 1) {
      xx = end.x;
      yy = end.y;
    } else {
      xx = start.x + param * C;
      yy = start.y + param * D;
    }
    
    const dx = x - xx;
    const dy = y - yy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < threshold;
  };
  
  const calculateMeasurements = () => {
    if (!selectedShape) return;
    
    const shape = shapes.find(s => s.id === selectedShape);
    if (!shape) return;
    
    const newMeasurements: {[key: string]: string} = {};
    
    switch (shape.type) {
      case 'line':
        const dx = shape.points[1].x - shape.points[0].x;
        const dy = shape.points[1].y - shape.points[0].y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        newMeasurements['Length'] = `${length.toFixed(2)} units`;
        newMeasurements['Angle'] = `${angle.toFixed(2)}°`;
        break;
      
      case 'circle':
        const center = shape.points[0];
        const radiusPoint = shape.points[1];
        const radius = Math.sqrt(
          Math.pow(radiusPoint.x - center.x, 2) + 
          Math.pow(radiusPoint.y - center.y, 2)
        );
        
        newMeasurements['Radius'] = `${radius.toFixed(2)} units`;
        newMeasurements['Diameter'] = `${(2 * radius).toFixed(2)} units`;
        newMeasurements['Circumference'] = `${(2 * Math.PI * radius).toFixed(2)} units`;
        newMeasurements['Area'] = `${(Math.PI * radius * radius).toFixed(2)} sq units`;
        break;
      
      case 'rectangle':
        const rectStart = shape.points[0];
        const rectEnd = shape.points[1];
        const width = Math.abs(rectEnd.x - rectStart.x);
        const height = Math.abs(rectEnd.y - rectStart.y);
        
        newMeasurements['Width'] = `${width.toFixed(2)} units`;
        newMeasurements['Height'] = `${height.toFixed(2)} units`;
        newMeasurements['Perimeter'] = `${(2 * (width + height)).toFixed(2)} units`;
        newMeasurements['Area'] = `${(width * height).toFixed(2)} sq units`;
        break;
      
      case 'triangle':
        // Calculate side lengths
        const sides: number[] = [];
        for (let i = 0; i < 3; i++) {
          const p1 = shape.points[i];
          const p2 = shape.points[(i + 1) % 3];
          const side = Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + 
            Math.pow(p2.y - p1.y, 2)
          );
          sides.push(side);
        }
        
        newMeasurements['Side A'] = `${sides[0].toFixed(2)} units`;
        newMeasurements['Side B'] = `${sides[1].toFixed(2)} units`;
        newMeasurements['Side C'] = `${sides[2].toFixed(2)} units`;
        
        // Perimeter
        const perimeter = sides.reduce((sum, side) => sum + side, 0);
        newMeasurements['Perimeter'] = `${perimeter.toFixed(2)} units`;
        
        // Area using Heron's formula
        const s = perimeter / 2;
        const triangleArea = Math.sqrt(
          s * (s - sides[0]) * (s - sides[1]) * (s - sides[2])
        );
        newMeasurements['Area'] = `${triangleArea.toFixed(2)} sq units`;
        break;
      
      case 'polygon':
        if (shape.points.length < 3) return;
        
        // Calculate perimeter
        let polyPerimeter = 0;
        for (let i = 0; i < shape.points.length; i++) {
          const p1 = shape.points[i];
          const p2 = shape.points[(i + 1) % shape.points.length];
          const side = Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + 
            Math.pow(p2.y - p1.y, 2)
          );
          polyPerimeter += side;
        }
        
        newMeasurements['Number of Sides'] = `${shape.points.length}`;
        newMeasurements['Perimeter'] = `${polyPerimeter.toFixed(2)} units`;
        
        // Area using Shoelace formula
        let polygonArea = 0;
        for (let i = 0; i < shape.points.length; i++) {
          const j = (i + 1) % shape.points.length;
          polygonArea += shape.points[i].x * shape.points[j].y;
          polygonArea -= shape.points[j].x * shape.points[i].y;
        }
        polygonArea = Math.abs(polygonArea) / 2;
        newMeasurements['Area'] = `${polygonArea.toFixed(2)} sq units`;
        break;
    }
    
    setMeasurements(newMeasurements);
  };
  
  const clearCanvas = () => {
    setShapes([]);
    setCurrentShape(null);
    setSelectedShape(null);
    setMeasurements({});
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Interactive Geometry</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Drawing Mode</h2>
            <div className="grid grid-cols-3 gap-2">
              {(['draw', 'move', 'erase'] as DrawingMode[]).map(mode => (
                <button
                  key={mode}
                  className={`p-2 rounded-lg ${
                    drawingMode === mode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setDrawingMode(mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {drawingMode === 'draw' && (
            <>
              <div>
                <h2 className="text-xl font-semibold mb-4">Shape Type</h2>
                <div className="grid grid-cols-2 gap-2">
                  {(['line', 'circle', 'rectangle', 'triangle', 'polygon', 'text'] as ShapeType[]).map(type => (
                    <button
                      key={type}
                      className={`p-2 rounded-lg ${
                        shapeType === type
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setShapeType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Style</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label block mb-1">Color</label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="label block mb-1">Stroke Width</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-right text-sm text-gray-400">{strokeWidth}px</div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="filled"
                      checked={filled}
                      onChange={(e) => setFilled(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="filled" className="label">Fill Shape</label>
                  </div>
                  
                  {shapeType === 'text' && (
                    <div>
                      <label className="label block mb-1">Text</label>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        className="input w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          <div>
            <button
              onClick={clearCanvas}
              className="btn-secondary w-full"
            >
              Clear Canvas
            </button>
          </div>
          
          {selectedShape && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Measurements</h2>
              <button
                onClick={calculateMeasurements}
                className="btn-primary w-full mb-4"
              >
                Calculate
              </button>
              
              {Object.keys(measurements).length > 0 && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {Object.entries(measurements).map(([label, value]) => (
                      <li key={label} className="flex justify-between">
                        <span className="text-gray-300">{label}:</span>
                        <span className="font-semibold">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Canvas */}
        <div className="lg:col-span-3 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div 
            className="w-full h-[500px] bg-gray-700 rounded-lg relative"
            style={{ touchAction: 'none' }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDoubleClick={handleDoubleClick}
            ></canvas>
          </div>
          
          <div className="mt-4 text-gray-300 text-sm">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Select a drawing mode and shape type from the tools panel</li>
              <li>Click and drag to draw shapes</li>
              <li>For polygons, click to add points and double-click to finish</li>
              <li>For text, click where you want to add text</li>
              <li>Use the Move tool to select shapes and calculate measurements</li>
              <li>Use the Erase tool to remove shapes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGeometry; 