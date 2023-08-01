import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  // testing image with alt text
  it('alt attribute contains correct value', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const testImage = document.querySelector('img');
    expect(testImage.alt).toContain('Spark shopping app logo');
  });

  // testing home text in header
  it('has Home text', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const homeText = screen.getByText(/Home/i);
    expect(homeText).toBeInTheDocument();
  });

  // testing products text in header
  it('has Products text', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const productsText = screen.getByText(/Products/i);
    expect(productsText).toBeInTheDocument();
  });

  // testing About Us text in header
  it('has About Us text', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const aboutUsText = screen.getByText(/About Us/i);
    expect(aboutUsText).toBeInTheDocument();
  });

  // testing Contact Us text in header
  it('has Contact Us text', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const contactUsText = screen.getByText(/Contact Us/i);
    expect(contactUsText).toBeInTheDocument();
  });
});
