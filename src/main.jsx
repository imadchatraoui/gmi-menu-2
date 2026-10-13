import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import './styles.css';
import './react-enhancements.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 180, damping: 24 }}>
      <App />
    </MotionConfig>
  </StrictMode>,
);
