import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import WidgetDetailsPage from './pages/WidgetDetailsPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/widget/:id" element={<WidgetDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
