import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { DataProvider } from './context/data.context';
import './App.css';

const HomeRoute = React.lazy(() => import('./routes/Home'));

function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <DataProvider> 
                  <Routes>
                    <Route path='/' element={<HomeRoute location={{search: '/'}} />} />
                  </Routes>
            </DataProvider>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
