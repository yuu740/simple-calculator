  import React from 'react';
  import { Navigate } from "react-router-dom";
  import { Route, Routes, BrowserRouter } from 'react-router-dom';
  import './App.css';
  import Calculator from './components/Calculator';
  import SupportPage from './components/SupportPage';

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
