import './index.css'

const SelectedCategoryItem = props => {
  const {itemData, onClickPlaylist} = props
  const {images, name, tracks, id} = itemData
  const imageUrl = images[0].url
  const {total} = tracks

  const onClickItem = () => onClickPlaylist(id)
  return (
    <li className="element" onClick={onClickItem}>
      <div className="element-preview-card">
        <img src={imageUrl} className="element-preview-image" alt={name} />
      </div>
      <p className="element-preview-text">{name}</p>
      <p className="element-preview-tracks">{total} tracks</p>
    </li>
  )
}
export default SelectedCategoryItem
