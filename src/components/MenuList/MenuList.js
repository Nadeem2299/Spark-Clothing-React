// custom imports
import MenuItem from './MenuItem/MenuItem';

const MenuList = () => {
  // array to keep all the menu list items so that it can be used multiple times without code duplication
  const menuItems = [
    { key: 0, title: 'Home', to: '/' },
    { key: 1, title: 'Products', to: '/products' },
    { key: 2, title: 'About Us', to: '/about-us' },
    { key: 3, title: 'Contact Us', to: '/contact-us' }
  ];
  // map function is used to render component multiple times by passing key values and other items
  // ...item is used to make array duplicate for items in array
  return (
    <ul data-testid="NavbarList" className="navbar-nav">
      {menuItems.map((item) => (
        <MenuItem key={item.key} {...item} />
      ))}
    </ul>
  );
};

export default MenuList;
