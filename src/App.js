import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Generate a random unique ID
const generateUniqueId = () => {
  return 'bar-' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};

// Get or create a unique ID for this embed instance
const getEmbedId = () => {
  // First check URL parameter (for manual IDs)
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get('id');
  if (urlId) return urlId;

  // Check localStorage for existing ID
  const localStorageKey = 'progress-bar-embed-id';
  let embedId = localStorage.getItem(localStorageKey);

  // If no ID exists, generate one and save it
  if (!embedId) {
    embedId = generateUniqueId();
    localStorage.setItem(localStorageKey, embedId);
  }

  return embedId;
};

function App() {
  const barId = getEmbedId();

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
