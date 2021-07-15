import './index.css'

const PlaylistTrackItem = props => {
  const {onClickTrack, trackData} = props
  const {
    trackNumber,
    trackTitle,
    albumTitle,
    durationInMins,
    artistName,
    releaseDate,
    trackImage,
    href,
  } = trackData

  const refObj = {
    trackName: trackTitle,
    artistName,
    href,
    imageUrl: trackImage,
  }
  const onClickItem = () => onClickTrack(refObj)
  return (
    <li className="track" onClick={onClickItem}>
      <p className="track-details">{trackNumber}</p>
      <p className="track-details">{trackTitle}</p>
      <p className="track-details">{albumTitle}</p>
      <p className="track-details">{durationInMins}</p>
      <p className="track-details">{artistName}</p>
      <p className="track-details">{releaseDate}</p>
    </li>
  )
}
export default PlaylistTrackItem
