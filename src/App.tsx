import './App.css'

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
      <div className='categories-container'>
        {
          categories.map((category) => {
            return <div key={category.id} className='category-container'>
              {/*<img src={category.imageUrl} alt={category.title} /> */}
              <div className='category-body-container'>
                <h2>{category.title}</h2>
                <p>Shop</p>
              </div>
            </div>
            }
          )
        }

      </div>
    </>
  )
}

export default App
