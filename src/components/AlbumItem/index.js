import './index.css'

const AlbumItem = props => {
  const {itemData, onClickAlbum} = props
  const {id, name, images} = itemData
  const imageUrl = images[1].url
  const onClickItem = () => onClickAlbum(id)

  return (
    <li className="element" onClick={onClickItem}>
      <div className="element-preview-card">
        <img src={imageUrl} className="element-preview-image" alt={name} />
      </div>
      <p className="element-preview-text">{name}</p>
    </li>
  )
}
export default AlbumItem
