// src/App.tsx
import { useState, useRef, useEffect } from 'react';
import { stringCalculator } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const value = stringCalculator(input);
      setResult(value);
    } catch (e: any) {
      setResult(null);
      setError(e?.message || 'Invalid input');
    }
  };

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    } else if (result !== null && resultRef.current) {
      resultRef.current.focus();
    }
  }, [result, error]);

  return (
    <div style={{ padding: 20, backgroundColor: '#ffffff', color: '#222' }}>
      <header>
        <h1 style={{ fontSize: 24, margin: 0 }}>String Calculator</h1>
        <p style={{ marginTop: 6 }}>
          Enter numbers separated by commas, spaces, or new lines.
        </p>
      </header>

      <main>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0"
            width={600}
            height={400}
            alt=""
            role="presentation"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <figcaption style={{ fontSize: 12, color: '#555' }}>
            Decorative illustration
          </figcaption>
        </figure>

        <section aria-labelledby="input-heading" style={{ marginTop: 16 }}>
          <h2 id="input-heading" style={{ fontSize: 18, marginBottom: 8 }}>
            Enter numbers
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCalculate();
            }}
          >
            <label htmlFor="numbers" style={{ display: 'block', marginBottom: 6 }}>
              Numbers (comma, space, or newline separated):
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
                type="submit"
                disabled={!input.trim()}
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#005f8a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: !input.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setResult(null);
                  setError(null);
                }}
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#ccc',
                  color: '#000',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section style={{ marginTop: 16 }}>
          <div aria-live="polite">
            {error && (
              <div
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                style={{ color: 'red', marginTop: 8 }}
              >
                {error}
              </div>
            )}

            {result !== null && (
              <div
                ref={resultRef}
                tabIndex={-1}
                style={{ marginTop: 8 }}
              >
                Result: {result}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer style={{ marginTop: 24, fontSize: 12, color: '#555' }}>
        <p>Make sure you enter numbers correctly.</p>
      </footer>

      <style>
        {`
          button:focus,
          textarea:focus {
            outline: 2px solid #005f8a;
            outline-offset: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default App;
