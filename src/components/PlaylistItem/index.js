import {IoIosMusicalNotes} from 'react-icons/io'
import './index.css'

const PlaylistItem = props => {
  const {itemData} = props
  const {id, images, name, tracks, onClickPlaylist} = itemData
  const previewStyle = images.length === 0 ? 'no-image-preview' : ''
  const imageUrl = images[0].url
  const tracksCount = tracks.total

  const onClickItem = () => onClickPlaylist(id)

  const renderPreviewImage = () => {
    if (images.length === 0) {
      return <IoIosMusicalNotes className="no-bg-img-icon" />
    }
    return <img src={imageUrl} className="element-preview-image" alt={name} />
  }

  return (
    <li className="element" onClick={onClickItem}>
      <div className={`element-preview-card ${previewStyle}`}>
        {renderPreviewImage()}
      </div>
      <p className="element-preview-name">{name}</p>
      <p className="element-preview-tracks">{tracksCount} tracks</p>
    </li>
  )
}
export default PlaylistItem
