import { Outlet } from 'react-router'

function Navigation() {
  return (
    <nav>
      <h1>Plant E-commerce</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/plants">Plants</a></li>
        {/* Add more navigation links as needed */}
      </ul>
      <Outlet />
    </nav>
  )
}

export default Navigation;