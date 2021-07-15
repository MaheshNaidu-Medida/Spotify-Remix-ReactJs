import './index.css'

const AlbumItem = props => {
  const {itemData, onClickCategory} = props
  const {name, images, id} = itemData
  const imageUrl = images[0].url
  const onClickItem = () => onClickCategory(id)
  return (
    <li className="element" onClick={onClickItem}>
      <div className="element-preview-card">
        <p className="element-preview-text">{name}</p>
        <img src={imageUrl} className="element-preview-image" alt={name} />
      </div>
    </li>
  )
}
export default AlbumItem
