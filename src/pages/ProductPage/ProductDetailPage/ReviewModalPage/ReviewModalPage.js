import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import axios from 'axios';

import './ReviewModalPage.css';

const ReviewModalPage = ({ handleClose, currentProduct }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  // making form using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const id = currentProduct.id;
  const dupReviews = [...currentProduct.reviews];

  // handling submit button by storing data in API using axios patch method
  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log('Submitted');
    data.id = Math.floor(1000 + Math.random() * 9000);
    dupReviews.push(data);
    axios
      .patch(`http://localhost:5000/products/${id}`, {
        reviews: dupReviews
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        console.log('It is over!');
      });
  };

  return (
    // using a custom popup and handling open and close using useState and paasing value as prop
    <div className="modal-popup-box">
      <div className="modal-box">
        <span className="modal-close-icon" onClick={handleClose}>
          X
        </span>
        {/* form starts  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="w-100"
              id="exampleInputName"
              {...register('name', {
                required: true,
                maxLength: 80
              })}
            />
          </div>
          {/* handling error */}
          {errors.name && errors.name.type === 'required' && (
            <span role="alert" className="alert alert-danger d-block">
              Please enter Name
            </span>
          )}

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="w-100"
              id="exampleInputEmail1"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i
              })}
            />
          </div>
          {/* handling error */}
          {errors.email && errors.email.type === 'required' && (
            <span role="alert" className="alert alert-danger d-block">
              Please enter Email
            </span>
          )}

          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="w-100"
              id="exampleInputPhone"
              {...register('phone', {
                required: true,
                minLength: 6,
                maxLength: 12
              })}
            />
          </div>
          {/* handling error */}
          {errors.phone && errors.phone.type === 'required' && (
            <span role="alert" className="alert alert-danger d-block">
              Please enter phone no.
            </span>
          )}

          <div className="mb-3 w-25">
            <label htmlFor="exampleInputPhone" className="form-label">
              Ratings
            </label>
            <select
              className="form-select"
              {...register('rating', {
                required: true
              })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputQuery" className="form-label">
              Comment
            </label>
            <textarea
              className="form-control"
              id="exampleInputQuery"
              placeholder="Add your comments"
              {...register('comment', { required: true })}
            />
          </div>
          {/* handling error */}
          {errors.comment && errors.comment.type === 'required' && (
            <span role="alert" className="alert alert-danger d-block">
              Please enter comments
            </span>
          )}

          {/* handling other errors for leangth  */}
          {errors.name && errors.name.type === 'maxLength' && (
            <span className="alert alert-danger">Max length exceeded</span>
          )}

          {errors.phone &&
            errors.phone.type === 'maxLength' &&
            errors.phone.type === 'minLength' && (
            <span className="alert alert-danger">phone number invalid</span>
          )}
          {/* submit button  */}
          <input
            type="submit"
            data-testid="submitButton"
            className="btn btn-primary mb-2"
          ></input>
          {isSubmitted && (
            <div role="alert" className="alert alert-success">
              Thanks, For the feedback. Form Submiited Successfully!
            </div>
          )}
          {isError && (
            <div role="alert" className="alert alert-danger">
              Sorry Data is not submitted. Please try again!
            </div>
          )}
        </form>
        {/* form ends  */}

        {/* form closing button  */}
        <button className="btn btn-primary mt-3" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// props typechecking in React using PropTypes
ReviewModalPage.propTypes = {
  handleClose: PropTypes.func,
  currentProduct: PropTypes.object
};

// default export
export default ReviewModalPage;
