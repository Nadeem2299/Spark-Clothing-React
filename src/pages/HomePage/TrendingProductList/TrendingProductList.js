// node modules import
import { useState, useEffect } from 'react';
import axios from 'axios';

// custom imports
import TrendingProduct from './TrendingProduct/TrendingProduct';

const TrendingProductList = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    // will be called after initial rendering
    // ideal place for us to call REST API calls

    axios
      .get('http://localhost:5000/products?_limit=3')
      .then((res) => {
        // if api call is successful we will get response
        setTrendingProducts(res.data);
      })
      .catch((err) => {
        // if error
        console.log(err);
        setIsError(true)
      })
      .finally(() => {});
  }, []);

  if (isError) {
    return (
      <>
        <div className="spinner-border text-success" role="status"></div>
        <p>Loading... Please try after sometime</p>
      </>
    );
  }

  return (
    <div className='mt-5'>
      <h1>Trending Products</h1>
      {/* fn used to check if the data received is empty or not  */}
      {/* map function is used to render component multiple times by passing key values and other items
        ...item is used to make array duplicate for items in array */}
      <div className="product-cards">
        {trendingProducts?.map((product) => {
          return <TrendingProduct key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

// default export
export default TrendingProductList;
