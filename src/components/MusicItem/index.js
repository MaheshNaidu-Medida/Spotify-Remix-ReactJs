import './index.css'

const MusicItem = props => {
  const {onClickTrack, trackData} = props
  const {name, imageUrl, artistName, durationInMins, href} = trackData
  const refObj = {trackName: name, imageUrl, artistName, href}
  const onClickItem = () => onClickTrack(refObj)
  return (
    <li className="music-item" onClick={onClickItem}>
      <div className="music-label">
        <div>
          <img src={imageUrl} className="music-image" alt={name} />
        </div>
        <div className="music-content">
          <p className="music-name">{name}</p>
          <p className="music-artist">{artistName}</p>
        </div>
      </div>
      <p className="music-duration">{durationInMins}</p>
    </li>
  )
}
export default MusicItem
