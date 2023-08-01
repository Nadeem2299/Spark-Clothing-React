import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
  // checking for Page not found text
  it('has Page not found text', () => {
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );

    const notFound = screen.getByTestId('notFound');
    expect(notFound.textContent).toBe(
      'Page Not Found'
    );
  });

  it('has correct Eroor Code', () => {
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );

    const errorCode = screen.getByTestId('errorCode');
    expect(errorCode.textContent).toBe(
      '404'
    );
  });
});
