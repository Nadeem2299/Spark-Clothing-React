import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Header from './Header';

// tests suites
describe('Header', () => {
  // testing image with alt text
  it('alt contains correct value', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const testImage = document.querySelector('img');
    expect(testImage.alt).toContain('Spark clothing app logo');
  });

  // testing Spark Shopping text in header
  it('has Spark Shopping text', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const homeText = screen.getByText(/Spark Clothing/i);
    expect(homeText).toBeInTheDocument();
  });

  // testing home text in header
  it('has Home text', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const homeText = screen.getByText(/Home/i);
    expect(homeText).toBeInTheDocument();
  });

  // testing products text in header
  it('has Products text', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const productsText = screen.getByText(/Products/i);
    expect(productsText).toBeInTheDocument();
  });

  // testing About Us text in header
  it('has About Us text', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const aboutUsText = screen.getByText(/About Us/i);
    expect(aboutUsText).toBeInTheDocument();
  });

  // testing Contact Us text in header
  it('has Contact Us text', () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const contactUsText = screen.getByText(/Contact Us/i);
    expect(contactUsText).toBeInTheDocument();
  });
});
