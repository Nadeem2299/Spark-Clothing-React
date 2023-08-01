import { Helmet } from 'react-helmet-async';

import HeroSection from './HeroSection/HeroSection';
import TrendingProductList from './TrendingProductList/TrendingProductList';

// react arow function component
const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Spark Clothing | Home</title>
      </Helmet>
      <h1 data-testid="sparkClothing">Welcome to Spark Clothing</h1>
      {/* hero section contains carousel  */}
      <HeroSection />
      {/* FeatureProduct contains 3 products which are featured */}
      <TrendingProductList />
    </>
  )
}

// default export
export default HomePage
