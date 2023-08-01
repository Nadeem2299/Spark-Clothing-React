import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';

// TEST SUITE
describe('AboutUs', () => {
  // checking if About Us tag line is present or not
  it('has About Us text data for tag line and headings', () => {
    render(
      <HelmetProvider>
        <HashRouter>
          <AboutUsPage />
        </HashRouter>
      </HelmetProvider>
    );

    const aboutUsTagLine = screen.getByTestId('aboutUsTagLine');
    expect(aboutUsTagLine.textContent).toBe(
      '“We have the capabilities and experience to deliver the products you need to move forward.”'
    );

    const historyHeading = screen.getByTestId('historyHeading');
    expect(historyHeading.textContent).toBe('See History About Spark Shopping');
  });

  // testing inline styles
  it('has proper styles for button', () => {
    render(
      <HelmetProvider>
        <HashRouter>
          <AboutUsPage />
        </HashRouter>
      </HelmetProvider>
    );

    const historyBtn = screen.getByTestId('historyBtn');

    expect(historyBtn).toHaveStyle('color: #FCD200');
    expect(historyBtn).toHaveStyle('fontSize: 20px');
    expect(historyBtn).toHaveStyle('border: 1px solid #FCD200');
    expect(historyBtn).toHaveStyle('padding: 10px');
    expect(historyBtn).toHaveStyle('backgroundColor: red');
  });
});
