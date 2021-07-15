import './index.css'

const FeaturedPlaylistItem = props => {
  const {itemData, onClickPlaylist} = props
  const {images, name, id} = itemData
  const imageUrl = images[0].url
  const onClickItem = () => onClickPlaylist(id)
  return (
    <li className="element" onClick={onClickItem}>
      <div className="element-preview-card">
        <img src={imageUrl} className="element-preview-image" alt={name} />
      </div>
      <p className="element-preview-text">{name}</p>
    </li>
  )
}
export default FeaturedPlaylistItem
