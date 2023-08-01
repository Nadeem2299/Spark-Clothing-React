import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import MenuItem from './MenuItem';

// test suites
describe('MenuItem', () => {
  it('should have Home, Products, About Us and Contact Us in nav items', () => {
    render(
      <HashRouter>
        <MenuItem title="Home" to="/" />
        <MenuItem title="Products" to="/products" />
        <MenuItem title="About Us" to="//about-us" />
        <MenuItem title="Contact Us" to="/contact-us" />
      </HashRouter>
    );
    // Act
    const homeText = screen.getByText(/Home/i);
    const productsText = screen.getByText(/Products/i);
    const aboutUsText = screen.getByText(/About Us/i);
    const contactUsText = screen.getByText(/Contact Us/i);

    // Assert
    expect(homeText).toHaveTextContent('Home');
    expect(productsText).toHaveTextContent('Products');
    expect(aboutUsText).toHaveTextContent('About Us');
    expect(contactUsText).toHaveTextContent('Contact Us');
  });
});
