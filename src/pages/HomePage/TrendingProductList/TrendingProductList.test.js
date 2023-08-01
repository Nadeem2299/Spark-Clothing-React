import { render, screen } from '@testing-library/react';
import TrendingProductList from './TrendingProductList';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';

// setting up mock for axios
// mocking a module with automocked version when needed

jest.mock('axios');

// Test Suite
// the following is NOT RECCOMENDED-- This is know as anti-pattern
describe('TrendingProductList', () => {
  // Positive Test Spec == Mocking succesfull response

  it('[MOCKING]: fetches Trending Products via rest api call', async () => {
    // prepare mock response
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'Men Black Cotton T-shirt',
          description: 'Black solid T-shirt, has a round neck, short sleeves'
        },
        {
          id: 2,
          name: 'SINGNI Women Purple Kurtas',
          description:
            'Women Purple Ethnic Motifs Embroidered Mirror Work Kurta with Trousers & Dupatta'
        }
      ]
    };
    // Resolve the http request with the above mock response
    // setup mocks for axios (see before describe block)
    // resolve the req
    axios.get.mockResolvedValue(mockResponse);

    // Render the comp
    render(
      <HashRouter>
        <TrendingProductList />
      </HashRouter>
    );
    // 4. Assert
    const nameElement = await screen.findByText('Men Black Cotton T-shirt');
    expect(nameElement).toBeInTheDocument();
  });

  // Negative Test Spec == Mocking unsuccesful response
  it('[MOCKING]: renders error properly when REST API returns error', async () => {
    // prepare mock error response
    const error = 'Error occurred';
    // Reject the http request with the above mock error response
    // setup mocks for axios (see before describe block)
    // reject the req
    axios.get.mockRejectedValue(error);
    // Render the comp
    render(
      <HashRouter>
        <TrendingProductList />
      </HashRouter>
    );
    // Assert
    const errorElement = await screen.findByText('Loading... Please try after sometime');
    expect(errorElement).toBeInTheDocument();
  });
});
