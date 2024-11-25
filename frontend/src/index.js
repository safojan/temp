import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import {createTheme,ThemeProvider} from '@mui/material/styles';



const colorfulTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#4ECDC4',
    },
    background: {
      default: '#2F2E41',
      paper: '#16e9d4',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },

});






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={colorfulTheme}>
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
)