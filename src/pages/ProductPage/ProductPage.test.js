import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import {
  HashRouter,
  MemoryRouter,
  useNavigate,
  useSearchParams
} from 'react-router-dom';

import ProductPage from './ProductPage';

jest.mock('axios');
// mocking react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}));

// sample data for mocking with name and id for getting params
const sampleCategories = [
  { id: 1, name: 'Men' },
  { id: 2, name: 'Women' },
  { id: 3, name: 'Kids' }
];

// test suites
describe('ProductPage', () => {
  let mockNavigate;
  let mockSearchParams;

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: sampleCategories });
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    mockSearchParams = new URLSearchParams();
    useSearchParams.mockReturnValue([mockSearchParams]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // mocking with mockResponse data
  it('[MOCKING]: fetches category list via rest api call', async () => {
    //  preparing mock response
    const mockResponse = {
      data: [
        {
          id: 101,
          name: 'All'
        },
        {
          id: 102,
          name: 'Men'
        },
        {
          id: 103,
          name: 'Women'
        },
        {
          id: 103,
          name: 'Kids'
        }
      ]
    };

    // Resolve the http request with the above mock response
    // setup mocks for axios (see before describe block)
    // resolve the req
    axios.get.mockResolvedValue(mockResponse);

    // Render the comp
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductPage />
        </HashRouter>
      </HelmetProvider>
    );

    //  Assert
    const nameElement = await screen.findAllByText('All');
    const menElement = await screen.findAllByText('Men');
    const womenElement = await screen.findAllByText('Women');
    const kidsElement = await screen.findAllByText('Kids');
    expect(menElement[0]).toBeInTheDocument();
    expect(nameElement[0]).toBeInTheDocument();
    expect(womenElement[0]).toBeInTheDocument();
    expect(kidsElement[0]).toBeInTheDocument();
  });

  // checking the navigation of the page with default or All category and sort type lowest and highest
  it('handles sorting products with default or All category', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'lowest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?_sort=maxRetailPrice&_order=asc'
      );
    });

    fireEvent.change(sortingDropdown, { target: { value: 'highest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?_sort=maxRetailPrice&_order=desc'
      );
    });
  });

  // checking the navigation of the page with Men category and sort type lowest
  it('handles sorting products for category "Men", lowest', async () => {
    mockSearchParams.set('category', 'Men');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'lowest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Men&_sort=maxRetailPrice&_order=asc'
      );
    });
  });

  // checking the navigation of the page with Men category and sort type highest
  it('handles sorting products for category "Men", highest', async () => {
    mockSearchParams.set('category', 'Men');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'highest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Men&_sort=maxRetailPrice&_order=desc'
      );
    });
  });

  // checking the navigation of the page with Women category and sort type highest
  it('handles sorting products for category "Women", highest', async () => {
    mockSearchParams.set('category', 'Women');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'highest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Women&_sort=maxRetailPrice&_order=desc'
      );
    });
  });

  // checking the navigation of the page with Women category and sort type lowest
  it('handles sorting products for category "Women", lowest', async () => {
    mockSearchParams.set('category', 'Women');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'lowest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Women&_sort=maxRetailPrice&_order=asc'
      );
    });
  });

  // checking the navigation of the page with Kids category and sort type lowest
  it('handles sorting products for category "kids", lowest', async () => {
    mockSearchParams.set('category', 'Kids');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'lowest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Kids&_sort=maxRetailPrice&_order=asc'
      );
    });
  });

  // checking the navigation of the page with Women category and sort type highest
  it('handles sorting products for category "kids", highest', async () => {
    mockSearchParams.set('category', 'Kids');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const sortingDropdown = screen.getByTestId('sortProducts');

    fireEvent.change(sortingDropdown, { target: { value: 'highest' } });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/products?category=Kids&_sort=maxRetailPrice&_order=desc'
      );
    });
  });

  it('[MOCKING]: renders error properly when REST API returns error', async () => {
    // prepare mock error response
    const error = 'Error occurred';
    // Reject the http request with the above mock error response
    // setup mocks for axios (see before describe block)
    // reject the req
    axios.get.mockRejectedValue(error);
    // Render the comp
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    // Assert
    const errorElement = await screen.findByText('Loading... Please try after sometime');
    expect(errorElement).toBeInTheDocument();
  });
});
