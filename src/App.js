import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { useState, useRef, useEffect } from 'react';
import { stringCalculator } from './stringCalculator';
const App = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const resultRef = useRef(null);
    const errorRef = useRef(null);
    const handleCalculate = () => {
        try {
            setError(null);
            const value = stringCalculator(input);
            setResult(value);
        }
        catch (e) {
            setResult(null);
            setError(e?.message || 'Invalid input');
        }
    };
    // Focus on result or error when updated
    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.focus();
        }
        else if (result !== null && resultRef.current) {
            resultRef.current.focus();
        }
    }, [result, error]);
    return (_jsxs("div", { style: { padding: 20, backgroundColor: '#ffffff', color: '#222' }, children: [_jsxs("header", { children: [_jsx("h1", { style: { fontSize: 24, margin: 0 }, children: "String Calculator" }), _jsx("p", { style: { marginTop: 6 }, children: "Enter numbers separated by commas, spaces, or new lines." })] }), _jsxs("main", { children: [_jsxs("figure", { children: [_jsx("img", { src: "https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0", width: 600, height: 400, alt: "Abstract colored shapes", style: { maxWidth: '100%', height: 'auto' } }), _jsx("figcaption", { style: { fontSize: 12, color: '#555' }, children: "Decorative illustration" })] }), _jsxs("section", { "aria-labelledby": "input-heading", style: { marginTop: 16 }, children: [_jsx("h2", { id: "input-heading", style: { fontSize: 18, marginBottom: 8 }, children: "Enter numbers" }), _jsx("label", { htmlFor: "numbers", style: { display: 'block', marginBottom: 6 }, children: "Numbers (comma, space, or newline separated):" }), _jsx("textarea", { id: "numbers", rows: 6, placeholder: "e.g. 1,2,3 or 1\\n2\\n3", value: input, onChange: (e) => setInput(e.target.value), style: {
                                    width: '100%',
                                    marginBottom: 12,
                                    padding: 8,
                                    borderRadius: 4,
                                    border: '1px solid #ccc',
                                    color: '#111',
                                    background: '#fff',
                                } }), _jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("button", { type: "button", onClick: handleCalculate, disabled: !input.trim(), "aria-disabled": !input.trim(), style: {
                                            padding: '10px 14px',
                                            backgroundColor: '#005f8a',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: !input.trim() ? 'not-allowed' : 'pointer',
                                        }, children: "Calculate" }), _jsx("button", { type: "button", onClick: () => { setInput(''); setResult(null); setError(null); }, style: {
                                            padding: '10px 14px',
                                            backgroundColor: '#e0e0e0',
                                            color: '#111',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer',
                                        }, children: "Clear" })] })] }), _jsxs("section", { "aria-live": "polite", style: { marginTop: 16 }, children: [error && _jsx("div", { role: "alert", style: { color: 'red' }, children: error }), result !== null && (_jsxs("div", { children: ["Result: ", result] }))] })] }), _jsx("footer", { style: { marginTop: 24, fontSize: 12, color: '#666' }, children: _jsx("p", { children: "Make sure you enter numbers correctly." }) })] }));
};
export default App;
