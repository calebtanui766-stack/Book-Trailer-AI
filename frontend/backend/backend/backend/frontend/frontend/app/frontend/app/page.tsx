'use client';
import { useState } from 'react';

export default function Home() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const generateVideo = async () => {
    setLoading(true);
    setMessage('Starting video generation...');
    
    try {
      const response = await fetch('https://your-backend-url.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asin, user_id: 'test-user' })
      });
      
      const data = await response.json();
      setMessage(`Task started! ID: ${data.task_id}`);
    } catch (error) {
      setMessage('Error: Backend not connected yet');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f3f4f6'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📚 BookTrail AI</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Generate professional book trailers from Amazon ASINs
        </p>
        
        <input
          type="text"
          placeholder="Enter ASIN (e.g., B08N5WRWNW)"
          value={asin}
          onChange={(e) => setAsin(e.target.value.toUpperCase())}
          style={{
            width: '300px',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '15px'
          }}
        />
        <br />
        
        <button
          onClick={generateVideo}
          disabled={loading}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            background: loading ? '#999' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Generating...' : 'Generate Trailer'}
        </button>
        
        {message && (
          <p style={{ marginTop: '20px', color: '#666' }}>{message}</p>
        )}
      </div>
    </div>
  );
}
