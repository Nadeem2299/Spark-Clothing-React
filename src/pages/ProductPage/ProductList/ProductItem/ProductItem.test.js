import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import ProductItem from './ProductItem';

// Testing props and the content in page rendering through props
it('receives proper props for products and displays in JSX', () => {
  // rendering component with props
  render(
    <HashRouter>
      <ProductItem
        id={1}
        imageUrl="/image"
        name="Black t-shirt"
        quantity= {30}
        maxRetailPrice = {3000}
        discountApplicable = {10}
      />
    </HashRouter>
  );

  const testImage = document.querySelector('img');
  expect(testImage.alt).toContain('Black t-shirt');

  const discountedPrice = screen.getByTestId('discountedPrice');
  expect(discountedPrice).toHaveTextContent('₹ 2700/- Only');

  const productQuantity = screen.getByTestId('productQuantity');
  expect(productQuantity).toHaveTextContent(
    '30 left Hurry Up!'
  );
});
