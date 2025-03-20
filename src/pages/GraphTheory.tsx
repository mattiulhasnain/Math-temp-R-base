import React, { useState, useRef, useEffect } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  weight?: number;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

type Algorithm = 'shortestPath' | 'minimumSpanningTree' | 'stronglyConnected' | 'topologicalSort';

const GraphTheory: React.FC = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('shortestPath');
  const [sourceNode, setSourceNode] = useState<string>('');
  const [targetNode, setTargetNode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [isWeighted, setIsWeighted] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [selectedNodeSource, setSelectedNodeSource] = useState<string | null>(null);
  const [phase, setPhase] = useState<'addNodes' | 'addEdges'>('addNodes');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtx.current = canvasRef.current.getContext('2d');
      drawGraph();
    }
  }, [graph, isDirected, phase, selectedNodeSource]);

  const drawGraph = () => {
    if (!canvasCtx.current || !canvasRef.current) return;

    const ctx = canvasCtx.current;
    const canvas = canvasRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    graph.edges.forEach(edge => {
      const source = graph.nodes.find(n => n.id === edge.source);
      const target = graph.nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw arrow if directed
        if (isDirected) {
          const angle = Math.atan2(target.y - source.y, target.x - source.x);
          const arrowLength = 15;
          const arrowWidth = 8;

          ctx.beginPath();
          ctx.moveTo(
            target.x - arrowLength * Math.cos(angle) + arrowWidth * Math.sin(angle),
            target.y - arrowLength * Math.sin(angle) - arrowWidth * Math.cos(angle)
          );
          ctx.lineTo(target.x, target.y);
          ctx.lineTo(
            target.x - arrowLength * Math.cos(angle) - arrowWidth * Math.sin(angle),
            target.y - arrowLength * Math.sin(angle) + arrowWidth * Math.cos(angle)
          );
          ctx.fillStyle = '#4f46e5';
          ctx.fill();
        }

        // Draw weight if weighted
        if (isWeighted && edge.weight !== undefined) {
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(edge.weight.toString(), midX, midY);
        }
      }
    });

    // Draw nodes
    graph.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      // Highlight selected source node during edge creation
      if (phase === 'addEdges' && selectedNodeSource === node.id) {
        ctx.fillStyle = '#22c55e'; // green
      } else {
        ctx.fillStyle = '#4f46e5'; // indigo
      }
      
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  };

  const addNode = (x: number, y: number) => {
    const newNode: Node = {
      id: `node${graph.nodes.length + 1}`,
      x,
      y,
      label: String.fromCharCode(65 + graph.nodes.length) // A, B, C, ...
    };

    setGraph(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const addEdge = (source: string, target: string) => {
    if (source === target) return;

    // Check if edge already exists
    const edgeExists = graph.edges.some(
      e => e.source === source && e.target === target ||
           (!isDirected && e.source === target && e.target === source)
    );

    if (edgeExists) return;

    const newEdge: Edge = {
      id: `edge${graph.edges.length + 1}`,
      source,
      target,
      weight: isWeighted ? Math.floor(Math.random() * 10) + 1 : undefined
    };

    setGraph(prev => ({
      ...prev,
      edges: [...prev.edges, newEdge]
    }));
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (phase === 'addNodes') {
      addNode(x, y);
    } else if (phase === 'addEdges') {
      const clickedNode = findNodeAtPosition(x, y);
      
      if (clickedNode) {
        if (selectedNodeSource === null) {
          // First click - select source
          setSelectedNodeSource(clickedNode.id);
        } else {
          // Second click - create edge and reset
          addEdge(selectedNodeSource, clickedNode.id);
          setSelectedNodeSource(null);
        }
      }
    }
  };

  const findNodeAtPosition = (x: number, y: number): Node | null => {
    return graph.nodes.find(node => 
      Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2)) < 20
    ) || null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || phase === 'addEdges') return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = findNodeAtPosition(x, y);

    if (clickedNode) {
      setIsDragging(true);
      setDraggedNode(clickedNode.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === draggedNode ? { ...node, x, y } : node
      )
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const runAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'shortestPath':
        findShortestPath();
        break;
      case 'minimumSpanningTree':
        findMinimumSpanningTree();
        break;
      case 'stronglyConnected':
        findStronglyConnectedComponents();
        break;
      case 'topologicalSort':
        performTopologicalSort();
        break;
    }
  };

  // Dijkstra's algorithm for shortest path
  const findShortestPath = () => {
    if (!sourceNode || !targetNode) {
      setResult('Please select source and target nodes');
      return;
    }

    if (graph.nodes.length === 0) {
      setResult('Graph is empty');
      return;
    }

    // Create adjacency list representation of the graph
    const adjacencyList: Record<string, Array<{ node: string; weight: number }>> = {};
    
    // Initialize adjacency list for all nodes
    graph.nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    
    // Add edges to adjacency list
    graph.edges.forEach(edge => {
      const weight = edge.weight || 1;
      adjacencyList[edge.source].push({ node: edge.target, weight });
      
      // If graph is undirected, add reverse edge
      if (!isDirected) {
        adjacencyList[edge.target].push({ node: edge.source, weight });
      }
    });
    
    // Initialize distances and visited nodes
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const visited: Record<string, boolean> = {};
    
    // Initialize all distances as infinity
    graph.nodes.forEach(node => {
      distances[node.id] = Infinity;
      previous[node.id] = null;
      visited[node.id] = false;
    });
    
    // Distance to source is 0
    distances[sourceNode] = 0;
    
    // Find the node with the minimum distance
    const findMinDistanceNode = (): string | null => {
      let minDistance = Infinity;
      let minNode: string | null = null;
      
      Object.keys(distances).forEach(nodeId => {
        if (!visited[nodeId] && distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          minNode = nodeId;
        }
      });
      
      return minNode;
    };
    
    // Main Dijkstra algorithm
    const currentNode = findMinDistanceNode();
    if (currentNode === null) {
      setResult('No path exists from source to target');
      return;
    }
    
    let current: string = currentNode;
    do {
      visited[current] = true;
      
      // If we reached the target, we can break
      if (current === targetNode) break;
      
      // Update distances to neighbors
      adjacencyList[current].forEach(neighbor => {
        if (!visited[neighbor.node]) {
          const newDistance = distances[current] + neighbor.weight;
          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = current;
          }
        }
      });
      
      current = findMinDistanceNode() || '';
    } while (current !== '');
    
    // Check if target is reachable
    if (distances[targetNode] === Infinity) {
      setResult('No path exists from source to target');
      return;
    }
    
    // Reconstruct the path
    const path: string[] = [];
    let step = targetNode;
    
    while (step) {
      path.unshift(step);
      step = previous[step] as string || '';
    }
    
    // Convert node IDs to labels
    const pathLabels = path.map(nodeId => {
      const node = graph.nodes.find(n => n.id === nodeId);
      return node ? node.label : nodeId;
    });
    
    // Format the result
    let resultText = `Shortest path from ${graph.nodes.find(n => n.id === sourceNode)?.label} to ${graph.nodes.find(n => n.id === targetNode)?.label}:\n`;
    resultText += `Path: ${pathLabels.join(' → ')}\n`;
    resultText += `Total distance: ${distances[targetNode]}`;
    
    setResult(resultText);
  };

  // Prim's algorithm for minimum spanning tree
  const findMinimumSpanningTree = () => {
    if (graph.nodes.length === 0) {
      setResult('Graph is empty');
      return;
    }
    
    if (isDirected) {
      setResult('Minimum spanning tree works only for undirected graphs. Please disable the directed graph option.');
      return;
    }
    
    // Create adjacency list representation of the graph
    const adjacencyList: Record<string, Array<{ node: string; weight: number }>> = {};
    
    // Initialize adjacency list for all nodes
    graph.nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    
    // Add edges to adjacency list
    graph.edges.forEach(edge => {
      const weight = edge.weight || 1;
      adjacencyList[edge.source].push({ node: edge.target, weight });
      adjacencyList[edge.target].push({ node: edge.source, weight });
    });
    
    // Initialize MST arrays
    const mstEdges: Array<{ source: string; target: string; weight: number }> = [];
    const visited: Record<string, boolean> = {};
    
    // Start with the first node
    const startNode = graph.nodes[0].id;
    visited[startNode] = true;
    
    // Priority queue (simplified for clarity)
    const queue: Array<{ source: string; target: string; weight: number }> = [];
    
    // Add all edges from start node to queue
    adjacencyList[startNode].forEach(neighbor => {
      queue.push({ source: startNode, target: neighbor.node, weight: neighbor.weight });
    });
    
    // Sort queue by weight (ascending)
    queue.sort((a, b) => a.weight - b.weight);
    
    // Main Prim's algorithm
    while (queue.length > 0 && Object.keys(visited).length < graph.nodes.length) {
      // Get the edge with minimum weight
      const { source, target, weight } = queue.shift()!;
      
      // If target is already visited, skip
      if (visited[target]) continue;
      
      // Add edge to MST
      mstEdges.push({ source, target, weight });
      visited[target] = true;
      
      // Add all edges from newly added node
      adjacencyList[target].forEach(neighbor => {
        if (!visited[neighbor.node]) {
          queue.push({ source: target, target: neighbor.node, weight: neighbor.weight });
        }
      });
      
      // Re-sort queue
      queue.sort((a, b) => a.weight - b.weight);
    }
    
    // Check if MST includes all nodes
    if (Object.keys(visited).length < graph.nodes.length) {
      setResult('The graph is not connected. Cannot form a minimum spanning tree.');
      return;
    }
    
    // Format the result
    let resultText = 'Minimum Spanning Tree:\n';
    let totalWeight = 0;
    
    mstEdges.forEach(edge => {
      const sourceLabel = graph.nodes.find(n => n.id === edge.source)?.label;
      const targetLabel = graph.nodes.find(n => n.id === edge.target)?.label;
      
      resultText += `${sourceLabel} — ${targetLabel} (weight: ${edge.weight})\n`;
      totalWeight += edge.weight;
    });
    
    resultText += `\nTotal weight: ${totalWeight}`;
    
    setResult(resultText);
  };

  // Kosaraju's algorithm for strongly connected components
  const findStronglyConnectedComponents = () => {
    if (graph.nodes.length === 0) {
      setResult('Graph is empty');
      return;
    }
    
    if (!isDirected) {
      setResult('Strongly connected components are defined for directed graphs. Please enable the directed graph option.');
      return;
    }
    
    // Create adjacency list and transpose adjacency list
    const adjacencyList: Record<string, string[]> = {};
    const transposeList: Record<string, string[]> = {};
    
    // Initialize both lists
    graph.nodes.forEach(node => {
      adjacencyList[node.id] = [];
      transposeList[node.id] = [];
    });
    
    // Fill the adjacency lists
    graph.edges.forEach(edge => {
      adjacencyList[edge.source].push(edge.target);
      transposeList[edge.target].push(edge.source);
    });
    
    // First DFS to fill the stack
    const visited: Record<string, boolean> = {};
    const stack: string[] = [];
    
    const fillOrder = (nodeId: string) => {
      visited[nodeId] = true;
      
      adjacencyList[nodeId].forEach(neighbor => {
        if (!visited[neighbor]) {
          fillOrder(neighbor);
        }
      });
      
      stack.push(nodeId);
    };
    
    // Fill the stack (order of finishing times)
    graph.nodes.forEach(node => {
      if (!visited[node.id]) {
        fillOrder(node.id);
      }
    });
    
    // Second DFS on transpose graph
    const resetVisited = () => {
      graph.nodes.forEach(node => {
        visited[node.id] = false;
      });
    };
    
    resetVisited();
    
    const components: string[][] = [];
    const dfsTranspose = (nodeId: string, component: string[]) => {
      visited[nodeId] = true;
      component.push(nodeId);
      
      transposeList[nodeId].forEach(neighbor => {
        if (!visited[neighbor]) {
          dfsTranspose(neighbor, component);
        }
      });
    };
    
    // Process stack in reverse order
    while (stack.length > 0) {
      const nodeId = stack.pop()!;
      
      if (!visited[nodeId]) {
        const component: string[] = [];
        dfsTranspose(nodeId, component);
        components.push(component);
      }
    }
    
    // Format the result
    let resultText = 'Strongly Connected Components:\n';
    
    components.forEach((component, index) => {
      const componentLabels = component.map(nodeId => {
        const node = graph.nodes.find(n => n.id === nodeId);
        return node ? node.label : nodeId;
      });
      
      resultText += `Component ${index + 1}: ${componentLabels.join(', ')}\n`;
    });
    
    resultText += `\nTotal number of strongly connected components: ${components.length}`;
    
    setResult(resultText);
  };

  // Topological Sort algorithm
  const performTopologicalSort = () => {
    if (graph.nodes.length === 0) {
      setResult('Graph is empty');
      return;
    }
    
    if (!isDirected) {
      setResult('Topological sort is defined for directed acyclic graphs. Please enable the directed graph option.');
      return;
    }
    
    // Create adjacency list
    const adjacencyList: Record<string, string[]> = {};
    
    // Initialize adjacency list
    graph.nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    
    // Fill the adjacency list
    graph.edges.forEach(edge => {
      adjacencyList[edge.source].push(edge.target);
    });
    
    // Check for cycles using DFS
    const visited: Record<string, boolean> = {};
    const recursionStack: Record<string, boolean> = {};
    
    const hasCycle = (nodeId: string): boolean => {
      // Mark current node as visited and add to recursion stack
      visited[nodeId] = true;
      recursionStack[nodeId] = true;
      
      // Recur for all neighbors
      for (const neighbor of adjacencyList[nodeId]) {
        // If not visited, check if cycle from neighbor
        if (!visited[neighbor]) {
          if (hasCycle(neighbor)) return true;
        } 
        // If already in recursion stack, cycle found
        else if (recursionStack[neighbor]) {
          return true;
        }
      }
      
      // Remove from recursion stack
      recursionStack[nodeId] = false;
      return false;
    };
    
    // Check for cycles
    let cycleExists = false;
    for (const node of graph.nodes) {
      if (!visited[node.id]) {
        if (hasCycle(node.id)) {
          cycleExists = true;
          break;
        }
      }
    }
    
    if (cycleExists) {
      setResult('The graph contains a cycle. Topological sort is only defined for directed acyclic graphs.');
      return;
    }
    
    // Reset visited for topological sort
    Object.keys(visited).forEach(key => {
      visited[key] = false;
    });
    
    // Topological sort
    const sortResult: string[] = [];
    
    const topologicalSortUtil = (nodeId: string) => {
      visited[nodeId] = true;
      
      // Recur for all adjacent vertices
      adjacencyList[nodeId].forEach(neighbor => {
        if (!visited[neighbor]) {
          topologicalSortUtil(neighbor);
        }
      });
      
      // Add current vertex to result
      sortResult.unshift(nodeId);
    };
    
    // Call the recursive helper for all vertices
    graph.nodes.forEach(node => {
      if (!visited[node.id]) {
        topologicalSortUtil(node.id);
      }
    });
    
    // Format the result
    const sortedLabels = sortResult.map(nodeId => {
      const node = graph.nodes.find(n => n.id === nodeId);
      return node ? node.label : nodeId;
    });
    
    const resultText = `Topological Sort: ${sortedLabels.join(' → ')}`;
    
    setResult(resultText);
  };

  const clearGraph = () => {
    setGraph({ nodes: [], edges: [] });
    setResult('');
    setSourceNode('');
    setTargetNode('');
    setSelectedNodeSource(null);
    setPhase('addNodes');
  };

  const togglePhase = () => {
    setPhase(phase === 'addNodes' ? 'addEdges' : 'addNodes');
    setSelectedNodeSource(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Graph Theory Tools</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Canvas</h2>
              <div className="flex space-x-2">
                <span className="text-gray-300">Mode:</span>
                <button
                  className={`px-2 py-1 rounded ${
                    phase === 'addNodes' ? 'bg-indigo-600' : 'bg-gray-700'
                  }`}
                  onClick={() => setPhase('addNodes')}
                >
                  Add Nodes
                </button>
                <button
                  className={`px-2 py-1 rounded ${
                    phase === 'addEdges' ? 'bg-indigo-600' : 'bg-gray-700'
                  }`}
                  onClick={() => setPhase('addEdges')}
                >
                  Add Edges
                </button>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-[600px] bg-gray-900 rounded-lg cursor-crosshair"
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <div className="mt-2 text-sm text-gray-400">
              {phase === 'addNodes' 
                ? 'Click on the canvas to add nodes. Drag nodes to reposition them.' 
                : 'Click on a node to select it as the source, then click on another node to create an edge.'}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Graph Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isDirected}
                    onChange={(e) => setIsDirected(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span>Directed Graph</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isWeighted}
                    onChange={(e) => setIsWeighted(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span>Weighted Graph</span>
                </label>
              </div>

              <button
                onClick={clearGraph}
                className="btn-secondary w-full"
              >
                Clear Graph
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Algorithms</h2>
            
            <div className="space-y-4">
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value as Algorithm)}
                className="input w-full"
              >
                <option value="shortestPath">Shortest Path</option>
                <option value="minimumSpanningTree">Minimum Spanning Tree</option>
                <option value="stronglyConnected">Strongly Connected Components</option>
                <option value="topologicalSort">Topological Sort</option>
              </select>

              {selectedAlgorithm === 'shortestPath' && (
                <div className="space-y-2">
                  <select
                    value={sourceNode}
                    onChange={(e) => setSourceNode(e.target.value)}
                    className="input w-full"
                  >
                    <option value="">Select Source Node</option>
                    {graph.nodes.map(node => (
                      <option key={node.id} value={node.id}>{node.label}</option>
                    ))}
                  </select>

                  <select
                    value={targetNode}
                    onChange={(e) => setTargetNode(e.target.value)}
                    className="input w-full"
                  >
                    <option value="">Select Target Node</option>
                    {graph.nodes.map(node => (
                      <option key={node.id} value={node.id}>{node.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={runAlgorithm}
                className="btn-primary w-full"
                disabled={graph.nodes.length === 0}
              >
                Run Algorithm
              </button>

              {result && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the mode buttons to switch between adding nodes and adding edges</li>
          <li>In "Add Nodes" mode, click on the canvas to add nodes and drag them to reposition</li>
          <li>In "Add Edges" mode, click on a node then another node to create an edge between them</li>
          <li>Toggle directed/weighted options to change graph type</li>
          <li>Select an algorithm and configure its parameters</li>
          <li>Click "Run Algorithm" to see the results</li>
          <li>Use "Clear Graph" to start over</li>
        </ul>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Toggle Phase</h2>
        <button
          onClick={togglePhase}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'addNodes'
              ? 'bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white'
              : 'bg-butterfly-blue-800/50 text-butterfly-blue-200 hover:bg-butterfly-blue-700/60'
          }`}
        >
          {phase === 'addNodes' ? 'Switch to Add Edges' : 'Switch to Add Nodes'}
        </button>
      </div>
    </div>
  );
};

export default GraphTheory; 