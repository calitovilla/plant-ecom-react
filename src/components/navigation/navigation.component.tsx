import { Outlet } from 'react-router'
import { Fragment } from 'react';

function Navigation() {
  return (
    <Fragment>
        <nav>
        <h1>Plant E-commerce</h1>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/plants">Plants</a></li>
            {/* Add more navigation links as needed */}
        </ul>
        </nav>
        <Outlet />
    </Fragment>
  )
}

export default Navigation;