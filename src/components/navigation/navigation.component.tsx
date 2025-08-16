import { Link, Outlet } from 'react-router'
import { Fragment } from 'react';
import Logo from '../../assets/logo.svg';
import './navigation.styles.scss'

function Navigation() {
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
          <Link className='nav-link' to="/sign-in">Sign In</Link>
            {/* Add more navigation links as needed */}
        </ul>
        </nav>
        <Outlet />
    </Fragment>
  )
}

export default Navigation;