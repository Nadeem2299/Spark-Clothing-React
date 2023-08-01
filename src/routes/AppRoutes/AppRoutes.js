import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import ProductDetailPage from '../../pages/ProductPage/ProductDetailPage/ProductDetailPage';
import AboutUsHistory from '../../pages/AboutUsPage/AboutUsHistory/AboutUsHistory';

const ContactUsPage = React.lazy(() =>
  import('../../pages/ContactUsPage/ContactUsPage')
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="spinner-border text-success"></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products">
          <Route index element={<ProductPage />} />
          <Route path=":id" element={<ProductDetailPage />} />
        </Route>
        <Route path="/about-us">
          <Route index element={<AboutUsPage />} />
          <Route path="history" element={<AboutUsHistory />} />
        </Route>
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
