import './App.css'
import Directory from './components/directory/directory.component'

function App() {

  const categories = [
    {
      id: 1,
      title: 'Plants',
      imageUrl: 'https://example.com/fruit-trees.jpg',
    },
    {
      id: 2,
      title: 'Pots',
      imageUrl: 'https://example.com/pots.jpg',
    },
    {
      id: 3,
      title: 'Gardening Tools',
      imageUrl: 'https://example.com/gardening-tools.jpg',
    },
    {
      id: 4,
      title: 'Soil & Fertilizers',
      imageUrl: 'https://example.com/soil-fertilizers.jpg',
    },
    {
      id: 5,
      title: 'Seeds',
      imageUrl: 'https://example.com/seeds.jpg',
    }
  ]

  return (
    <>
      <Directory categories={categories} />
    </>
  )
}

export default App
