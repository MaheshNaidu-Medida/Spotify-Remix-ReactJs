import BackButton from '../BackButton'
import './index.css'

const Header = props => {
  const {headerData, onClickBackButton} = props
  const {imageUrl, label1, label2, name} = headerData
  return (
    <div className="header">
      <BackButton onClickBackButton={onClickBackButton} />
      <div className="header-content">
        <img src={imageUrl} className="header-image" alt={name} />
        <div className="header-text">
          <span className="header-label">{label1}</span>
          <span className="header-name">{name}</span>
          <span className="header-label">{label2}</span>
        </div>
      </div>
    </div>
  )
}
export default Header
