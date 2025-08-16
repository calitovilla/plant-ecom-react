import Home from './components/routes/home.component'
import { Routes, Route, Outlet } from 'react-router'
import './App.css'

function Navbar() {
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

function Plants(){
  return (
    <div>
      <h2>Plants</h2>
      <p>Explore our collection of plants.</p>
      {/* Add plant listing or details here */}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<Plants />} />
      </Route>
    </Routes>
  )
}

export default App
