import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';

import ProductDetailPage from './ProductDetailPage';

// setting up mock for axios
// mocking a module will be called when needed

jest.mock('axios');
const axiosMocked = {
  get: jest.fn()
};
export default axiosMocked;

// Test Suite
describe('ProductDetailPage', () => {
  beforeEach(() => {
    const mockResponse = {
      data: {
        id: 1,
        name: 'Peter Parker',
        email: 'p@p.com',
        imageUrl: '/assets/images/men-black-tshirt.webp',
        category: 'Men'
      }
    };
    // steps to do mocking ---
    // Resolve the http request with the above mock response
    // setup mocks for axios (see before describe block)
    // resolve the req
    axios.get.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // product detail feact via mocking data
  it('[MOCKING]: fetches current Product details via rest api call', async () => {
    // Render the comp
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    // 4. Assert
    const nameElement = await screen.findByText('Peter Parker');
    expect(nameElement).toBeInTheDocument();
  });

  // testing for counter default value
  it('has counter with default value 0', () => {
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    const counterValue = screen.getByTestId('counterValue');
    expect(counterValue.textContent).toBe('0');
  });

  // testing for counter value to be minimum 0
  it('has properly working decrement button', () => {
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    const counterValue = screen.getByTestId('counterValue');

    // finding decrement button
    const decrementBtn = screen.getByTestId('decrementBtn');

    // trigger the click event on decrementBtn
    for (let i = 0; i < 5; i++) {
      fireEvent.click(decrementBtn);
    }

    fireEvent.click(decrementBtn);
    expect(counterValue.textContent).toBe('0');
  });

  it('has properly working increment button', () => {
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    const counterValue = screen.getByTestId('counterValue');

    // finding decrement button
    const incrementBtn = screen.getByTestId('incrementBtn');

    // trigger the click event on decrementBtn
    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementBtn);
    }

    fireEvent.click(incrementBtn);
    expect(counterValue.textContent).toBe('5');
  });

  // add to cart text to be change on click
  it('has proper add to cart text', () => {
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    const addToCart = screen.getByTestId('addToCart');
    expect(addToCart.textContent).toBe('Add To Cart');
    fireEvent.click(addToCart);
    expect(addToCart.textContent).toBe('Remove From Cart');
  });

  // testing for reviewItems via mocking
  it('[Mocking] renders product reviewItems', async () => {
    // Mock the response from the API
    const mockResponseReviews = {
      data: {
        reviews: [
          {
            name: 'Bobby Firminio',
            email: 'b@fexample.com'
          }
        ]
      }
    }; // Set up the mock for axios.get

    axios.get.mockResolvedValue(mockResponseReviews); // Render the component

    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    ); // Wait for the API call to resolve (since it's in useEffect)

    await screen.findByText('Name: Bobby Firminio');

    // Assertions
    expect(screen.getByText('Name: Bobby Firminio')).toBeInTheDocument();
    expect(screen.getByText('Email: b@fexample.com')).toBeInTheDocument();
  });

  // testing for error message when data doesent loads from REST API
  it('[MOCKING]: renders error properly when REST API returns error', async () => {
    // prepare mock error response
    const error = 'Error occurred';

    // steps of mocking
    // Reject the http request with the above mock error response
    // setup mocks for axios (see before describe block)
    // reject the req

    axios.get.mockRejectedValue(error);

    // Rendering the comp
    render(
      <HashRouter>
        <ProductDetailPage />
      </HashRouter>
    );
    // Wait for the API call to resolve (since it's in useEffect)
    // Assert
    const errorElement = await screen.findByText(
      'Invalid Product Make Sure you have entered correct URL'
    );
    expect(errorElement).toBeInTheDocument();
  });
});
