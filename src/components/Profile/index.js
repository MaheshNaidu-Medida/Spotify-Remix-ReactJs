import {withRouter} from 'react-router-dom'
import {AiOutlineUserAdd} from 'react-icons/ai'
import './index.css'

const Profile = props => {
  const {fetchedSpecificData} = props
  const {followers, images, playlistsCount} = fetchedSpecificData
  const userName = fetchedSpecificData.display_name
  const followersCount = followers.total

  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
  }

  const renderImage = () => {
    const imageUrl = images[0].url
    return (
      <div className="user-image-container">
        <img src={imageUrl} className="user-image" alt={userName} />
      </div>
    )
  }
  const renderNoImage = () => (
    <div className="user-image-container">
      <AiOutlineUserAdd className="user-no-image" />
    </div>
  )

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        {images.length > 0 ? renderImage() : renderNoImage()}
        <h1 className="user-name">{userName}</h1>
        <div className="user-status">
          <div className="user-status-content">
            <p className="user-status-type">FOLLOWERS</p>
            <p className="user-status-count">{followersCount}</p>
          </div>
          <div className="user-status-content">
            <p className="user-status-type">PLAYLISTS</p>
            <p className="user-status-count">{playlistsCount}</p>
          </div>
        </div>
        <button type="button" className="button-logout" onClick={onClickLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  )
}
export default withRouter(Profile)
