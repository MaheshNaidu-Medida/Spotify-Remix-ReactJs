import {MdArrowBack} from 'react-icons/md'
import './index.css'

const BackButton = props => {
  const {onClickBackButton} = props
  const onClickButton = () => onClickBackButton
  return (
    <div className="back-button-container">
      <button type="button" className="back-button" onClick={onClickButton}>
        <MdArrowBack className="back-button-icon" />
        <span className="back-button-text">Back</span>
      </button>
    </div>
  )
}

export default BackButton
