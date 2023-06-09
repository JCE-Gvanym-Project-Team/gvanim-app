import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// RTL - Right to Left imports
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

// take care of RTL stuff
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <BrowserRouter >
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </CacheProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
