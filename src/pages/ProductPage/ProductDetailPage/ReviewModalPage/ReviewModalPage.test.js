import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import ReviewModalPage from './ReviewModalPage';

// Create a new instance of MockAdapter
const mockAxios = new MockAdapter(axios);

mockAxios.onPatch('http://localhost:5000/products/1').reply(200);

// creating props
const initialProps = {
  handleClose: jest.fn().mockImplementation(() => Promise.resolve()),
  currentProduct: { id: 1, reviews: 'mockName' }
};

// test suite
describe('ReviewModalPage', () => {
  // checking data is correct in form
  it('has proper contact form with name, email, phone, query inputs and submit button', () => {
    render(
      <ReviewModalPage {...initialProps}/>
    );
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email address');
    const phoneInput = screen.getByLabelText('Phone');
    const queryInput = screen.getByLabelText('Comment');
    const ratingsInput = screen.getByLabelText('Ratings');
    // getting submit button value
    const submitButton = screen.getByTestId('submitButton');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(queryInput).toBeInTheDocument();
    expect(ratingsInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  // checking if submit button works name is not empty
  it('has the submit button in enabled state when fullName is not empty', () => {
    render(
      <ReviewModalPage {...initialProps}/>
    );
    const nameInput = screen.getByLabelText('Full Name');
    const submitBtn = screen.getByTestId('submitButton');

    // mock event object
    const mockEvent = {
      // preparing the mock event obj with target.value
      target: {
        value: 'John'
      }
    };

    fireEvent.change(nameInput, mockEvent);
    expect(submitBtn).not.toHaveAttribute('disabled');
  });

  // test for checking number of alerts on submitting wrong data
  it('should show validation error when form is submitted with invalid data', async () => {
    render(
      <ReviewModalPage
        handleClose="true"
        currentProduct={{ id: 1, reviews: 'mockName' }}
      />
    );
    const submitBtn = screen.getByTestId('submitButton');
    fireEvent.click(submitBtn);

    const nameRequiredError = await screen.findByText(/Please enter Name/i);
    const emailRequiredError = await screen.findByText(
      /Please enter Email/i
    );
    const phoneRequiredError = await screen.findByText(
      /Please enter phone no./i
    );
    const messageRequiredError = await screen.findByText(
      /Please enter comments/i
    );

    expect(nameRequiredError).toBeInTheDocument();
    expect(emailRequiredError).toBeInTheDocument();
    expect(phoneRequiredError).toBeInTheDocument();
    expect(messageRequiredError).toBeInTheDocument();
  });

  it('should submit the form and show success message', async () => {
    render(
      <ReviewModalPage
        handleClose="true"
        currentProduct={{ id: 1, reviews: 'mockName' }}
      />
    );
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: '9876543211' } });

    const queryInput = screen.getByLabelText('Comment');
    fireEvent.change(queryInput, {
      target: { value: 'This is a test message' }
    });

    const submitBtn = screen.getByTestId('submitButton');
    fireEvent.click(submitBtn); // Wait for the success message to appear

    const successMessage = await screen.findByText(
      /Form Submiited Successfully!/i
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('should show error message when form submission fails', async () => {
    render(
      <ReviewModalPage
        handleClose="true"
        currentProduct={{ id: 1, reviews: 'mockName' }}
      />
    );
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: '9876543211' } });

    const queryInput = screen.getByLabelText('Comment');
    fireEvent.change(queryInput, {
      target: { value: 'This is a test message' }
    });

    // Mock the failure of the POST request to /getInTouchData
    mockAxios.onPatch('http://localhost:5000/products/1').reply(500);

    const submitBtn = screen.getByTestId('submitButton');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Sorry Data is not submitted. Please try again!/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
