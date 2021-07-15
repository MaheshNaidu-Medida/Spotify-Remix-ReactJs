import './index.css'

const AlbumMusicItem = props => {
  const {trackData, onClickTrack, refObj} = props
  const {trackNo, trackTitle, durationInMins, popularity} = trackData
  const onClickItem = () => onClickTrack(refObj)

  return (
    <li className="track" onClick={onClickItem}>
      <p className="track-details">{trackNo}</p>
      <p className="track-details">{trackTitle}</p>
      <p className="track-details">{durationInMins}</p>
      <p className="track-details">{popularity}|5</p>
    </li>
  )
}
export default AlbumMusicItem
