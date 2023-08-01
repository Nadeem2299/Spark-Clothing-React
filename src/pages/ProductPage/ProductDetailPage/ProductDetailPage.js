import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import ReviewModalPage from './ReviewModalPage/ReviewModalPage';

const ProductDetailPage = () => {
  // storing param id
  const { id } = useParams();
  const [currentProduct, setcurrentProduct] = useState({});
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isError, setIsError] = useState(false);
  // boolean value for opening and closing of Modal
  const [isOpen, setIsOpen] = useState(false);
  const [ticker, setTicker] = useState(0);

  // incrementing ticker upto products quantity
  const handleIncrement = () => {
    if (ticker < 5) {
      setTicker(ticker + 1);
    }
  };

  // decrementing ticker but not less than 0
  const handleDecrement = () => {
    if (ticker > 0) {
      setTicker(ticker - 1);
    }
  };

  // handling popup open and close
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // REST API Call in useEffect hook so that component will re-render as soon as isOpen dependency will change
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        // storing data in currentProduct
        setcurrentProduct(res.data);
      })
      .catch((err) => {
        // if error
        console.log(err);
        setIsError(true);
      })
      .finally(() => {});
  }, [isOpen]);

  // creating empty array and storing array value of reviews in products data
  const reviewItems = [];
  for (let i = 0; i < currentProduct.reviews?.length; i++) {
    reviewItems.push(currentProduct.reviews[i]);
  }

  // checking condition if data recieved is empty or not
  if (isError) {
    return (
      <div className="alert alert-danger">
        Invalid Product Make Sure you have entered correct URL
      </div>
    );
  }

  return (
    <article className="container">
      <Link to="/products" className="btn btn-primary">
        Back to Products Page
      </Link>
      {/* rendering recieved values from API in UI  */}
      <div className="row mt-5">
        <div className="col-lg-5">
          <img
            src={currentProduct.thumbnailUrl}
            alt={currentProduct.name}
            className="w-100"
          />
        </div>

        <div className="col-lg-7">
          <h1>{currentProduct.name}</h1>
          <p>{currentProduct.description}</p>
          <h3 className="fw-bold text-warning">
            Orignal Price ₹{currentProduct.maxRetailPrice}/-
          </h3>
          <h5 className="fw-bold text-secondary">
            Get Upto {currentProduct.discountApplicable}% OFF
          </h5>
          {/* value after discount  */}
          <h3 className="fw-bold text-success">
            Buy Now for only ₹{' '}
            {currentProduct.maxRetailPrice -
              (currentProduct.maxRetailPrice *
                currentProduct.discountApplicable) /
                100}
            /-
          </h3>
          <p className="text-secondary">
            {currentProduct.quantity} Items Found
          </p>
          <button
            className={`btn btn-sm btn-${isAddToCart ? 'danger' : 'success'}`}
            type="button"
            data-testid="addToCart"
            onClick={() => setIsAddToCart(!isAddToCart)}
          >
            {isAddToCart ? 'Remove From' : 'Add To'} Cart
          </button>
          <p className="mb-2 mt-2 fw-bold">Add items (Upto 5 at a time)</p>
          <div className="d-flex">
            <button
              type="button"
              data-testid="decrementBtn"
              onClick={handleDecrement}
              className="btn btn-danger fw-bold"
            >
              -
            </button>
            <h3 data-testid="counterValue" className="mx-2 mt-2">
              {ticker}
            </h3>
            <button
              type="button"
              data-testid="incrementBtn"
              onClick={handleIncrement}
              className="btn btn-success fw-bold"
            >
              +
            </button>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <p className="fw-bold">
              Total Reviews: {currentProduct.reviews?.length}
            </p>
            <button
              type="button"
              data-testid="writeReviewBtn"
              onClick={togglePopup}
              className="btn btn-primary"
            >
              Write a review
            </button>
          </div>

          <h3 className="mt-3">Reviews</h3>
          {/* mapping reviews which were recieved and stored in reviewLists array */}
          {reviewItems?.map((review, index) => {
            return (
              <div
                style={{
                  borderRadius: '20px',
                  padding: '10px',
                  backgroundColor: '#C4DFDF'
                }}
                className="mb-3"
                key={index}
              >
                <p className="pt-0 mb-0 fw-bold">
                  Name: {review.name}
                  <span className="px-5">Email: {review.email}</span>
                </p>
                <p className="mt-1 mb-1">
                  <b>Mobile No. : </b> {review.phone}
                </p>
                <p className="mt-1 mb-1">
                  <b>Ratings:</b> {review.rating}
                </p>
                <p className="mt-1">
                  <b>Comments:</b> {review.comment}
                </p>
              </div>
            );
          })}

          {/* ReviewModalPage component contains review modal popup data */}
          {isOpen && (
            <ReviewModalPage
              currentProduct={currentProduct}
              handleClose={togglePopup}
            />
          )}
        </div>
      </div>
      <br />
    </article>
  );
};

export default ProductDetailPage;
