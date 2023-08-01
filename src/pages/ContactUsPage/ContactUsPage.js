import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaHome, FaPhone, FaMailBulk } from 'react-icons/fa';

const ContactUsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/contactData')
      .then((res) => {
        // putting data in ContactData
        setContacts(res.data);
      })
      .catch((err) => {
        // if error
        console.log(err);
      })
      .finally(() => {});
  }, []);

  // making form using react hook form

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // handling submit button by storing data in API using axios post method
  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log('Submitted');
    axios
      .post('http://localhost:5000/getInTouchData', data)
      .then((res) => {
        console.log(res);
        console.log(data);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true)
      })
      .finally(() => {
        console.log('It is over!');
      });
  };

  return (
    <>
      <Helmet>
        <title>Spark Clothing | Contact Us</title>
      </Helmet>
      <h1>Contact Us</h1>
      <div className="row mt-5">
        <div className="col-md-6">
          <p>
            Spark has a visually appealing and simple form, so you can get the
            answers to any questions you may have and mention their FAQ page to
            find further information on your own.
          </p>

          {contacts?.map((contact, index) => {
            return (
              <div key={index} className="mt-5">
                <p className="fw-bold">
                  <FaHome /> {contact.address}
                </p>
                <p className="fw-bold">
                  <FaPhone /> {contact.phone[0]}
                  <span className="fw-bold">, {contact.phone[1]}</span>
                </p>
                <p className="fw-bold">
                  <FaMailBulk /> {contact.email}
                </p>
              </div>
            );
          })}
        </div>

        <div className="col-md-6">
          {/* form starts */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="w-100 mb-3"
                placeholder="John Wlliams"
                id="exampleInputName"
                {...register('name', {
                  required: true,
                  maxLength: 80
                })}
              />
              {/* handling error  */}
              {errors.name && errors.name.type === 'required' && (
                <span
                  role="alert"
                  data-testid="requiredText"
                  className="alert alert-danger"
                >
                  Please enter Name
                </span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="w-100 mb-3"
                placeholder="jw@gmail.com"
                id="exampleInputEmail1"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              {/* handling error  */}
              {errors.email && errors.email.type === 'required' && (
                <span
                  role="alert"
                  data-testid="requiredText"
                  className="alert alert-danger"
                >
                  Please Enter your Email
                </span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="w-100 mb-3"
                placeholder="(91) 987 654 3211"
                id="exampleInputPhone"
                {...register('phone', {
                  required: true,
                  minLength: 6,
                  maxLength: 12
                })}
              />
              {/* handling error  */}
              {errors.phone && errors.phone.type === 'required' && (
                <span
                  role="alert"
                  data-testid="requiredText"
                  className="alert alert-danger"
                >
                  Please enter Mobile Number
                </span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputQuery" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="exampleInputQuery"
                placeholder="Add your comments"
                {...register('message', { required: true })}
              />
              {/* handling error  */}
              {errors.message && errors.message.type === 'required' && (
                <span
                  role="alert"
                  data-testid="requiredText"
                  className="alert alert-danger"
                >
                  Please enter your message
                </span>
              )}
            </div>

            {/* submit button  */}
            <input
              className="btn btn-primary mb-2"
              data-testid="submitBtn"
              type="submit"
            />

            {/* success message after successfully submitting form  */}
            {isSubmitted && (
              <div role="alert" className="alert alert-success">
                Thanks, For the feedback. Form Submiited Successfully!
              </div>
            )}
            {/* error message after successfully submitting form  */}
            {isError && (
              <div role="alert" className="alert alert-danger">
                Sorry Data is not submitted. Please try again!
              </div>
            )}
          </form>
          {/* form ends  */}
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
