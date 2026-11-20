import { useState, useCallback } from 'react';
import Home from './pages/Home';
import Preloader from './components/Preloader/Preloader';
import { SmoothScrollProvider } from './context/SmoothScroll';

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SmoothScrollProvider>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Home preloaderDone={!loading} />
    </SmoothScrollProvider>
  );
}

export default App;
