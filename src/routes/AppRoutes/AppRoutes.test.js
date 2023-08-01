import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

it('renders Homepage component when the path matches / route', () => {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(screen.getByText(/Welcome to Spark Clothing/i)).toBeInTheDocument();
});

it('renders Products component when the path matches products route', () => {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/products']}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(screen.getByText(/Products/i)).toBeInTheDocument();
});

it('renders About Us component when the path matches about-us route', () => {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/about-us']}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
});

it('renders Contact Us component when path matches contact-us route', async () => {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/contact-us']}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(await screen.findByText(/Contact Us/i)).toBeInTheDocument();
});

it('renders PageNotFound component when the path does not match any route', () => {
  render(
    <MemoryRouter initialEntries={['/any-invalid-url']}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
});
