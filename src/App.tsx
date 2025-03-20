import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Calculator = lazy(() => import('./pages/Calculator'));
const ScientificCalculator = lazy(() => import('./pages/ScientificCalculator'));
const Graphing = lazy(() => import('./pages/Graphing'));
const MathGames = lazy(() => import('./pages/MathGames'));
const Calculus = lazy(() => import('./pages/Calculus'));
const Formulas = lazy(() => import('./pages/Formulas'));
const EngineeringTools = lazy(() => import('./pages/EngineeringTools'));
const MathTables = lazy(() => import('./pages/MathTables'));
const InteractiveGeometry = lazy(() => import('./pages/InteractiveGeometry'));
const EquationSolver = lazy(() => import('./pages/EquationSolver'));
const PrimeNumbers = lazy(() => import('./pages/PrimeNumbers'));
const GraphTheory = lazy(() => import('./pages/GraphTheory'));
const Converter = lazy(() => import('./pages/Converter'));
const MorseConverter = lazy(() => import('./pages/MorseConverter'));
const UiDemo = lazy(() => import('./pages/UiDemo'));
const ChartsDemo = lazy(() => import('./pages/ChartsDemo'));
const PhysicsCalculator = lazy(() => import('./pages/PhysicsCalculator'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Feedback = lazy(() => import('./pages/Feedback'));
const UnitConverter = lazy(() => import('./pages/UnitConverter'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="scientific-calculator" element={<ScientificCalculator />} />
          <Route path="graphing" element={<Graphing />} />
          <Route path="math-games" element={<MathGames />} />
          <Route path="calculus" element={<Calculus />} />
          <Route path="formulas" element={<Formulas />} />
          <Route path="engineering-tools" element={<EngineeringTools />} />
          <Route path="math-tables" element={<MathTables />} />
          <Route path="interactive-geometry" element={<InteractiveGeometry />} />
          <Route path="equation-solver" element={<EquationSolver />} />
          <Route path="prime-numbers" element={<PrimeNumbers />} />
          <Route path="graph-theory" element={<GraphTheory />} />
          <Route path="converter" element={<Converter />} />
          <Route path="morse-converter" element={<MorseConverter />} />
          <Route path="ui-demo" element={<UiDemo />} />
          <Route path="charts-demo" element={<ChartsDemo />} />
          <Route path="physics-calculator" element={<PhysicsCalculator />} />
          <Route path="unit-converter" element={<UnitConverter />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App; 