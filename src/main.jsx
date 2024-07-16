import React from 'react';
import ReactDOM from 'react-dom/client';
const App = React.lazy(() => import('./App'));
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={<div  className='w-full h-full absolute top-0 left-0 right-0 bottom-0'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='text-2xl'>Loading...</div>
      </div>
    </div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
