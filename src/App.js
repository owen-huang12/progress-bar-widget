import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function App() {
  // Get the ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const barId = urlParams.get('id') || 'default';

  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(true);

  // Load saved percentage from backend on mount
  useEffect(() => {
    fetch(`${API_URL}/progress/${barId}`)
      .then(res => res.json())
      .then(data => {
        setPercentage(data.percentage || '');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading progress:', err);
        setLoading(false);
      });
  }, [barId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow empty input or numbers between 0 and 100
    if (value === '') {
      setPercentage('');
      saveToBackend('');
    } else {
      const numValue = Number(value);
      if (numValue >= 0 && numValue <= 100) {
        setPercentage(numValue);
        saveToBackend(numValue);
      }
    }
  };

  const saveToBackend = (value) => {
    fetch(`${API_URL}/progress/${barId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ percentage: value }),
    })
    .catch(err => console.error('Error saving progress:', err));
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

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
