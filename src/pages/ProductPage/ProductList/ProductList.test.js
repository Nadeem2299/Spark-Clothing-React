import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';

import AllProducts from './ProductList';

// setting up mock for axios
// mocking a module with automocked version when needed

jest.mock('axios');

// Test Suite

describe('ProductList', () => {
  // Positive Test Spec == Mocking succesfull response
  it('[MOCKING]: fetches productList via rest api call', async () => {
    // 1. prepare mock response
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
          description: 'Women Purple Ethnic Motifs Embroidered Mirror Work Kurta with Trousers & Dupatta'
        }
      ]
    };

    axios.get.mockResolvedValue(mockResponse);

    render(
      <HashRouter>
        <AllProducts />
      </HashRouter>
    );
    // 4. Assert
    const nameElement = await screen.findByText('Men Black Cotton T-shirt');
    expect(nameElement).toBeInTheDocument();
  });

  // Negative Test Spec == Mocking unsuccesful response
  it('[MOCKING]: renders error properly when REST API returns error', async () => {
    const error = 'Error occurred';

    axios.get.mockRejectedValue(error);

    render(
      <HashRouter>
        <AllProducts />
      </HashRouter>
    );
    // 4. Assert
    const errorElement = await screen.findByText(
      'Loading... Please try after sometime'
    );
    expect(errorElement).toBeInTheDocument();
  });
});
