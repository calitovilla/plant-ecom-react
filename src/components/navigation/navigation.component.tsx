import { Link, Outlet } from 'react-router'
import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import Logo from '../../assets/logo.svg';
import './navigation.styles.scss'

function Navigation() {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOutUser();

    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Fragment>
        <nav className='navigation'>
        <Link className='logo-container' to="/">
          <img src={Logo} width={40} height={40} alt="Logo" />
          Plant E-commerce
        </Link>
        <ul className='nav-links-container'>
          <Link className='nav-link' to="/">Home</Link>
          <Link className='nav-link' to="/plants">Plants</Link>

          { currentUser ? (
            <span className='nav-link' onClick={handleSignOut}>Sign Out</span>
            //logout functionality can be added here
          ) : (
            <Link className='nav-link' to="/auth">Sign In</Link>
          )}

          {/* Add more navigation links as needed */}
        </ul>
        </nav>
        <Outlet /> {/* Outlet renders the matched child route component here */}
    </Fragment>
  )
}

export default Navigation;