import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'; // importing icons
import sparkLogo from '../../assets/images/spark-shopping-logo.png'; // importing logo image
import { Link } from 'react-router-dom';

// custom imports
import './Footer.css';
import MenuList from '../MenuList/MenuList';

const Footer = function () {
  // creating variable for 1 way binding
  const copyrightYear = 2023;
  const developerName = 'Nadeem Ahmed';

  return (
    // using sementic html components <footer>
    <footer className="text-center mt-5 mb-3">
      <hr />
      <div className="container-fluid d-flex justify-content-between">
        <div className='d-flex align-items-center'>
          {/* calling menulist in footer to render menu items  */}
          <MenuList />

          {/* custom social icons */}
          <a target="_blank" rel="noreferrer" href="https://www.youtube.com/"><FaYoutube className="mx-2" /></a>
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><FaInstagram className="mx-2" /></a>
          <a target="_blank" rel="noreferrer" href="https://twitter.com/"><FaTwitter className="mx-2" /></a>
        </div>
        <div className='d-flex align-items-center'>

          {/* one way data binding */}
          <p className="mb-0 mx-3">
            @ Copyright {copyrightYear} | {developerName}
          </p>

          {/* links to home page */}
          <Link className="navbar-brand" to="/">
            <img
              src={sparkLogo}
              height="60px"
              width="auto"
              alt="Spark shopping app logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
