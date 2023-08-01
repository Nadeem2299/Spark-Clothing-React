// node modules import
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// object destucturing method for calling props to child component
const TrendingProduct = ({ imageUrl, name, id, maxRetailPrice, quantity, discountApplicable }) => {
  return (
    <Link to={`/products/${id}`} className="product-card">
      {/* rendering data in UI by collecting values from REST API and passing it through props from AllProduct page */}
      <div className="product-card">
        <div className="card shadow-sm">
          <img src={imageUrl} alt={name} />
          <div className="card-body">
            <p className="card-text">{name}</p>
            {/* clcuclating discountedPrice */}
            <p data-testid="discountedPrice" className="card-text fw-bold">₹ {maxRetailPrice - (maxRetailPrice * discountApplicable) / 100}/- Only</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group"></div>
              <small data-testid="productQuantity" className="text-danger fw-bold">
                {quantity} left Hurry Up!
              </small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// props typechecking in React using PropTypes
TrendingProduct.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  quantity: PropTypes.number,
  id: PropTypes.number,
  maxRetailPrice: PropTypes.number,
  discountApplicable: PropTypes.number
};

// default export
export default TrendingProduct;
