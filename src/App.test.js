import { render, screen } from '@testing-library/react';
// import { HelmetProvider } from 'react-helmet-async';
import App from './App'

describe('App', () => {
  it('has proper App Component', () => {
    // Act (optional)
    // assert is mandatory
    expect(App).toBeTruthy();
  });
  it('has correct components with coorect content for heading', async () => {
    render(<App />);

    // verify page content for default route
    expect(screen.getByText(/Welcome to Spark Clothing/i)).toBeInTheDocument();
  });
});
