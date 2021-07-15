import {Component} from 'react'
import moment from 'moment'

import {FaUser} from 'react-icons/fa'
import {MdHome} from 'react-icons/md'
import {IoIosMusicalNotes} from 'react-icons/io'
import {RiPlayListAddFill} from 'react-icons/ri'

import Profile from '../Profile'
import NavbarItem from '../NavbarItem'
import BackButton from '../BackButton'
import Header from '../Header'
import FeaturedPlaylistItem from '../FeaturedPlaylistItem'
import AlbumItem from '../AlbumItem'
import CategoryItem from '../CategoryItem'
import PlaylistItem from '../PlaylistItem'
import SelectedCategoryItem from '../SelectedCategoryItem'
import MusicItem from '../MusicItem'
import PlaylistTrackItem from '../PlaylistTrackItem'
import AlbumMusicItem from '../AlbumMusicItem'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
const navBarOptionsConstants = {
  home: 'HOME',
  profile: 'PROFILE',
  music: 'YOUR_MUSIC',
  playlists: 'PLAYLISTS',
  initial: 'INITIAL',
}

const navBarOptions = [
  {
    id: navBarOptionsConstants.profile,
    name: 'Profile',
    logo: FaUser,
  },
  {
    id: navBarOptionsConstants.home,
    name: 'Home',
    logo: MdHome,
  },
  {
    id: navBarOptionsConstants.music,
    name: 'Your Music',
    logo: IoIosMusicalNotes,
  },
  {
    id: navBarOptionsConstants.playlist,
    name: 'Playlists',
    logo: RiPlayListAddFill,
  },
]
const typeSelectedOptions = {
  playlist: 'PLAYLIST_SELECTED',
  album: 'ALBUM_SELECTED',
  category: 'CATEGORY_SELECTED',
  default: 'DEFAULT',
}

const getUserUrl = 'https://api.spotify.com/v1/me'

class SpotifyClone extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    navButton: navBarOptionsConstants.home,
    typeSelected: typeSelectedOptions.default,
    homeFeaturedListData: {},
    homeCategoryData: {},
    homeAlbumData: {},
    fetchedSpecificData: {},
    playerDisplay: false,
    playerReference: {},
  }

  componentDidMount = () => {
    this.getAppContentAPI()
  }

  onClickBackButton = () => {
    const {navButton} = this.state
    if (navButton === navBarOptionsConstants.home) {
      this.setState(
        {
          typeSelected: typeSelectedOptions.initial,
        },
        this.getHomeContentAPI,
      )
    } else if (navButton === navBarOptionsConstants.playlist) {
      this.setState(
        {
          typeSelected: typeSelectedOptions.initial,
        },
        this.getPlaylistContentAPI,
      )
    }
  }

  onClickTrack = refObject => {
    this.setState({playerDisplay: true, playerReference: refObject})
  }

  onClickNavProfile = async () => {
    const token = localStorage.getItem('pa_token', '')
    if (token === null || undefined) {
      this.setState({apiStatus: apiStatusConstants.failure}, this.onApiFailure)
    }
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch('https://api.spotify.com/v1/me')
    if (response.ok) {
      const profileData = await response.json()

      const responsePlaylist = await fetch(
        `https://api.spotify.com/v1/users/${profileData.display_name}/playlists?limit=50`,
      )
      const playlistData = await responsePlaylist.json()
      const playlistsCount = playlistData.count
      profileData.playlistsCount = playlistsCount

      this.setState({
        apiStatus: apiStatusConstants.success,
        fetchedSpecificData: profileData,
        navButton: navBarOptionsConstants.profile,
      })
    }
  }

  onClickNavHome = () => {
    this.setState(
      {
        navButton: navBarOptionsConstants.home,
      },
      this.getHomeContentAPI,
    )
  }

  onClickNavMusic = () => {
    this.setState(
      {navButton: navBarOptionsConstants.yourMusic},
      this.getYourMusicAPI,
    )
  }

  onClickNavPlaylist = () => {
    this.setState(
      {navButton: navBarOptionsConstants.playlists},
      this.getPlaylistContentAPI,
    )
  }

  onClickNav = id => {
    this.setState({navButton: id}, this.getAppContentAPI)
  }

  onClickPlaylist = async id => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}`,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({
        fetchedSpecificData: data,
        typeSelected: typeSelectedOptions.playlist,
      })
    }
  }

  onClickAlbum = async id => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        fetchedSpecificData: data,
        typeSelected: typeSelectedOptions.album,
      })
    }
  }

  onClickCategory = async id => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const userInfo = this.getUserInfoApi()
    const {country} = userInfo
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${country}`,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({
        fetchedSpecificData: data,
        typeSelected: typeSelectedOptions.category,
      })
    }
  }

  getUserInfoAPI = async () => {
    const token = localStorage.getItem('pa_token', '')
    if (token === undefined || null) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      const response = await fetch(getUserUrl)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          fetchedSpecificData: data,
          apiStatus: apiStatusConstants.success,
          typeSelected: typeSelectedOptions.default,
        })
      }
    }
  }

  getYourMusicAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch('https://api.spotify.com/v1/me/tracks')
    if (response.ok) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        fetchedSpecificData: data,
        typeSelected: typeSelectedOptions.default,
      })
    }
  }

  getPlaylistDefaultAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const userResponse = await fetch(getUserUrl)
    if (userResponse.ok) {
      const userData = await userResponse.json()
      const username = userData.display_name

      const response = await fetch(
        `https://api.spotify.com/v1/users/${username}/playlists?limit=50`,
      )

      if (response.ok) {
        const data = await response.json()
        this.setState({
          apiStatus: apiStatusConstants.success,
          fetchedSpecificData: data,
          typeSelected: typeSelectedOptions.default,
        })
      }
    }
  }

  getPlaylistContentAPI = () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    this.getPlaylistDefaultAPI()
  }

  getNewReleasesAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const userResponse = await fetch(getUserUrl)
    if (userResponse.ok) {
      const userData = await userResponse.json()
      const {country} = userData
      const response = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?country=${country}`,
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({homeAlbumData: data})
      }
    }
  }

  getBrowseCategoriesAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch('https://api.spotify.com/v1/browse/categories')
    if (response.ok) {
      const data = await response.json()
      this.setState({homeCategoryData: data})
    }
  }

  getFeaturedPlaylistAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const userResponse = await fetch(getUserUrl)
    if (userResponse.ok) {
      const userData = await userResponse.json()

      const {country} = userData
      const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`,
      )
      if (response.ok) {
        const featuredListData = await response.json()

        this.setState({homeFeaturedListData: featuredListData})
      }
    }
  }

  getHomeDefaultAPI = () => {
    this.getFeaturedPlaylistAPI()
    this.getBrowseCategoriesAPI()
    this.getNewReleasesAPI()
    this.setState({
      typeSelected: typeSelectedOptions.none,
      apiStatus: apiStatusConstants.success,
    })
  }

  getHomeContentAPI = () => {
    const token = localStorage.getItem('pa_token', '')
    if (token === null || undefined) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      this.setState(
        {apiStatus: apiStatusConstants.loading},
        this.getHomeDefaultAPI,
      )
    }
  }

  getAppContentAPI = () => {
    const {navButton} = this.state

    if (navButton === navBarOptionsConstants.home) {
      this.getHomeContentAPI()
    } else if (navButton === navBarOptionsConstants.profile) {
      this.getUserInfoAPI()
    } else if (navButton === navBarOptionsConstants.music) {
      this.getYourMusicAPI()
    } else if (navButton === navBarOptionsConstants.playlists) {
      this.getPlaylistContentAPI()
    }
  }

  renderPlayer = () => {
    const {playerReference, playerDisplay, navButton} = this.state
    const {href, trackName, artistName, imageUrl} = playerReference
    if (
      playerDisplay === true &&
      navButton !== navBarOptionsConstants.profile
    ) {
      return (
        <div className="player">
          <div className="player-preview">
            <img src={imageUrl} className="player-image" alt={trackName} />
            <div className="player-details">
              <p className="player-title">{trackName}</p>
              <p className="player-artist">{artistName}</p>
            </div>
          </div>

          <audio src={href} controls>
            <track default kind="captions" />
          </audio>
        </div>
      )
    }
    return null
  }

  renderSpecifiedCategory = () => {
    const {fetchedSpecificData} = this.state
    const {playlists} = fetchedSpecificData
    const {items} = playlists

    return (
      <>
        <BackButton onClickBackButton={this.onClickBackButton} />
        <div className="element-container">
          <h1 className="element-heading">Your pick</h1>
          <ul className="element-card-container">
            {items.map(eachItem => (
              <SelectedCategoryItem key={eachItem.id} itemData={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSpecifiedAlbum = () => {
    const {fetchedSpecificData} = this.state
    const {tracks} = fetchedSpecificData
    const {items} = tracks

    const imageUrl = fetchedSpecificData.images[1].url
    const {name, artists} = fetchedSpecificData
    const label2 = artists[0].name
    const headerData = {
      label1: 'New Releases',
      label2,
      name,
      imageUrl,
    }

    return (
      <>
        <Header
          onClickBackButton={this.onClickBackButton}
          headerData={headerData}
        />
        <ul className="selected-track-list">
          <li className="track">
            <div className="track-header">
              <p className="track-details">#</p>
              <p className="track-details">Track</p>
            </div>
            <p className="track-details">Time</p>
            <p className="track-details">Popularity</p>
          </li>
          {items.map(eachItem => {
            const duration = eachItem.duration_ms
            const trackTitle = eachItem.name
            const trackNo = eachItem.track_number
            const artistName = eachItem.artists[0].name
            const {href} = eachItem

            const durationInMins = moment(duration, 'ms').minutes()
            const popularity = Math.ceil(Math.random() * 5)
            const refObj = {
              href,
              imageUrl,
              trackName: trackTitle,
              artistName,
            }
            const trackData = {trackNo, trackTitle, durationInMins, popularity}
            return (
              <AlbumMusicItem
                key={eachItem.id}
                refObj={refObj}
                onClickTrack={this.onClickTrack}
                trackData={trackData}
              />
            )
          })}
        </ul>
      </>
    )
  }

  renderSpecifiedPlaylist = () => {
    const {fetchedSpecificData, navButton} = this.state
    const label1 =
      navButton === navBarOptionsConstants.home ? "Editor's picks" : '#playlist'

    const {description, images, tracks, name} = fetchedSpecificData
    const {imageUrl} = images[0].url

    const {items} = tracks
    const artName = items[0].track.artists[0].name
    const tracksCount = tracks.total
    const label2 =
      navButton === navBarOptionsConstants.home ? artName : tracksCount
    const headerData = {
      label1,
      label2,
      name: description,
      imageUrl,
    }
    return (
      <>
        <Header
          onClickBackButton={this.onClickBackButton}
          headerData={headerData}
        />
        <ul className="selected-track-list">
          <li className="track-header">
            <div className="track-index">
              <p className="track-details">#</p>
              <p className="track-details">Track</p>
            </div>
            <p className="track-details">Album</p>
            <p className="track-details">Time</p>
            <p className="track-details">Artist</p>
            <p className="track-details">Added</p>
          </li>
          {items.map(eachItem => {
            const {track, href} = eachItem
            const duration = track.duration_in_ms

            const {album, artists} = track
            const trackNumber = track.track_number
            const released = album.release_date
            const {splitArray} = name.split(' ')

            const trackTitle = splitArray[0]
            const albumTitle = splitArray[1]
            const artistName = artists[0].name

            const now = new Date()
            const date1 = new Date(released)
            const valueInTime = date1.getTime() - now.getTime()
            const days = valueInTime / (1000 * 3600 * 24)

            const releaseDate =
              days >= 30
                ? `${Math.floor(days / 30)} Months ago`
                : `${days} days ago`

            const trackImage = album.image[1].url

            const durationInMins = moment.duration(duration, 'ms').minutes()

            const trackData = {
              trackNumber,
              trackTitle,
              albumTitle,
              durationInMins,
              artistName,
              releaseDate,
              trackImage,
              href,
            }
            return (
              <PlaylistTrackItem
                key={eachItem.id}
                trackData={trackData}
                onClickTrack={this.onClickTrack}
              />
            )
          })}
        </ul>
      </>
    )
  }

  renderNewReleases = () => {
    const {homeAlbumData} = this.state
    const {albums} = homeAlbumData
    const {items} = albums

    return (
      <div className="element-container">
        <h1 className="element-heading">New releases</h1>
        <ul className="element-card-container">
          {items.map(eachItem => (
            <AlbumItem
              key={eachItem.id}
              itemData={eachItem}
              onClickAlbum={this.onClickAlbum}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderBrowseCategories = () => {
    const {homeCategoryData} = this.state
    const {categories} = homeCategoryData
    const {items} = categories

    return (
      <div className="element-container">
        <h1 className="element-heading">Genres & Moods</h1>
        <ul className="element-card-container">
          {items.map(eachItem => (
            <CategoryItem
              key={eachItem.id}
              itemData={eachItem}
              onClickCategory={this.onClickCategory}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFeaturedPlayList = () => {
    const {homeFeaturedListData} = this.state
    const {message} = homeFeaturedListData
    const {playlists} = homeFeaturedListData
    const {items} = playlists

    return (
      <div className="element-container">
        <h1 className="element-heading">{message}</h1>
        <ul className="element-card-container">
          {items.map(eachItem => (
            <FeaturedPlaylistItem
              key={eachItem.id}
              itemData={eachItem}
              onClickPlaylist={this.onClickPlaylist}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderProfile = () => {
    const {fetchedSpecificData} = this.state
    return <Profile fetchedSpecificData={fetchedSpecificData} />
  }

  renderYourMusic = () => {
    const {fetchedSpecificData} = this.state
    const {items} = fetchedSpecificData

    return (
      <div className="element-container">
        <h1 className="element-heading">Your music</h1>
        <ul className="music-list">
          {items.map(eachItem => {
            const {track} = eachItem
            const {album, artists, id, name, href} = track
            const duration = track.duration_ms
            const {images} = album
            const imageUrl = images[1].url
            const artistName = artists[0].name

            const durationInMins = moment(duration, 'ms').minutes()

            const trackData = {artistName, imageUrl, durationInMins, href, name}

            return (
              <MusicItem
                key={id}
                trackData={trackData}
                onClickTrack={this.onClickTrack}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  renderPlaylistDefault = () => {
    const {fetchedSpecificData} = this.state
    const {items} = fetchedSpecificData

    return (
      <div className="element-container">
        <h1 className="element-heading">Your Playlists</h1>
        <ul className="element-card-container">
          {items.map(eachItem => (
            <PlaylistItem key={eachItem.id} itemData={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderPlaylist = () => {
    const {typeSelected} = this.state
    if (typeSelected !== typeSelectedOptions.default) {
      this.renderSpecifiedPlaylist()
    } else {
      this.renderPlaylistDefault()
    }
  }

  renderHomeSelected = () => {
    const {typeSelected} = this.state

    if (typeSelected === typeSelectedOptions.playlist) {
      this.renderSpecifiedPlaylist()
    } else if (typeSelected === typeSelectedOptions.category) {
      this.renderSpecifiedCategory()
    } else if (typeSelected === typeSelectedOptions.album) {
      this.renderSpecifiedAlbum()
    }
  }

  renderHome = () => {
    const {typeSelected} = this.state

    if (typeSelected !== typeSelectedOptions.default) {
      this.renderHomeSelected()
    } else {
      this.renderFeaturedPlayList()
      this.renderBrowseCategories()
      this.renderNewReleases()
    }
  }

  renderCorrespondingContent = () => {
    const {navButton} = this.state

    switch (navButton) {
      case navBarOptionsConstants.profile:
        return this.renderProfile()
      case navBarOptionsConstants.music:
        return this.renderYourMusic()
      case navBarOptionsConstants.playlists:
        return this.renderPlaylist()
      case navBarOptionsConstants.home:
        return this.renderHome()
      default:
        return null
    }
  }

  renderFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
    const {history} = this.props
    history.replace('/login')
  }

  renderLoader = () => (
    <div className="loader-container">
      <div className="loader-card">
        <h1 className="loading-text">Loading...</h1>
      </div>
    </div>
  )

  navComponent = () => {
    const {navButton} = this.setState

    return (
      <nav className="navbar">
        <ul className="navbar-menu">
          {navBarOptions.map(eachItem => (
            <NavbarItem
              key={eachItem.id}
              itemDetails={eachItem}
              onChangeNavButton={this.onChangeNavButton}
              activeNavId={navButton}
            />
          ))}
        </ul>
      </nav>
    )
  }

  renderCompleteApp = () => (
    <div className="app-container">
      {this.navComponent()}
      <div className="body-container">
        <div className="section-container">
          {this.renderCorrespondingContent()}
        </div>
        {this.renderPlayer()}
      </div>
    </div>
  )

  renderApp = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCompleteApp()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderApp()}</div>
  }
}

export default SpotifyClone
