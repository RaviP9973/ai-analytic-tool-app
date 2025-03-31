import React, { useState, useEffect } from 'react';
import { Search, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, addToHistory, setLoading, setResults, setError } from '../store/querySlice';

const getSuggestions = async (query) => {
  try {
    const response = await fetch('https://api.datamuse.com/sug?s=' + encodeURIComponent(query));
    const data = await response.json();
    return data.map(item => item.word).slice(0, 5);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

const getFinancialData = async (symbol = 'AAPL') => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=demo`);
    const data = await response.json();
    return data.historical.slice(0, 6).reverse();
  } catch (error) {
    throw new Error('Failed to fetch financial data');
  }
};

const getRandomData = (min, max, count) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const getQueryResults = async (query) => {
  try {
    let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let data;
    let title = query;

    if (query.toLowerCase().includes('revenue') || query.toLowerCase().includes('sales')) {
      data = getRandomData(100000, 500000, 6);
      title = 'Monthly Revenue Analysis';
    } else if (query.toLowerCase().includes('users') || query.toLowerCase().includes('customers')) {
      data = getRandomData(1000, 5000, 6);
      title = 'Monthly Active Users';
    } else if (query.toLowerCase().includes('stock') || query.toLowerCase().includes('price')) {
      const stockData = await getFinancialData();
      data = stockData.map(item => item.close);
      labels = stockData.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short' }));
      title = 'Stock Price Trends';
    } else {
      data = getRandomData(1000, 10000, 6);
      title = 'General Business Metrics';
    }

    // Add some analysis based on the data
    const average = data.reduce((a, b) => a + b, 0) / data.length;
    const trend = data[data.length - 1] > data[0] ? 'upward' : 'downward';
    const percentage = Math.abs(((data[data.length - 1] - data[0]) / data[0]) * 100).toFixed(1);

    return {
      labels,
      data,
      type: 'line',
      title,
      insights: [
        `Average value: ${average.toLocaleString()}`,
        `Showing a ${trend} trend with ${percentage}% change`,
        `Peak value: ${Math.max(...data).toLocaleString()}`,
        `Lowest value: ${Math.min(...data).toLocaleString()}`
      ]
    };
  } catch (error) {
    throw new Error('Failed to generate insights');
  }
};

export default function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery } = useSelector((state) => state.query);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (currentQuery.length > 2) {
        const newSuggestions = await getSuggestions(currentQuery);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [currentQuery]);

  const handleSubmit = async (query) => {
    if (!query.trim()) return;
    
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const results = await getQueryResults(query);
      dispatch(addToHistory(query));
      dispatch(setResults(results));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Ask your business question..."
          value={currentQuery}
          onChange={(e) => {
            dispatch(setCurrentQuery(e.target.value));
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
          onClick={() => handleSubmit(currentQuery)}
        >
          <Send size={20} />
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                dispatch(setCurrentQuery(suggestion));
                setShowSuggestions(false);
                handleSubmit(suggestion);
              }}
            >
              <Search size={16} className="text-gray-400" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}