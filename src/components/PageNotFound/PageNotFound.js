// used for displaying 404 UI if the user hits the wrong URL
import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='Container'>
      <h1 data-testid="errorCode">404</h1>
      <h1 data-testid="notFound">Page Not Found</h1>
      <p>Please make sure you have entered the correct URL</p>
      {/* back to home page button  */}
      <p>Go Back to Home Page</p>
      <Link to="/"><button className='btn btn-primary'>Go Back</button></Link>
    </div>
  )
}

// default export
export default PageNotFound
