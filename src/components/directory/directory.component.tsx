import './directory.styles.scss'
import type Category from '../../interfaces'
import CategoryItem from '../../components/category-item/category-item.component'

const Directory = ({ categories }: { categories: Category[] }) => {

  return (
    <div className='categories-container'>
        {
          categories.map((category) => {
            return <CategoryItem
              key={category.id}
              category={category}
            />
          })
        }

      </div>
  )
}

export default Directory
