import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Spark Clothing | About Us</title>
      </Helmet>

      <h1>About Us</h1>
      <h3 data-testid="aboutUsTagLine" className='text-succes py-3'><i>“We have the capabilities and experience to deliver the products you need to move forward.”</i></h3>
      <h1 data-testid="historyHeading" className='py-3 text-secondary'>See History About Spark Shopping</h1>
      {/* Link to History page URL */}
      <Link data-testid="historyBtn" style={{ color: '#FCD200', fontSize: '20px', border: '1px solid #FCD200', padding: '10px', backgroundColor: 'red' }} className='fw-bold' to="history">History</Link>
    </>
  );
};

export default AboutUsPage;
