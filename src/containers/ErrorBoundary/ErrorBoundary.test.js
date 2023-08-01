import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';

describe('Error Boundary', () => {
  // checking if page have any error Error Bondary must throw error
  it('has any error (if any) Error Bondary will throw error', () => {
    const ThrowError = () => {
      throw new Error('test');
    };
    render(
      <HashRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </HashRouter>
    );
    expect(screen.getByTestId('errorBoundary')).toBeVisible();
  });
});
