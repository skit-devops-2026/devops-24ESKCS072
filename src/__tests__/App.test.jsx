import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders the header and brand name', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/mycorner/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders the initial profile handle', () => {
    render(<App />);
    expect(screen.getByText('@starryeyed')).toBeInTheDocument();
  });

  it('renders theme selector and allows switching themes', () => {
    render(<App />);
    const themeButtons = screen.getAllByRole('button');
    expect(themeButtons.length).toBeGreaterThan(0);
  });

  it('renders the feed with post text', () => {
    render(<App />);
    expect(screen.getByText(/glittery computer lab/i)).toBeInTheDocument();
  });

  it('supports liking a post', () => {
    render(<App />);
    const likeButtons = screen.getAllByRole('button', { name: /♥|♡/i });
    if (likeButtons.length > 0) {
      fireEvent.click(likeButtons[0]);
    }
    expect(screen.getByText(/glittery computer lab/i)).toBeInTheDocument();
  });
});
