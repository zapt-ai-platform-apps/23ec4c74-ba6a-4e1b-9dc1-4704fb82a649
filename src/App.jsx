import { Routes, Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import { createSignal } from 'solid-js';

function App() {
  const [generatedCode, setGeneratedCode] = createSignal(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage setGeneratedCode={setGeneratedCode} />} />
      <Route path="/result" element={<ResultPage generatedCode={generatedCode} />} />
    </Routes>
  );
}

export default App;