import './category-item.styles.scss'
import type Category from '../../interfaces'

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <div className='category-container'>
        <div className='background-image' style={{ backgroundImage: `url(${category.imageUrl})` }} />
            <div className='category-body-container'>
                <h2>{category.title}</h2>
                <p>Shop</p>
        </div>
    </div>
  )
}
export default CategoryItem