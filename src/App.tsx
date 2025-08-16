import Home from './components/routes/home.component'
import Navigation from './components/navigation/navigation.component'
import { Routes, Route }from 'react-router'
import './App.css'



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
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<Plants />} />
      </Route>
    </Routes>
  )
}

export default App
