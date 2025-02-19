import ErrorBoundary from './components/ErrorBoundry';
import { ReactLenis } from 'lenis/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoute';
import { Suspense, useState, useEffect } from 'react';
import { Box, CircularProgress, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import PromoModal from './components/PromoModal';

const LoadingSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

const theme = createTheme({
  typography: {
    fontFamily: ['Avenir', 'Neue Haas Grotesk Display Pro', 'Axiforma', 'Noto Sans'].join(','),
  },
});

function App() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPromo = localStorage.getItem('hasSeenPromo');
      if (!hasSeenPromo) {
        setShowPromo(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePromo = () => {
    setShowPromo(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  return (
    <ErrorBoundary>
      <ReactLenis root>
        <Suspense fallback={<LoadingSkeleton />}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <PromoModal open={showPromo} onClose={handleClosePromo} />
          </ThemeProvider>
        </Suspense>
      </ReactLenis>
    </ErrorBoundary>
  );
}

export default App;
