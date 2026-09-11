import { useState, useCallback } from 'react';
import Home from './pages/Home';
import Preloader from './components/Preloader/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Home />
    </>
  );
}

export default App;
