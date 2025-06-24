import React from 'react';
import ProductTable from './components/ProductTable';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <ProductTable />
      </div>
    </ThemeProvider>
  );
}

export default App;