import { useState } from 'react';
import './App.css';

function App() {
  const [percentage, setPercentage] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow empty input or numbers between 0 and 100
    if (value === '') {
      setPercentage('');
    } else {
      const numValue = Number(value);
      if (numValue >= 0 && numValue <= 100) {
        setPercentage(numValue);
      }
    }
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${percentage || 0}%` }}
          ></div>
        </div>
        <div className="input-container">
          <input
            type="number"
            min="0"
            max="100"
            value={percentage}
            onChange={handleInputChange}
            className="percentage-input"
          />
          <span className="percentage-label">%</span>
        </div>
      </div>
    </div>
  );
}

export default App;
