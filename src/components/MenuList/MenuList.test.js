import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import MenuList from './MenuList';

// testing the length of the navbar
it('has NavbarList component should render 4 NavLinks', () => {
  render(
    <HelmetProvider>
      <HashRouter>
        <MenuList />
      </HashRouter>
    </HelmetProvider>
  );
  // Act
  const NavbarList = screen.getByTestId('NavbarList');
  const links = NavbarList.querySelectorAll('li');
  // Assert
  expect(links.length).toBe(4);
});
