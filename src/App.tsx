// src/App.tsx
import { useState } from 'react';

import calculateFromString from './stringCalculator';
const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleCalculate = () => {
    try {
      setError(null);
      const value = calculateFromString(input);
      setResult(value);
    } catch (e: any) {
      setResult(null);
      setError(e?.message || 'Invalid input');
    }
  };


  return (
    <div style={{ padding: 20, backgroundColor: '#ffffff', color: '#222' }}>
      <header>
        <h1 style={{ fontSize: 24, margin: 0 }}>String Calculator</h1>
        <p style={{ marginTop: 6 }}>Enter numbers separated by commas (or new lines).</p>
      </header>

      <main>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0"
            width={600}
            height={400}
            alt="Abstract colored shapes" // meaningful alt (or alt="" if decorative)
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <figcaption style={{ fontSize: 12, color: '#555' }}>
            Example image (decorative).
          </figcaption>
        </figure>

        <section aria-labelledby="input-heading" style={{ marginTop: 16 }}>
          <h2 id="input-heading" style={{ fontSize: 18, marginBottom: 8 }}>Enter numbers</h2>

          <label htmlFor="numbers" style={{ display: 'block', marginBottom: 6 }}>
            Numbers (comma or newline separated):
          </label>
          <textarea
            id="numbers"
            rows={6}
            placeholder="e.g. 1,2,3 or 1\n2\n3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              marginBottom: 12,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              color: '#111',
              background: '#fff',
            }}
          />

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleCalculate}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCalculate(); }}
              style={{
                padding: '10px 14px',
                backgroundColor: '#005f8a',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Calculate
            </button>

            <button
              type="button"
              onClick={() => { setInput(''); setResult(null); setError(null); }}
              style={{
                padding: '10px 14px',
                backgroundColor: '#e0e0e0',
                color: '#111',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </section>

        <section aria-live="polite" style={{ marginTop: 16 }}>
          {error && (
            <div role="alert" style={{ color: '#b00020' }}>
              {error}
            </div>
          )}

          {result !== null && !error && (
            <div aria-atomic="true" style={{ color: '#0b6623' }}>
              <strong>Result:</strong> {result}
            </div>
          )}

          {result === null && !error && (
            <p style={{ color: '#666' }}>No result yet.</p>
          )}
        </section>
      </main>

      <footer style={{ marginTop: 24, fontSize: 12, color: '#666' }}>
        <p>Make sure you enter numbers correctly.</p>
      </footer>
    </div>
  );
};

export default App;
