import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load components
const Calculator = lazy(() => import('./pages/Calculator'));
const ScientificCalculator = lazy(() => import('./pages/ScientificCalculator'));
const UnitConverter = lazy(() => import('./pages/UnitConverter'));
const UiDemo = lazy(() => import('./pages/UiDemo'));
const ChartsDemo = lazy(() => import('./pages/ChartsDemo'));
const PhysicsReferences = lazy(() => import('./pages/PhysicsReferences'));
const PhysicsCalculator = lazy(() => import('./pages/PhysicsCalculator'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Calculator />} />
          <Route path="scientific" element={<ScientificCalculator />} />
          <Route path="converter" element={<UnitConverter />} />
          <Route path="ui-demo" element={<UiDemo />} />
          <Route path="charts-demo" element={<ChartsDemo />} />
          <Route path="physics-references" element={<PhysicsReferences />} />
          <Route path="physics-calculator" element={<PhysicsCalculator />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App; 