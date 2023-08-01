// node modules import
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = ({ title, to }) => {
  return (
    <li className="nav-item">
      {/* NavLink to make the Project Single page application and navigate to other pages without Reload */}
      <NavLink className="nav-link fw-bold" to={to}>
        {title}
      </NavLink>
    </li>
  );
};

// props typechecking in React using PropTypes
MenuItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
};

export default MenuItem;
