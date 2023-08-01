import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import ProductItem from './ProductItem/ProductItem';

const ProductList = () => {
  const [productItems, setProductItems] = useState([]);
  const [isError, setIsError] = useState(false);
  const [queryParameters] = useSearchParams();
  const queryParams = queryParameters.toString();
  const apiUrl = queryParams === null ? '/' : '?' + queryParams;

  // REST API call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${apiUrl}`)
      .then((res) => {
        // if api call is successful we will get response and storing data in setProducts
        setProductItems(res.data);
      })
      .catch((err) => {
        // if error
        console.log(err);
        setIsError(true)
      })
      .finally(() => {});
  }, [apiUrl]);

  // if there is no Products

  if (isError) {
    return (
      <>
        <div className="spinner-border text-success" role="status"></div>
        <p>Loading... Please try after sometime</p>
      </>
    );
  }

  return (
    <>
      <div className="product-cards">
        {/* mapping products */}
        {productItems?.map((product) => {
          return <ProductItem key={product.id} {...product} />;
        })}
      </div>
    </>
  );
};

export default ProductList;
