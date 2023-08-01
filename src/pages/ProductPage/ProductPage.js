import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import ProductList from './ProductList/ProductList';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);

  // for URL change using useNavigate
  const navigate = useNavigate();

  // statisfing condition with query params by getting value from useSearchParams()
  const [queryParameters] = useSearchParams();
  const category = queryParameters.get('category');

  // condition to stisfy the button click of categories and select option to change order
  const handleSortProducts = (event) => {
    // when category is all or not selected
    if (category === null && event.target.value === 'lowest') {
      navigate('/products?_sort=maxRetailPrice&_order=asc');
    } else if (category === null && event.target.value === 'highest') {
      navigate('/products?_sort=maxRetailPrice&_order=desc');
    // when category is Men
    } else if (category === 'Men' && event.target.value === 'lowest') {
      navigate('/products?category=Men&_sort=maxRetailPrice&_order=asc');
    } else if (category === 'Men' && event.target.value === 'highest') {
      navigate('/products?category=Men&_sort=maxRetailPrice&_order=desc');
    // when category is Women
    } else if (category === 'Women' && event.target.value === 'lowest') {
      navigate('/products?category=Women&_sort=maxRetailPrice&_order=asc');
    } else if (category === 'Women' && event.target.value === 'highest') {
      navigate('/products?category=Women&_sort=maxRetailPrice&_order=desc');
    // when category is Kids
    } else if (category === 'Kids' && event.target.value === 'lowest') {
      navigate('/products?category=Kids&_sort=maxRetailPrice&_order=asc');
    } else if (category === 'Kids' && event.target.value === 'highest') {
      navigate('/products?category=Kids&_sort=maxRetailPrice&_order=desc');
    }
  };

  // REST API Call for categories
  useEffect(() => {
    axios
      .get('http://localhost:5000/categories')
      .then((res) => {
        // storing data in setCategories
        setCategories(res.data);
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
    <>
      <Helmet>
        <title>Spark Clothing | Products</title>
      </Helmet>
      <div>
        <h1>Products</h1>

        {/* select option to sort order of products by price */}
        <form action="#" className='d-flex justify-content-end'>
          <label htmlFor="sort"></label>
          <select name="sort" id="sort" data-testid="sortProducts" className='form-select' style={{ width: '300px' }} onChange={handleSortProducts}>
            <option value="">Select an option</option>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
          </select>
        </form>

        <div className="row">
          <div className="col-lg-3 my-4">
            <ul className="category-list">
              {/* mapping category list  */}
              {categories?.map((category) => {
                return (
                  <button
                    key={category.id}
                    type="button"
                    className="btn btn-outline-secondary d-block py-2 my-2"
                    style={{ width: '200px' }}
                    role="button"
                    name={category.name}
                    onClick={() =>
                      // changing navigation on click of button of different category using UseNavigate
                      navigate(
                        `${
                          category.name === 'All'
                            ? '/products/'
                            : `/products?category=${category.name}`
                        }`
                      )
                    }
                  >
                    {category.name}
                  </button>
                );
              })}
            </ul>
          </div>

          <div className="col-lg-9">
            {/* ProductList component contains all the product items  */}
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
