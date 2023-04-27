import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MileageReport from './components/MileageReport';
import ReportSlider from './components/ReportSlider';
import Footer from './components/Footer';
import './styles/App.scss';

function App() {
  // Function to prevent touch scrolling
// Declare the variable to store the initial clientX value
let initialClientX: number | null = null;

function touchStartHandler(e: TouchEvent): void {
  initialClientX = e.touches[0].clientX;
}

function touchMoveHandler(e: TouchEvent): void {
  if (initialClientX === null) {
    return;
  }

  // You can set a threshold value to determine when to prevent scrolling
  const threshold = 5;
  const currentClientX = e.touches[0].clientX;
  const diffX = Math.abs(initialClientX - currentClientX);

  if (diffX > threshold) {
    e.preventDefault();
  }
}

// Add the event listeners
document.addEventListener('touchstart', touchStartHandler, { passive: false });
document.addEventListener('touchmove', touchMoveHandler, { passive: false });

  return (
    <div className="App">
      <div className = "center-parent">
      <div className="center">
        <h1><span className="orange no-break">Mileage Report</span><span className="orange"> for TJ</span></h1>
        <Router>
          <MileageReport />
          <div className = "report-slider">
        <ReportSlider />
        </div>
        </Router>
        <Footer />
      </div>
      </div>
    </div>
  );
}

export default App;