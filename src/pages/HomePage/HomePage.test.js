import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';

import HomePage from './HomePage';

describe('HomPage', () => {
  // writing the tests / test cases / test specs
  it('has Home text', () => {
    render(
      <HashRouter>
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </HashRouter>
    );
    const sparkClothing = screen.getByTestId('sparkClothing');
    expect(sparkClothing).toBeInTheDocument();
  });
});
