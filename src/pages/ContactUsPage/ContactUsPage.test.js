import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HelmetProvider } from 'react-helmet-async';

import ContactUsPage from './ContactUsPage';

// Create a new instance of MockAdapter
const mockAxios = new MockAdapter(axios);

// Mock response for the GET request to /contactData
const mockContactInformation = [
  {
    address: 'Mock Address',
    phone: ['111-222-3333', '444-555-6666'],
    email: 'ma1@gmail.com'
  }
];
// Mock the response for the getting /getInTouchData
mockAxios
  .onGet('http://localhost:5000/contactData')
  .reply(200, mockContactInformation);

// Mock the response for the POST request to /getInTouchData
mockAxios.onPost('http://localhost:5000/getInTouchData').reply(200);

describe('ContactUsPage', () => {
  it('should render the page header', () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );

    const headerElement = screen.getByText(/contact us/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('should render the contact information', async () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );

    await waitFor(() => {
      const addressElements = screen.getAllByText(/Mock Address/i);
      expect(addressElements).toHaveLength(1);

      const phoneElements = screen.getAllByText(/111-222-3333/i);
      expect(phoneElements).toHaveLength(1);

      const emailElements = screen.getAllByText(/ma1@gmail.com/i);
      expect(emailElements).toHaveLength(1);
    });
  });

  it('should submit the form and show success message', async () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );

    const nameInput = screen.getByPlaceholderText(/John Wlliams/i);
    fireEvent.change(nameInput, { target: { value: 'Sunil Chetri' } });

    const emailInput = screen.getByPlaceholderText(/jw@gmail.com/i);
    fireEvent.change(emailInput, { target: { value: 'sc@gmail.com' } });

    const phoneInput = screen.getByPlaceholderText(/\(91\) 987 654 3211/i);
    fireEvent.change(phoneInput, { target: { value: '9900303033' } });

    const messageInput = screen.getByPlaceholderText(/Add your comments/i);
    fireEvent.change(messageInput, {
      target: { value: 'Wow. Awesome website' }
    });

    const submitBtn = screen.getByTestId('submitBtn');
    fireEvent.click(submitBtn); // Wait for the success message to appear

    const successMessage = await screen.findByText(
      /Thanks, For the feedback. Form Submiited Successfully!/i
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('should show error message when form submission fails', async () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );

    const nameInput = screen.getByPlaceholderText(/John Wlliams/i);
    fireEvent.change(nameInput, { target: { value: 'Sunil Chetri' } });

    const emailInput = screen.getByPlaceholderText(/jw@gmail.com/i);
    fireEvent.change(emailInput, { target: { value: 'sc@gmail.com' } });

    const phoneInput = screen.getByPlaceholderText(/\(91\) 987 654 3211/i);
    fireEvent.change(phoneInput, { target: { value: '9900303033' } });

    const messageInput = screen.getByPlaceholderText(/Add your comments/i);
    fireEvent.change(messageInput, {
      target: { value: 'Wow. Awesome website' }
    });

    // Mock the failure of the POST request to /getInTouchData
    mockAxios.onPost('http://localhost:5000/getInTouchData').reply(500);

    const submitBtn = screen.getByTestId('submitBtn');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /Sorry Data is not submitted. Please try again!/i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should show validation error when form is submitted with invalid data', async () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );

    const submitBtn = screen.getByTestId('submitBtn');
    fireEvent.click(submitBtn);

    const nameRequiredError = await screen.findByText(/Please enter Name/i);
    const emailRequiredError = await screen.findByText(
      /Please Enter your Email/i
    );
    const phoneRequiredError = await screen.findByText(
      /Please enter Mobile Number/i
    );
    const messageRequiredError = await screen.findByText(
      /Please enter your message/i
    );

    expect(nameRequiredError).toBeInTheDocument();
    expect(emailRequiredError).toBeInTheDocument();
    expect(phoneRequiredError).toBeInTheDocument();
    expect(messageRequiredError).toBeInTheDocument();
  });
  // checking data is correct in form
  it('has proper contact form with name, email, phone, query inputs and submit button', () => {
    render(
      <HelmetProvider>
        <ContactUsPage />
      </HelmetProvider>
    );
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const phoneInput = screen.getByLabelText('Phone');
    const queryInput = screen.getByLabelText('Message');
    // getting submit button value
    const submitBtn = screen.getByTestId('submitBtn');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(queryInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });
});
