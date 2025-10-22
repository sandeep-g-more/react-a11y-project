// tests/App.accessibility.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../src/App';

expect.extend(toHaveNoViolations);

describe('App Accessibility', () => {

  test('has no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('error message is announced to screen readers', async () => {
    render(<App />);

    // Select textarea using role + accessible name
    const textarea = screen.getByRole('textbox', {
      name: /Numbers \(comma, space, or newline separated\)/i,
    });

    const calculateBtn = screen.getByRole('button', { name: /Calculate/i });

    // Enter invalid input and calculate
    fireEvent.change(textarea, { target: { value: '1,a,2' } });
    fireEvent.click(calculateBtn);

    // Error should appear and be announced
    const alert = await screen.findByRole('alert');
    expect(alert).toBeVisible();
    expect(alert).toHaveTextContent(/Invalid/i);
  });

  test('result is displayed after valid input', async () => {
    render(<App />);

    const textarea = screen.getByRole('textbox', {
      name: /Numbers \(comma, space, or newline separated\)/i,
    });
    const calculateBtn = screen.getByRole('button', { name: /Calculate/i });

    fireEvent.change(textarea, { target: { value: '1,2,3' } });
    fireEvent.click(calculateBtn);

    const result = await screen.findByText(/Result:/i);
    expect(result).toBeVisible();
    expect(result).toHaveTextContent('6');
  });

  test('clear button resets input, result, and error', async () => {
    render(<App />);
    const textarea = screen.getByRole('textbox', {
      name: /Numbers \(comma, space, or newline separated\)/i,
    });
    const calculateBtn = screen.getByRole('button', { name: /Calculate/i });
    const clearBtn = screen.getByRole('button', { name: /Clear/i });

    fireEvent.change(textarea, { target: { value: '1,2,3' } });
    fireEvent.click(calculateBtn);

    // Verify result exists
    expect(await screen.findByText(/Result:/i)).toBeVisible();

    // Clear everything
    fireEvent.click(clearBtn);

    // Result and error should not be present
    expect(screen.queryByText(/Result:/i)).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();

    // Textarea should be empty
    expect(textarea).toHaveValue('');
  });

});
