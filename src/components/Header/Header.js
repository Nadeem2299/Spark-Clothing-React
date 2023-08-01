// node modules import
import { NavLink } from 'react-router-dom';
import sparkLogo from '../../assets/images/spark-shopping-logo.png'
import { FaShoppingCart } from 'react-icons/fa'; // importing icons

// custom imports
import MenuList from '../MenuList/MenuList';
// import shopingLogo from '../../assets/images/shopping-logo.jpeg'

function Header () {
  return (
    // using sementic html components <header>
    <header>
      {/* using bootstrap nav component for header nav  */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid container">
          {/* logo will link to homepage  */}
          <NavLink className="navbar-brand" to="/">
            <img src={sparkLogo} height="60px" width="auto" alt="Spark clothing app logo"/> Spark Clothing
          </NavLink>
          {/* button for mobile taggle menu  */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarCollapse"
          >
            {/* calling menulist in footer to render menu items  */}
            <MenuList />
          </div>
          <button type='button' className='btn btn-success ms-5 px-3'> Cart <FaShoppingCart /></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
